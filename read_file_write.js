var fs = require("fs");

var dateTime = require('date-time');

console.log("Going to write into existing file");
fs.appendFile('my_file', 'Date and hour: ' + dateTime() ,  function(err) {
    if (err) {
        return console.error(err);
    }

    console.log("Data written successfully!");
    console.log("Let's read newly written data");
    fs.readFile('my_file', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
    });
});