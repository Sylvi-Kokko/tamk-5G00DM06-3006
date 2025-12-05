-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 022-domain-constraints-product.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);
INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: product' FROM dual;

DROP TABLE IF EXISTS product;

CREATE TABLE product
(
    id        INTEGER         NOT NULL,
    name      VARCHAR(150)    NOT NULL,
    description     VARCHAR(150)    NOT NULL,
    weight     INTEGER,
    selling_price      INTEGER,
    net_price   INTEGER,
    CONSTRAINT product__id_pk PRIMARY KEY (id),
    CONSTRAINT product__name_ck CHECK (length(name) > 4),
    CONSTRAINT product__desc_ck CHECK (length(description) > 10),
    CONSTRAINT product__weight_ck CHECK (weight > 0),
    CONSTRAINT product__sellprice_ck CHECK (selling_price > 0),
    CONSTRAINT product__net_lt_sell_ck CHECK (net_price < selling_price),

);

COMMIT;

-- Fails, net_price not less than selling_price
INSERT INTO product (product_id, name, description, weight, selling_price, net_price)
VALUES (1, 'Gadget', 'A useful gadget', 50, 100, 120);
-- Fails, weight not positive
INSERT INTO product (product_id, name, description, weight, selling_price, net_price)
VALUES (2, 'Toy', 'A fun widget', -20, 100, 90);

-- End of file