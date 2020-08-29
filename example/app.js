const gtAPI = require('../lib/index');

/*
gtAPI.itemInfo("Angel").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
*/

gtAPI.server().then(data => {
    console.log(data);
});



