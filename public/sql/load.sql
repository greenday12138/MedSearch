LOAD DATA LOCAL INFILE 'D:\Git\MedSearch\public\data\temp.csv'
INTO TABLE city
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;