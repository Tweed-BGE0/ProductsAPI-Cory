Drop DATABASE IF EXISTS products;
CREATE DATABASE products;

DROP TABLE products CASCADE;

CREATE TABLE products (
  id serial,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT,
  PRIMARY KEY(id)
);

DROP TABLE features CASCADE;

CREATE TABLE features (
  id serial ,
  product_id INT,
  feature VARCHAR,
  value VARCHAR,
  PRIMARY KEY(id)
);

DROP TABLE related CASCADE;

CREATE TABLE related (
  id serial,
  current_product_id INT,
  related_product_id INT
);

DROP TABLE styles CASCADE;

CREATE TABLE styles (
  id serial,
  product_id INT,
  name VARCHAR,
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY(id)
);

DROP TABLE skus CASCADE;

CREATE TABLE skus (
  id serial ,
  style_id INT,
  size VARCHAR,
  quantity INT,
  PRIMARY KEY(id)
);

DROP TABLE photos CASCADE;

CREATE TABLE photos (
  id serial ,
  style_id INT,
  url VARCHAR,
  thumbnail_url VARCHAR,
  PRIMARY KEY(id)
);


ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES products (id);
ALTER TABLE related ADD FOREIGN KEY (related_product_id) REFERENCES products (id);

ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (id);


CREATE INDEX idx_features_productid
ON features(product_id) ;

CREATE INDEX idx_photos_style_id
ON photos(style_id) ;

CREATE INDEX idx_related_related_product_id
ON related(related_product_id) ;

CREATE INDEX idx_skus_style_id
ON skus(style_id) ;

CREATE INDEX idx_related_current_product_id
ON related(current_product_id) ;

CREATE INDEX idx_styles_product_id
ON styles(product_id) ;
