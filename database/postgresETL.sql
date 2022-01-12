
CREATE DATABASE "productstest";

CREATE TABLE "products" (
  id serial,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT,
  PRIMARY KEY(id)
);

CREATE TABLE "features" (
  id serial ,
  product_id INT,
  fabric VARCHAR,
  canvas VARCHAR,
  PRIMARY KEY(id)
);

CREATE TABLE "related" (
  product_id serial,
  current_product_id INT,
  related_product_id INT
);


CREATE TABLE "styles" (
  id serial,
  product_id INT,
  name VARCHAR,
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY(id)
);

CREATE TABLE "skus" (
  id serial ,
  style_id INT,
  size VARCHAR,
  quantity INT,
  PRIMARY KEY(id)
);

CREATE TABLE "photos" (
  id serial ,
  style_id INT,
  url VARCHAR,
  thumbnail_url VARCHAR,
  PRIMARY KEY(id)
);


ALTER TABLE `features` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `related` ADD FOREIGN KEY (current_product_id) REFERENCES `products` (`id`);
ALTER TABLE `related` ADD FOREIGN KEY (related_product_id) REFERENCES `products` (`id`);

ALTER TABLE `skus` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);


