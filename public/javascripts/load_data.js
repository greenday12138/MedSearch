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

load_doctor();

function load_doctor(){
    var connection=mysql.createConnection(db);

    let readStream=fs.createReadStream(path.join(__dirname,'../data/temp.csv'),{
        flags:'r',
        encoding:'utf8'
    })
        .pipe(es.split(/\nMA/))
        .pipe(es.mapSync(function(li){
            readStream.pause();

            var str=li;
            var state=0;
            for(var i=0,max=str.length;i<max;++i){
                
            }
            var data={};

            readStream.resume();
        }))
}

function load_hospital() {
    var connection = mysql.createConnection(db);

    let readStream = fs.createReadStream(path.join(__dirname, '../data/temp.csv'), {
        flags: 'r',
        encoding: 'utf8'
    })
        .pipe(es.split())
        .pipe(es.mapSync(function (li) {
            readStream.pause();

            var data = {}
            var line = li.split(',');
            var str = li.split('"');
            if (str.length===3) {
                //retreave introduction strat and end with "
                lin_0=str[0].split(',');
                data.hospital_id = lin_0[0].split('_').pop();
                data.hospital_name=lin_0[1];
                data.hospital_city=lin_0[3];
                data.hospital_province=lin_0[2];
                data.hospital_introduction=str[1];
                lin_1=str[2].split(',');
                data.hospital_class=lin_1[1];
                data.hospital_address=lin_1[2];
            } else {
                data.hospital_id = line[0].split('_').pop(),
                    data.hospital_name = line[1],
                    data.hospital_province = line[2],
                    data.hospital_city = line[3],
                    data.hospital_introduction = line[4],
                    data.hospital_class = line[5],
                    data.hospital_address = line[6]
            }

            if (data.hospital_id.length === 8) {
                var sql = {
                    sql: '',
                    values: []
                }
                if (data.hospital_province == '重庆市' || data.hospital_province == '上海市' ||
                    data.hospital_province == '天津市' || data.hospital_province == '北京市') {
                    sql.sql = 'select city_code from `city` where city_province = ?';
                    sql.values = [data.hospital_province];
                } else {
                    sql.sql = 'select city_code from `city` where city_name = ?';
                    sql.values = [data.hospital_city];
                }
                connection.query(sql, function (err, rows, fields) {
                    if (err) {
                        console.log(data);
                        console.error(err);
                        return;
                    }
                    if (rows.length === 0) {
                        // console.log(data);

                        //select city_county in county db
                        sql.sql = 'select city_code from `county` where county_name=?';
                        sql.values = [data.hospital_city];
                        connection.query(sql, function (err, rows, fields) {

                            if (err) {
                                console.log(data);
                                console.error(err);
                                return;
                            }
                            if (rows.length === 0) {
                                console.log(data);
                                console.error(rows);
                            } else {
                                //can't find the city
                                data.city_code = rows[0].city_code;

                                insert_hospital(connection, data);
                            }
                        })
                    } else {
                        data.city_code = rows[0].city_code;

                        insert_hospital(connection, data);
                    }

                })

            }

            readStream.resume();
        }))
}
function insert_hospital(connection, data) {
    connection.query('insert into `hospital` (hospital_id,hospital_name,hospital_class,hospital_address,hospital_introduction,city_code)' +
        ' values (?,?,?,?,?,?)',
        [data.hospital_id, data.hospital_name, data.hospital_class, data.hospital_address, data.hospital_introduction, data.city_code],
        function (err) {
            if (err) {
                console.error(err);
                return;
            }
        })
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
            var data = {};
            if (line.length === 14) {
                data.name_ch = line[1];
                data.pinying = line[9];
                data.full_surname = line[10];
                data.abbre_surname = line[11];
                data.full_firstname = line[12];
                data.abbre_firstname = line[13];

            } else {
                data.name_ch = line[1];
                line.reverse();
                data.pinying = line[4];
                data.full_surname = line[3];
                data.abbre_surname = line[2];
                data.full_firstname = line[1];
                data.abbre_firstname = line[0];
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