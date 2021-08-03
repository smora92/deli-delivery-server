
-- BEGIN;
-- ALTER TABLE IF EXISTS restaurants
-- DROP COLUMN image;

-- ALTER TABLE IF EXISTS menu
-- DROP COLUMN image;
-- DROP TABLE IF EXISTS menu;

-- ALTER TABLE menu
-- ADD COLUMN 'restaurant_id' FOREIGN KEY REFERENCES restaurants(id) ON DELETE SET NULL;

INSERT INTO restaurants (restaurant_name,description,rating,delivery_fee)
VALUES ('McDonalds', 'American','2.1', '2.20'), ('Juice point', 'healthy', '4.8',  '5.00' ), ('five guys', 'fast food', '3.5',  '3.00' ),
  ('La Serre','french breakfast','4.5','6.00'), ('wendys','fresh meat','4.2', '2.20'),
  ('Paul','Bakery & restaurant','4.7', '4.40')



INSERT INTO
  menu(item_name,price,category,restaurant_id)
VALUES
  (
    'sandwich',
    '10.00',
    'food',
    'e41d73d7-5870-4ef2-831e-c977f22ee023'
  ),
  (
    'orange juice',
    '8.00',
    'drinks',
    '57e6a65f-54a2-40ae-9d0a-f158e7c8e8a0'
  ),
  (
    'burger',
    '5.00',
    'food',
    '312835f4-4f58-43ab-924b-7124b549152b'
  ),
  (
    'meatloaf',
    '15.00',
    'food',
    '30eed634-f8b7-40bc-b35d-514ae0a5e2db'
  ),(
    'coffee',
    '6.50',
    'drinks',
    '28834a48-c96e-4714-b02d-4176e73d60f6'
  ),(
    'beef wrap',
    '25.50',
    'food',
    'fd92ccda-c1db-4f87-b964-684cfe20a58e'
  ),(
    'coca cola',
    '3.00',
    'drinks',
    'c17ee177-444b-4d1c-a3df-0cc1b064d66b'
  ),(
    'chicken wings',
    '14.50',
    'food',
    'fd92ccda-c1db-4f87-b964-684cfe20a58e'
  ),(
    'egg toast',
    '12.00',
    'food',
    '30eed634-f8b7-40bc-b35d-514ae0a5e2db'
  ),(
    'milkshake',
    '7.50',
    'drinks',
    'fd92ccda-c1db-4f87-b964-684cfe20a58e'
  ),(
    'baguette',
    '10.50',
    'food',
    '82c655dd-bad7-4977-836a-fd18dc8c87b2'
  ),
  (
    'tea',
    '8.00',
    'drinks',
    'e41d73d7-5870-4ef2-831e-c977f22ee023'
  )

-- COMMIT;



-- attach menu to restaurant_id foreign key