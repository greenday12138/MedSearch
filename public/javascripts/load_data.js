// var csv=require('csv');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var es = require('event-stream');
var data = [];

var db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'medic'
}

var connection = mysql.createConnection(db);
connection.connect();

let readStream = fs.createReadStream(path.join(__dirname, '../data/temp.json'), {
    flags: 'r',
    encoding: 'utf8'
})
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {
        readStream.pause();

        data.push({cityCode:line[2], cityName:line[1], cityProvince:line[0]});

        if (data.length === 1000) {
            for(var i=0;i<1000;++i){
                connection.query('select count(*) as num from  `city` where `city_code` = ?', [data[i].cityCode],
                function (err, rows, fields) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    if (rows[0].num === 0) {
                        connection.query('insert into `city`(city_code,city_name,city_province) values (?,?,?)',
                            [data[i].cityCode, data[i].cityName, data[i].provinceName]);
                    }
                })

            }
            
            data.splice(0, 1000);
        }

        readStream.resume();
    }))
    .on('error', function (err) {
        console.error(err);
    })
    .on('end', function () {
        console.log("Finish entire file");
    })
connection.end();

// connection.query('select count(*) as num from  `city` where `city_code` = ?', [d[i].cityCode],
    //     function (err, rows, fields) {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         if (rows[0].num === 0) {
    //             connection.query('insert into `city`(city_code,city_name,city_province) values (?,?,?)',
    //                 [d[i].cityCode, d[i].cityName, d[i].provinceName]);
    //         }
    //     })