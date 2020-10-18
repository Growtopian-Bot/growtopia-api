const growapi = require('../lib/index');


//  Searching Item Information
growapi.itemInfo("angel").then(item => {
    console.log(item);

    /*
    Example output:

    {
    itemdesc: 'Better than a Halo, these will actually let you double jump!',
    itemprops: 'This item never drops any seeds.This item can be transmuted.',
    itemimage: 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/992/y-offset/1920/window-width/32/window-height/32?fill=cb-20201001200938',
    itemrarity: '',
    itemrecipe: [
        'Valentine Loot',
        'It is a possible drop from breaking either a  Heartstone or a  Golden Booty Chest.'
    ],
    itemsplice: '',
    itemexinfo: "The Angel Wings is an unsplicable back item which was added as part of Valentine's Week 2013."
    }

    */

}).catch(error => {
    //   Handle Error
    console.error(error);
});



//  Searching item names matching with keyword
growapi.search("angel").then(data => {

    console.log(data);

    /*
    Returns an Array in following structure:
    e.g:

    [
      {
        name: 'Angelic Heart Cloud',
        url: 'https://growtopia.fandom.com/wiki/Angelic_Heart_Cloud'
      },
      {
        name: 'Golden Angel Wings',
        url: 'https://growtopia.fandom.com/wiki/Golden_Angel_Wings'
      }
    ]

     */


}).catch(error => {
    //  Handle the error here
    console.error(error);
});



//  Server Status
growapi.server().then(data => {

    console.log(data);

    /*
    Example output (returns Object):

    {
        date: 'Oct 18',
        time: ' 10:05:36',
        online: 48966,
        wotdname: 'HETERODOXY',
        wotdimage: 'https://www.growtopiagame.com/worlds/heterodoxy.png'
    }

    */

}).catch(error => {
    //  Handle error
    console.error(error);
});