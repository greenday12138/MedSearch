// var csv=require('csv');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var es = require('event-stream');
var db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'medic'
}

function load_name() {
    var connection = mysql.createConnection(db);
    var d = [];

    let readStream = fs.createReadStream(path.join(__dirname, '../data/doctor.csv'), {
        flags: 'r',
        encoding: 'utf8'
    })
        .pipe(es.split(/\nMA/))
        .pipe(es.mapSync(function (li) {
            readStream.pause();

            var line = li.split(',');
            console.log(line.length);
            var data={};
            if(line.length===14){
                data.name_ch=line[1];
                data.pinying=line[9];
                data.full_surname=line[10];
                data.abbre_surname=line[11];
                data.full_firstname=line[12];
                data.abbre_firstname=line[13];
                
            }else {
                data.name_ch=line[1];
                line.reverse();
                data.pinying=line[4];
                data.full_surname=line[3];
                data.abbre_surname=line[2];
                data.full_firstname=line[1];
                data.abbre_firstname=line[0];
            }
            // console.log(data);

            connection.query('select count(*) as num from  `name` where `name_ch` = ?', [data.name_ch],
                function (err, rows, fields) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    if (rows[0].num === 0) {
                        connection.query('insert into `name`(name_ch,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname) values (?,?,?,?,?,?)',
                            [data.name_ch, data.pinying, data.full_surname, data.abbre_surname, data.full_firstname, data.abbre_firstname], function (err, rows) {
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

function load_county() {
    var connection = mysql.createConnection(db);
    let readStream = fs.createReadStream(path.join(__dirname, '../data/national_area_codes.csv'), {
        flags: 'r',
        encoding: 'utf8'
    })
        .pipe(es.split())
        .pipe(es.mapSync(function (li) {
            readStream.pause();

            var line = li.split(',')
            var data = {
                countyCode: line[4],
                countyName: line[3],
                cityCode: line[2]
            }
            console.log(data);

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