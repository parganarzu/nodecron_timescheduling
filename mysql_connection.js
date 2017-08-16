var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_cron"

});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM cron_table", function (err, result, fields) {
        if (err) throw err;


        for(var i=0;i<result.length;i++){
            console.log(result[i]);
        }



    });
});

