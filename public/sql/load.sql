LOAD DATA LOCAL INFILE 'D:\Git\MedSearch\public\data\temp.csv'
INTO TABLE city
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

insert into county (county_code,county_name,city_code)
values  ('110102000000','西城区','110100000000');