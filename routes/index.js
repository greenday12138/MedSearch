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
  console.log(req.body);

  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }
    var sql = {
      sql: 'select doctor_id,doctor_faculty, doctor_profession, doctor_political,doctor_expertise, doctor_description,' +
        'name.name_ch as name,pinying,full_surname,abbre_surname,full_firstname,abbre_firstname ' +
        'from `doctor` natural join `name` where name_ch= ?',
      values: [req.body.name_ch]
    }
    connection.query(sql, function (err, rows) {
      if (err) {
        console.error(err);
        return;
      }

      var data = {};
      if (rows.length > 0) {
        data.doctor_id = rows[0].doctor_id;
        data.doctor_faculty = rows[0].doctor_faculty;
        data.doctor_profession = rows[0].doctor_profession;
        data.doctor_political = rows[0].doctor_political;
        data.doctor_expertise = rows[0].doctor_expertise;
        data.doctor_description = rows[0].doctor_description;
        data.name_ch = rows[0].name;
        data.pinying = rows[0].pinying;
        data.full_surmane = rows[0].full_surname;
        data.abbre_surname = rows[0].abbre_surname;
        data.full_firstname = rows[0].full_firstname;
        data.abbre_firstname = rows[0].abbre_firstname;

        connection.query('select article_id,author_order,department from `article` where doctor_id= ?',
        data.doctor_id, function (err, re) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(re);
          var ar = [];
          for (var j = 0, mx = re.length; j < mx; ++j) {
            ar.push({
              article_id: re[j].article_id,
              author_order: re[j].author_order,
              department: re[j].department
            })
          }
          data.articles = ar;

          console.log(data);
          res.json(data);
        })
      }else{
        res.json(null);
      }
    })
    connection.release();
  })
})

router.post('/gethosinfo', function (req, res, next) {
  console.log(req.body);

  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }
    connection.query('select * from `hospital` natural join `city` where hospital_name=?',
      [req.body.name], function (err, rows) {
        if (err) {
          console.error(err);
          return;
        }
        var data = {};
        if (rows.length > 0) {
          data.hospital_id = rows[0].hospital_id;
          data.hospital_name = rows[0].hospital_name;
          data.hospital_class = rows[0].hospital_class;
          data.hospital_address = rows[0].hospital_address;
          data.hospital_introduction = rows[0].hospital_introduction;
          data.city_name = rows[0].city_name;
          data.city_province = rows[0].city_province;

          console.log(data);
          res.json(data);
        }else{
          res.json(null);
        }
      })
    connection.release();
  })
})

router.post('/staffinfo', function (req, res, next) {
  console.log(req.body);

  db.DBConnection.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }

    var sql = {
      sql: 'select doctor_faculty,name_ch from `doctor` where hospital_id in ' +
        '( select hospital_id from `hospital` where hospital_name= ? ) order by doctor_faculty',
      values: req.body.name
    }
    connection.query(sql, function (err, rows) {
      if (err) {
        console.error(err);
        return;
      }
      var data = [];
      /*
      [
        {
          faculty:,
          doctor:[
            '张小曼',' 何关忠'
          ]
        },
        {...}
      ]
      */
     
      if (rows.length > 0) {
        var buffer = {
          faculty: rows[0].doctor_faculty,
          doctor: [rows[0].name_ch]
        };
        for (var i = 0, max = rows.length; i < max; ++i) {
          var item = {
            faculty: rows[i].doctor_faculty,
            doctor: [rows[i].name_ch]
          }
          if (item.faculty != buffer.faculty) {
            data.push(buffer);
            buffer=item;
          } else{
            if(i!=0){
              buffer.doctor.push(rows[i].name_ch);
            }
          
          }
        }
      }

      console.log(data);
      res.json(data);
    })

    connection.release();
  })
})

module.exports = router;
