const swiggy = require("./swiggy");
const db = require("./db").db;

(async ()=>{
    data = await swiggy.retrieved("https://www.swiggy.com/restaurants/drunken-monkey-4th-block-jayanagar-bangalore-173591");
    console.log(data)
})();
 