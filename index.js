const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));


app.use(expressLayouts);

// use express router
 
app.use('/', require("./routes"));

// view engine setting

app.set('view engine','ejs');
app.set('views', './views');


app.listen(port, function(err, res){
    if(err){
        console.log("Error", err);
        return;
    }
    console.log(`Server is running on port ${port}`);
})
