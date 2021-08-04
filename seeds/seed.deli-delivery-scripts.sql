
-- BEGIN;
-- ALTER TABLE restaurants
-- ADD COLUMN image VARCHAR; 

-- ALTER TABLE IF EXISTS menu
-- DROP COLUMN image;
-- DROP TABLE IF EXISTS menu;

-- ALTER TABLE menu
-- ADD COLUMN 'restaurant_id' FOREIGN KEY REFERENCES restaurants(id) ON DELETE SET NULL;

-- INSERT INTO restaurants (restaurant_name,description,rating,delivery_fee)
-- VALUES ('McDonalds', 'American','2.1', '2.20'), ('Juice point', 'healthy', '4.8',  '5.00' ), ('five guys', 'fast food', '3.5',  '3.00' ),
--   ('La Serre','french breakfast','4.5','6.00'), ('wendys','fresh meat','4.2', '2.20'),
--   ('Paul','Bakery & restaurant','4.7', '4.40')


-- INSERT INTO restaurants (restaurant_name,description,id,image,delivery_fee)
-- VALUES('McDonalds', 'American','c1291187-3674-4b77-9bf5-86474f03e3e4', 'https://github.com/smora92/deli-delivery-server/blob/main/src/images/farhad-ibrahimzade-cq7y4VMwJco-unsplash.jpg','2.20')
-- ON CONFLICT ON CONSTRAINT restaurant_id
-- DO NOTHING;

-- INSERT INTO restaurants (restaurant_name,description,id,image,delivery_fee)
-- VALUES('jddff','drinks','e41d73d7-5870-4ef2-831e-c977f22ee023', 'NULL', '2.00')
-- ON CONFLICT ON CONSTRAINT restaurant_id
-- DO UPDATE SET image = 'https://github.com/smora92/deli-delivery-server/blob/main/src/images/hiang-kanjinna-TblrCnbSj5Q-unsplash.jpg';


INSERT INTO
  menu(item_name,price,category,restaurant_id)
VALUES
  (
    'sandwich',
    '10.00',
    'food',
    'c1291187-3674-4b77-9bf5-86474f03e3e4'
  ),
  (
    'orange juice',
    '8.00',
    'drinks',
    '312835f4-4f58-43ab-924b-7124b549152b'
  ),
  (
    'burger',
    '5.00',
    'food',
    'c1291187-3674-4b77-9bf5-86474f03e3e4'
  ),
  (
    'meatloaf',
    '15.00',
    'food',
    '312835f4-4f58-43ab-924b-7124b549152b'
  ),(
    'coffee',
    '6.50',
    'drinks',
    '30eed634-f8b7-40bc-b35d-514ae0a5e2db'
  ),(
    'beef wrap',
    '25.50',
    'food',
    'c17ee177-444b-4d1c-a3df-0cc1b064d66b'
  ),(
    'coca cola',
    '3.00',
    'drinks',
    'c1291187-3674-4b77-9bf5-86474f03e3e4'
  ),(
    'chicken wings',
    '14.50',
    'food',
    '28834a48-c96e-4714-b02d-4176e73d60f6'
  ),(
    'egg toast',
    '12.00',
    'food',
    'c17ee177-444b-4d1c-a3df-0cc1b064d66b'
  ),(
    'milkshake',
    '7.50',
    'drinks',
    '30eed634-f8b7-40bc-b35d-514ae0a5e2db'
  ),(
    'baguette',
    '10.50',
    'food',
    '28834a48-c96e-4714-b02d-4176e73d60f6'
  ),
  (
    'tea',
    '8.00',
    'drinks',
    '28834a48-c96e-4714-b02d-4176e73d60f6'
  )

-- COMMIT;



-- attach menu to restaurant_id foreign key