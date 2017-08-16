var cron = require('node-cron');
var mysql = require('mysql');
var dateTime = require('date-time');
var fs = require("fs");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_cron"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM cron_table", function (err, result, fields) {
        if (err) throw err;


        result.forEach((item) => {
            cron.schedule(item.cron_interval, () => {
                // console.log(new Date(), item);


                //writing to file the execution time.
                fs.appendFile('my_file', 'Date and hour: ' + dateTime(), function (err) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log("Data written successfully!", item);

                });

                //writing the execution time to related database record.
                con.query('UPDATE cron_table SET date_executed = ? WHERE id = ?', [dateTime(), item.id], function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });


                //increase the step in record
                item.execution_step++;
                con.query('UPDATE cron_table SET execution_step = ? WHERE id = ?', [item.execution_step, item.id], function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " step is updated");
                });

                //checking success value in database

                if(item.success==0){
                    con.query('UPDATE cron_table SET success = ? WHERE id = ?', [1, item.id], function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                }

            });
        });





    });
});



