# growapi
[![Patreon](https://camo.githubusercontent.com/93e5d9cc433f49122b0b4ea81910cc91ed82aef9/68747470733a2f2f696f6e69636162697a61752e6769746875622e696f2f6261646765732f70617472656f6e2e737667)](https://www.patreon.com/phemus) [![npm version](https://badge.fury.io/js/growapi.svg)](https://badge.fury.io/js/growapi)  [![GitHub license](https://img.shields.io/github/license/AykutSarac/growapi)](https://github.com/AykutSarac/growapi/blob/master/LICENSE)  [![Build Status](https://img.shields.io/badge/build-passing-green)](https://github.com/AykutSarac/growapi)  ![npm](https://img.shields.io/npm/dt/growapi)


[![NPM](https://nodei.co/npm/growapi.png)](https://nodei.co/npm/growapi/)

  

> An unofficial Growtopia API for searching item information, server status and more...

  

## :cloud: Installation

```sh

npm install --save growapi

```

  

## :clipboard: Example

-  **Searching Item Information**

```js

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

```

  
-  **Searching item names matching with keyword**


```js

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

```

  

-  **Server Status**

  

```js

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

```