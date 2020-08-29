# GROWAPI
[![npm version](https://badge.fury.io/js/growapi.svg)](https://badge.fury.io/js/growapi) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![NPM](https://nodei.co/npm/growapi.png)](https://nodei.co/npm/growapi/) 

> An unofficial Growtopia API for searching item information, server status and more...

## :cloud: Installation
```sh
npm install --save growapi
```

## :clipboard: Example

- **Searching Item Information**
```js
const growapi = require('growapi');

growapi.itemInfo("Angel Wings").then(data => {
    console.log(data);
    
    /*
    Returns in this format:
    {
        description: Description of item.
        recipe: Recipe.
        properties: Item props like if it's an untradeable etc.
        sprite: Returns url of item sprite.
        rarity: Item rarity.
        itemrecipe2: Some recipes cannot be returned at recipe so we got this.
        splice: If it's an splicable item returns the recipe.
        info: Additional information on how to obtain item.
        fullName: If item name is typed wrong and there's a suggestion it appears here.
    }
    */
});
```

- **Searching item names matching with keyword**

```js
growapi.search("ancestral").then(data => {

    console.log(data);
    /*  Output:
    [
      'Ancestral Lens of Riches',
      'Ancestral Orb of Time',
      'Ancestral Seed of Life',
      'Ancestral Tesseract of Dimensions',
      'Ancestral Totem of Wisdom'
    ]
    */

}).catch(err => {
    console.log(err);
})
```

- **Server Status**

```js
growapi.server().then(data => {
    console.log(data);
    /*  Output:
    {
      date: 'Aug 29',
      time: ' 11:04:32',
      online: 44319,
      wotdname: 'DANCE',
      wotdimage: 'https://www.growtopiagame.com/worlds/dance.png'
    }
    */
}).catch(e => {
    console.error(e);
});
```


## :scroll: License

[MIT][license] © [Aykut Saraç][website]

[license]: /LICENSE
[website]: https://github.com/AykutSarac