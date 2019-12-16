var mysql = require('mysql');

var db = {
    connectlimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'medic',
    multipleStatements: true
}
var data = [];
const DBConnection = mysql.createPool(db);

function getProvince(){
    return new Promise((resolve,reject)=>{

    })
}

function getLocation() {
    /*
     [
       province:,
       county:[
         ...s
       ]
     ]
     */
    
    DBConnection.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connection.query('select city_name,city_province  from `city`',
            function (err, rows, fields) {
                if (err) {
                    console.error(err);
                    return;
                }
                
                for(var i=0,max=rows.length;i<max;++i){
                    // console.log(rows[i]);
                    var temp={
                        city_name:rows[i].city_name,
                        city_province:rows[i].city_province
                    }
                    //console.log(temp);
                    data.push(temp);
                    //console.log(data);
                }
                //console.log(rows);
                // for (var i = 0, max = rows.length; i < max; ++i) {
                //     DBConnection.getConnection(function (err, con) {
                //         con.query('select distinct city_name from `city` where city_province= ?', [rows[i].city_province],
                //             function (err, output, fields) {
                //                 if (err) {
                                   
                //                     console.error(err);
                //                     return;
                //                 }
                //                 // console.log(output);
                //                 var city = [];
                //                 for (var i = 0, max = output.length; i < max; ++i) {
                //                     city.push(output[i].city_name);
                //                 }

                //                 var temp = {
                //                     province: sql.values,
                //                     city: city
                //                 }
                //                 console.log(temp);
                //                 data.push(temp);
                //                 con.release();
                //             });

                //     })

                // }
                connection.release();
            })
    })

    DBConnection.end(function(err){
        console.log(data);
    })
    return data;
}

module.exports.DBConnection = DBConnection;