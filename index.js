const scrapeIt = require('scrape-it');
const fetch = require('node-fetch');

  /**
   * @param {String} itemname - Has to be exact name and is case sensitive.
   */

module.exports.itemInfo = itemname => {

    let link = `https://growtopia.wikia.com/wiki/${itemname}`;

    return new Promise((resolve, reject) => {

        scrapeIt(link, {
            description: {
              selector: "#mw-content-text > div.gtw-card.item-card > div:nth-child(2)"
            },
            recipe: {
                selector: 'table.content',
                convert: x => x.replace(/\n/g, "")
            },
            properties: {
              selector: "#mw-content-text > div.gtw-card.item-card > div:nth-child(4)",
              trim: false,
              convert: x => x.replace(/This/g,",This").split(",").slice(1)
            },
            sprite: {
              selector: "div.card-header .growsprite > img",
              attr: "src"
            },
            rarity: ".s_rarity",
            itemrecipe2: {
              selector: "#mw-content-text > div:nth-child(3)",
              convert: x => x.replace(/\n/g, "")
            },
            splice: ".bg-splice",
            info: {
              selector: "#mw-content-text > p:nth-child(4)"
            },
            fullName: "b > .alternative-suggestion"
    
        }).then(async ({ data, response }) => {

          if (!data.description && !data.sprite) {
            reject("Incorrect item name!");
          }

            resolve(data);

        }).catch(err => {
            reject(err);
        })
        
    });
}

/**
 * @param {String} input - Always checking for first char then keyword itself.
 */
module.exports.search = input => {

  const args = [input];

  return new Promise((resolve, reject) => {
    
    const letters = args[0].split('');
    scrapeIt('https://growtopia.fandom.com/wiki/Category:Item?from=' + letters[0], {
        items: {
            listItem: ".category-page__member-link",
            trim: false,
            attr: "title",
            data: []
        } 
    }).then(async ({ data, response }) => {
        const itemList = data.items;
        const queuedList = [];
        itemList.forEach(elem => {
            if (elem.toLowerCase().includes(args.join(" ").toLowerCase())) queuedList.push(elem);
            if (itemList.indexOf(elem)+1 === itemList.length) {
              if (queuedList.length > 0) resolve(queuedList)
              else resolve(null);
            }
        });
    }).catch(e => {
      reject(e);
    })

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

        let time = new Date().toLocaleDateString('en-En',{ month: "short",day: "numeric"});

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