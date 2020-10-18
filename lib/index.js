const scrapeIt = require('scrape-it');
const fetch = require('node-fetch');

/**
 * @param {String} itemname - Item name or keyword.
 * @returns {Promise}
 */
module.exports.search = (itemname) => {

  return fetch("https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=" + itemname + "&format=json")
    .then(res => res.json())
    .then(values => {
      const data = values.query.search;

      if (!data) throw new Error("Couldn't find item.");
      const items = data.filter(x => x.title.toLowerCase().includes(itemname) && !x.title.includes("Category:") && !x.title.includes("(update)") && !x.title.includes("(disambiguation)"));
      if (!(items.length > 0)) throw new Error("Couldn't find item.");

      const result = items.map(element => {
        return {
          name: element.title,
          url: `https://growtopia.fandom.com/wiki/${element.title.replace(/ /g, "_")}`
        }
      });

      return result;

    }).catch(err => {
      throw err;
    });

}


/**
 * @param {String} itemname - Item name or keyword.
 * @returns {Promise}
 */
module.exports.itemInfo = itemname => {

  return new Promise((resolve, reject) => {

    fetch("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + itemname)
      .then(res => res.json())
      .then(data => {
        if (!data.items) throw new Error("Couldn't find item.");
        const items = data.items.map(x => x.title);
        if (!(items.length > 0)) throw new Error("Couldn't find item.");

        let link = `https://growtopia.wikia.com/wiki/${items[0]}`;

        scrapeIt(link, {
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
            reject("Incorrect item name!");
          }
    
          resolve(data);
    
        }).catch(err => {
          reject(err);
        });

      }).catch(err => {
        reject(err);
      });

  });
}

module.exports.server = () => {

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

  return new Promise((resolve, reject) => {
    fetch('https://www.growtopiagame.com/detail')
      .then((res) => {
        status = res.status;
        return res.json()
      })
      .then((jsonData) => {
        if (status === 200) {
          let pcount = parseInt(jsonData.online_user);
          let wotd = jsonData.world_day_images.full_size;
          let wotdname = wotd.slice(
            wotd.lastIndexOf("/") + 1,
            wotd.lastIndexOf(".")
          ).toUpperCase();

          let time = new Date().toLocaleDateString('en-En', {
            month: "short",
            day: "numeric"
          });

          resolve({
            date: time,
            time: calcTime("-4", false).slice(calcTime("-4", false).indexOf(" ")),
            online: pcount,
            wotdname,
            wotdimage: wotd
          });

        } else {
          return reject("Connection timeout!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}