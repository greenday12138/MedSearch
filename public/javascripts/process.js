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

load_county();

function load_county(){
    var connection=mysql.createConnection(db);
    let readStream = fs.createReadStream(path.join(__dirname, '../data/national_area_codes.csv'), {
        flags: 'r',
        encoding: 'utf8'
    })
        .pipe(es.split())
        .pipe(es.mapSync(function (li) {
            readStream.pause();

            var line = li.split(',')
            var data = {
                countyCode: line[2],
                countyName: line[1],
                cityCode: line[0]
            }

            connection.query('select count(*) as num from  `county` where `county_code` = ?', [data.countyCode],
                function (err, rows, fields) {
                    if (err) {
                         console.error(err);
                        return;
                    }
                    if (rows[0].num === 0) {
                        connection.query('insert into `county`(county_code,county_name,city_code) values (?,?,?)',
                            [data.countyCode, data.countyName, data.cityCode], function (err, rows) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                    }
                })


            // connection.end();
            readStream.resume();
        }))

}

function load_city() {
    var connection = mysql.createConnection(db);
    // connection.connect();
    let readStream = fs.createReadStream(path.join(__dirname, '../data/national_area_codes.csv'), {
        flags: 'r',
        encoding: 'utf8'
    })
        .pipe(es.split())
        .pipe(es.mapSync(function (li) {
            readStream.pause();


            var line = li.split(',')
            var data = {
                cityCode: line[2],
                cityName: line[1],
                cityProvince: line[0]
            }

            connection.query('select count(*) as num from  `city` where `city_code` = ?', [data.cityCode],
                function (err, rows, fields) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(rows);
                    if (rows[0].num === 0) {
                        connection.query('insert into `city`(city_code,city_name,city_province) values (?,?,?)',
                            [data.cityCode, data.cityName, data.cityProvince], function (err, rows) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                    }
                })


            // connection.end();
            readStream.resume();
        }))

}