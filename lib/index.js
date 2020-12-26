const scrapeIt = require('scrape-it');
const axios = require('axios');

/**
 * @param {String} itemname - Item name or keyword.
 * @returns {Promise}
 */
module.exports.search = async (itemname) => {

    return axios.get("https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=" + itemname + "&format=json").then(res => {
        if (res.status === 200) return res.data
        else throw "Cannot find item";
    }).then(values => {

        const data = values.query.search;
        if (!data) return Promise.reject("Couldn't find item!");
        const items = data.filter(x => x.title.toLowerCase().includes(itemname) && !x.title.includes("Category:") && !x.title.includes("(update)") && !x.title.includes("(disambiguation)"));
        if (!(items.length > 0)) return Promise.reject("Couldn't find item!");

        const result = items.map(element => {
            return {
                name: element.title,
                url: `https://growtopia.fandom.com/wiki/${element.title.replace(/ /g, "_")}`
            }
        });

        return Promise.resolve(result);

    }).catch(e => {
        throw e
    });
}


/**
 * @param {String} itemname - Item name or keyword.
 * @returns {Promise}
 */
module.exports.itemInfo = async (itemname) => {

    return axios.get("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + itemname).then(res => {
        if (res.status === 200) return res.data
        else throw "Couldn't find item"
    }).then(data => {

        if (!data.items) return Promise.reject("Couldn't find item!");
        const items = data.items.map(x => x.title);
        if (!(items.length > 0)) return Promise.reject("Couldn't find item!");

        let link = `https://growtopia.wikia.com/wiki/${items[0]}`;

        return scrapeIt(link, {
            itemdesc: {
                selector: ".card-text",
                eq: 0
            },
            itemprops: "#mw-content-text > div > div.gtw-card.item-card > div:nth-child(4)",
            itemimage: {
                selector: "div.card-header .growsprite > img",
                attr: "src",
            },
            itemrarity: ".s_rarity",
            itemrecipe: {
                selector: "div.recipebox table.content",
                eq: 0,
                convert: x => x.split(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/)
            },
            itemsplice: ".bg-splice",
            itemexinfo: "#mw-content-text > div > p:nth-child(3)"
        }).then(async ({
            data,
            response
        }) => {

            if (!data.itemrecipe && !data.itemimage) {
                return Promise.reject("Incorrect item name!");
            }

            return Promise.resolve(data);

        }).catch(err => {
            return Promise.reject(err);
        });

    }).catch(e => {
        throw e
    });



}

module.exports.server = async () => {

    let calcTime = (offset, nonloc) => {
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000 * offset));

        if (nonloc === false) {
            return nd.toLocaleString(); //returns in string format e.g 11.05.2020
        } else if (nonloc) {
            return nd; //returns in date format
        }
    };

    const moment = require('moment-timezone');
    const gtTime = moment().tz('America/New_York');

    return axios.get('https://www.growtopiagame.com/detail').then(res => {
        if (res.status === 200) return res.data
        else throw "Couldn't connect to details..."
    }).then(jsonData => {

        let pcount = parseInt(jsonData.online_user);
        let wotd = jsonData.world_day_images.full_size;
        let wotdname = wotd.slice(
            wotd.lastIndexOf("/") + 1,
            wotd.lastIndexOf(".")
        ).toUpperCase();

        let time = gtTime.format('MMM Do');

        return Promise.resolve({
            date: time,
            time: gtTime.format('h:mm:ss'),
            online: pcount,
            wotdname,
            wotdimage: wotd
        });

    }).catch(e => {
        throw e
    });

}