# Growtopia API

[![NPM](https://nodei.co/npm/growtopia-api.png)](https://nodei.co/npm/growtopia-api/)

[![npm version](https://badge.fury.io/js/growtopia-api.svg)](https://badge.fury.io/js/growtopia-api) [![GitHub license](https://img.shields.io/github/license/Growtopian-Bot/growtopia-api)](https://github.com/Growtopian-Bot/growtopia-api/blob/master/LICENSE) [![Build Status](https://img.shields.io/badge/build-passing-green)](https://github.com/Growtopian-Bot/growtopia-api) ![npm](https://img.shields.io/npm/dt/growtopia-api)

> Unofficial Growtopia API for searching item information, server status and gathering item sprites...

## :cloud: Installation

```sh
npm install growtopia-api
```

## :clipboard: Example

- **Searching Item Information**

```js
const { itemInfo } = require("growtopia-api");

itemInfo("angel").then(console.log);
/*
    Example output:

    {
      Name: "Angel Wings",
      URL: "https://growtopia.wikia.com/wiki/Angel_Wings",
      Description: "Better than a Halo, these will actually let you double jump!",
      Properties: [ "This item never drops any seeds", "This item can be transmuted" ],
      Sprite: "https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/704/y-offset/1952/window-width/32/window-height/32?fill=cb-20210701082040",
      Color: [ "#EFEFEF", "#FFFFFF" ],
      Rarity: undefined,
      Recipe: {
        type: "Valentine Loot",
        recipe: [
          "It is a possible drop from breaking either a  Heartstone,  Golden Booty Chest, or a  Super Golden Booty Chest or from a  Well of Love every five  Golden Booty Chests filled."     
        ]
      },
      Splice: undefined,
      Info: "The Angel Wings is an unsplicable back item which was added as part of Valentine"s Week 2013.",
      Type: "Clothes",
      matches: [
        "Angel Wings",
        "Angel of Mercy"s Wings",
        "Angelic Counting Cloud",
        "Angelic Heart Cloud"
      ]
    }

    */
```

- **Searching item names matching with keyword**

```js
const { searchItem } = require("growtopia-api");

searchItem("angel").then(console.log);

/*
    Returns an Array in following structure:
    e.g:

    [
      {
        itemName: "Angelic Heart Cloud",
        url: "https://growtopia.fandom.com/wiki/Angelic_Heart_Cloud"
      },
      {
        itemName: "Golden Angel Wings",
        url: "https://growtopia.fandom.com/wiki/Golden_Angel_Wings"
      }
    ]

     */
```

- **Get Item Sprite**

```js
const { getImage } = require("growtopia-api");

getImage("angel").then(console.log);

/*
    Returns an Array in following structure:
    e.g:

    https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/992/y-offset/1920/window-width/32/window-height/32?fill=cb-20201001200938

     */
```

- **Server Status**

```js
const { serverStatus } = require("growtopia-api");

serverStatus().then(console.log);

/*
    Example output (returns Object):

    {
        date: "Oct 18",
        time: " 10:05:36",
        playerCount: 48966,
        wotdName: "HETERODOXY",
        wotdURL: "https://www.growtopiagame.com/worlds/heterodoxy.png"
    }

    */
```
