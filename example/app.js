const gtAPI = require('../lib/index');


gtAPI.itemInfo("Angel Wings").then(data => {

    /**
     * Item name has to be exact name and is case sensitive.
     * Returns json of item information including sprite link, recipe, description & properties.
     */

    console.log(data);

}).catch(err => {
    console.log(err);
});

gtAPI.search("ancestral").then(data => {

    console.log(data); // Returns a json with matchin item names.

}).catch(err => {
    console.log(err);
})


gtAPI.server().then(data => {
    console.log(data);
});



