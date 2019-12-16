var express = require('express');
var db = require('../db')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('/index.html');
});

router.post('/selectdoctor', function (req, res, next) {
  console.log(req.body);
  var sql = {
    sql: 'select doctor_id,name.name_ch as name,doctor_profession from `doctor` natural join `name` where doctor_political= ? and doctor_faculty= ?',
    values: [req.body.political, req.body.faculty]
  }
  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }
    connection.query(sql, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      //console.log(sql);
      var data = [];
      for (var i = 0, max = rows.length; i < max; ++i) {
        data.push({
          doctor_id: rows[i].doctor_id,
          doctor_name: rows[i].name,
          doctor_profession: rows[i].doctor_profession
        })
      }
      //console.log(data);
      res.json(data);
    })

    connection.release();
  })
})

router.post('/selecthospital', function (req, res, next) {
  console.log(req.body);
  var sql = {
    sql: 'select hospital_id,hospital_name from `hospital` natural join `city` where city_name= ? and city_province=?',
    values: [req.body.city, req.body.prov]
  };
  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }
    connection.query(sql, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      var data = [];
      for (var i = 0, max = rows.length; i < max; ++i) {
        data.push({
          hospital_id: rows[i].hospital_id,
          hospital_name: rows[i].hospital_name
        })
      }

      console.log(data);
      res.json(data);
    })

    connection.release();
  })
})

router.post('/getdocinfo', function (req, res, next) {
  var sql = {
    sql: 'select * from `doctor` natural join `name`'
  }
})

router.post('/gethosinfo', function (req, res, next) {
  console.log(req.body);

  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }
    connection.query('select * from `hospital` natural join `city` where hospital_id=?',
      [req.body.id], function (err, rows) {
        if (err) {
          console.error(err);
          return;
        }
        var data = {
          hospital_id: rows[0].hospital_id,
          hospital_name: rows[0].hospital_name,
          hospital_class: rows[0].hospital_class,
          hospital_address: rows[0].hospital_address,
          hospital_introduction: rows[0].hospital_introduction,
          city_name: rows[0].city_name,
          city_province: rows[0].city_province
        };
        
        console.log(data);
        res.json(data);
      })
    connection.release();
  })
})

module.exports = router;
