module.exports.dashboard = function(req,res){
    return res.render('user_dashboard',{
        title: "Home"
    });
    // return res.end('<h1>Express is up for Employee review system</h1>');
}