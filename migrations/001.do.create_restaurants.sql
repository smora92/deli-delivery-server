-- DROP TABLE IF EXISTS restaurants;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "restaurants"(
  'id' uuid default uuid_generate_v4(),
  'restaurant_name' TEXT NOT NULL,
  'description' TEXT NOT NULL, 
  'rating' decimal(2, 1) CHECK ('rating >=1 AND rating <= 5'),
  'delivery_fee' decimal(12, 2) NOT NULL,
  CONSTRAINT 'restaurant_id' PRIMARY KEY ('id')
  -- CONSTRAINT 'restaurant_rating_check' CHECK (rating >=1 AND rating <= 5)
);

-- ALTER TABLE 'restaurants' ADD CONSTRAINT 'chk_rating' CHECK ('rating > 0 AND rating <= 5')
-- REFERENCES 'restaurants'('rating');


CREATE TYPE  item_type AS ENUM (
  'food',
  'drinks'
);


CREATE TABLE IF NOT EXISTS "menu" (
    'item_id' uuid default uuid_generate_v4(),
    'item_name' TEXT NOT NULL, 
    'price' decimal(12, 2) NOT NULL,
    'category' item_type  NOT NULL,
    CONSTRAINT 'item_id' PRIMARY KEY ('item_id')
);

CREATE TABLE IF NOT EXISTS "customers" (
  'customer_id' uuid default uuid_generate_v4() PRIMARY KEY,
  'customer_name' VARCHAR(255) NOT NULL,
  'address' VARCHAR(1024) NOT NULL,
  'email' VARCHAR(255) NOT NULL UNIQUE,
  'mobile' VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS "orders" (
   'order_id' serial,
   'delivery_fee' decimal(12, 2) NOT NULL,
   'order_total' decimal(12, 2) NOT NULL,
   'customer_id' uuid NULL,
   'restaurant_id' uuid NULL,
   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL,
   FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS "order_items" (
  'order_item_id' serial AUTO_INCREMENT,
  'item_id' uuid NOT NULL,
   'order_id' integer NOT NULL,
   'quantity' integer  NOT NULL,
   FOREIGN KEY (item_id) REFERENCES menu(item_id) ON DELETE CASCADE,
   FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);




