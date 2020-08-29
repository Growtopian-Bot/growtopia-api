# GROWAPI
[![npm version](https://badge.fury.io/js/growapi.svg)](https://badge.fury.io/js/growapi) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![NPM](https://nodei.co/npm/growapi.png)](https://nodei.co/npm/growapi/) 

> An unofficial Growtopia API for searching item information, server status and more...

## :cloud: Installation
```sh
npm install --save growapi
```

## :clipboard: Example
```js
const growapi = require('growapi');

#Searching Item Information
growapi.itemInfo("Angel Wings").then(data => {
    console.log(data);
    
    /*
    *Returns in this format:
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


## :scroll: License

[MIT][license] © [Aykut Saraç][website]

[license]: /LICENSE
[website]: https://github.com/AykutSarac