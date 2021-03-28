insert into hotels (hotel_name, star_category, hotel_brand_id, address_id)
    values ('Andaz Ottawa', 4, 2, 102), ('Andaz Donghai', 4, 2, 100), ('Hacker Hostel Ottawa', 2, 1, 101);

insert into rooms (room_title, room_description, hotel_id, price, mountain_view, ocean_view, can_extend, has_tv, has_ac, has_mini_bar, has_hairdryer, has_wifi)
    values
        ('Master Bedroom', 'Cozy comfort in the hacker hostel master bedroom', 3, 104.99, false, false, true, false, true, false, true, true),
        ('Room 2', 'Coziest room in the hacker hostel', 3, 38.99, false, false, true, false, true, false, true, true),
        ('Room 3', 'Underground comfort in the hacker hostel', 3, 58.99, false, false, true, false, true, false, true, true),
        ('Room 4', 'Spacious underground comfort in the hacker hostel', 3, 78.99, false, false, true, false, true, false, true, true);

insert into rooms (room_title, room_description, hotel_id, price, mountain_view, ocean_view, can_extend, has_tv, has_ac, has_mini_bar, has_hairdryer, has_wifi)
    values
        ('1 King Bed', 'Enjoy 302 sq ft of space in this king-bedded guest room, with a walk-in closet, rainfall shower, and floor-to-ceiling windows.', 1, 158, false, false, true, true, true, true, true, true),
        ('2 Queen Bed', 'Relax amid 302 square feet of space with two queen beds, a walk-in closet and rainfall shower.', 1, 158, false, false, true, true, true, true, true, true),
        ('1 King Bed with View', 'Enjoy a king-bedded room with a view of the cityscape, walk-in closet, and rainfall shower, set amid 302 to 355 sq ft of space.', 1, 183, false, false, true, true, true, true, true, true),
        ('2 Queen Bed with View', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 1, 183, true, true, true, true, true, true, true, true),
        ('2 Queen Bed with View', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 1, 183, true, true, true, true, true, true, true, true),
        ('1 King Bed Deluxe', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 1, 193, false, false, true, true, true, true, true, true),
        ('1 King Bed Deluxe with View', 'With 355 to 398 sq ft of space, the Andaz Large King features a sitting area, walk-in closet, rainfall shower, and a corner location.', 1, 208, true, true, true, true, true, true, true, true),
        ('1 King Bed Deluxe with View', 'Enjoy 302 to 398 sq ft of space, a walk-in closet, rainfall shower, and luxurious amenities, complemented by city views.', 1, 208, true, true, true, true, true, true, true, true),
        ('Andaz Suite', 'Spread out in this roomy suite boasting 549 square feet of space, with one king bed, a walk-in closet, rainfall shower and deep-soaking tub, a separate living area, and magnificent city views. This is a standard suite.', 1, 258, true, true, true, true, true, true, true, true);

insert into rooms (room_title, room_description, hotel_id, price, mountain_view, ocean_view, can_extend, has_tv, has_ac, has_mini_bar, has_hairdryer, has_wifi)
    values
        ('1 King Bed', 'Enjoy 302 sq ft of space in this king-bedded guest room, with a walk-in closet, rainfall shower, and floor-to-ceiling windows.', 2, 158, false, false, true, true, true, true, true, true),
        ('2 Queen Bed', 'Relax amid 302 square feet of space with two queen beds, a walk-in closet and rainfall shower.', 2, 158, false, false, true, true, true, true, true, true),
        ('1 King Bed with View', 'Enjoy a king-bedded room with a view of the cityscape, walk-in closet, and rainfall shower, set amid 302 to 355 sq ft of space.', 2, 183, false, false, true, true, true, true, true, true),
        ('2 Queen Bed with View', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 2, 183, true, true, true, true, true, true, true, true),
        ('2 Queen Bed with View', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 2, 183, true, true, true, true, true, true, true, true),
        ('1 King Bed Deluxe', 'With 302 to 355 sq ft of space, the Andaz View Queen promises stunning city views and includes a walk-in closet and rainfall shower.', 2, 193, false, false, true, true, true, true, true, true),
        ('1 King Bed Deluxe with View', 'With 355 to 398 sq ft of space, the Andaz Large King features a sitting area, walk-in closet, rainfall shower, and a corner location.', 2, 208, true, true, true, true, true, true, true, true),
        ('1 King Bed Deluxe with View', 'Enjoy 302 to 398 sq ft of space, a walk-in closet, rainfall shower, and luxurious amenities, complemented by city views.', 2, 208, true, true, true, true, true, true, true, true),
        ('Andaz Suite', 'Spread out in this roomy suite boasting 549 square feet of space, with one king bed, a walk-in closet, rainfall shower and deep-soaking tub, a separate living area, and magnificent city views. This is a standard suite.', 2, 258, true, true, true, true, true, true, true, true);