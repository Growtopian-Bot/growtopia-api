const growapi = require('../lib/index');


growapi.itemInfo("Angel Wings").then(data => {

    /**
     * Item name has to be exact name and is case sensitive.
     * Returns json of item information including sprite link, recipe, description & properties.
     */

    console.log(data);

}).catch(err => {
    console.error(err);
});

growapi.search("ancestral").then(data => {

    console.log(data); // Returns a json with matchin item names.

}).catch(err => {
    console.error(err);
});


growapi.server().then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
})



