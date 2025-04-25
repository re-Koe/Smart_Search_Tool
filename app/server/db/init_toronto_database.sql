-- Create Houses table with price and address fields
CREATE TABLE IF NOT EXISTS Houses (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      lat NUMERIC(10, 8) NOT NULL,
    lon NUMERIC(11, 8) NOT NULL,
    city TEXT NOT NULL,
    area_code TEXT NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    has_ac BOOLEAN,
    sqft INTEGER,
    year INTEGER,
    has_basement BOOLEAN,
    description TEXT,
    price REAL,
    address TEXT
    );

-- Create Images table
CREATE TABLE IF NOT EXISTS Images (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      house_id INTEGER NOT NULL,
                                      image_id INTEGER NOT NULL,
                                      FOREIGN KEY (house_id) REFERENCES Houses (id) ON DELETE CASCADE
    );

-- Insert sample data into Houses
INSERT INTO Houses (lat, lon, city, area_code, bedrooms, bathrooms, has_ac, sqft, year, has_basement, description, price, address)
VALUES
    (43.651070, -79.347015, 'Toronto', 'M5A', 3, 2, 1, 1200, 2015, 0, 'A cozy home in downtown Toronto', 950000, '123 Queen St E, Toronto, ON'),
    (43.644120, -79.402580, 'Toronto', 'M5V', 2, 1, 1, 800, 2018, 0, 'Modern condo with great city views', 850000, '456 King St W, Toronto, ON'),
    (43.725910, -79.453790, 'Toronto', 'M3N', 4, 3, 1, 2500, 2005, 1, 'Spacious house in a quiet neighborhood', 1750000, '789 Finch Ave W, Toronto, ON'),
    (43.761539, -79.411079, 'Toronto', 'M4N', 5, 4, 1, 3200, 1998, 1, 'Luxury home in North Toronto', 2200000, '101 York Mills Rd, Toronto, ON'),
    (43.719061, -79.493018, 'Toronto', 'M6M', 3, 2, 0, 1500, 2010, 1, 'Charming family home near parks', 900000, '112 Jane St, Toronto, ON'),
    (43.752410, -79.370562, 'Toronto', 'M5N', 4, 3, 1, 2400, 2012, 0, 'Well-maintained house in midtown Toronto', 1350000, '250 St. Clair Ave W, Toronto, ON'),
    (43.748817, -79.367106, 'Toronto', 'M6B', 3, 2, 1, 1800, 2000, 1, 'Beautiful home with a large backyard', 1550000, '600 Bathurst St, Toronto, ON'),
    (43.759279, -79.303426, 'Toronto', 'M9A', 3, 2, 1, 2200, 2008, 1, 'Detached home in a family-friendly neighborhood', 1750000, '30 North Dr, Toronto, ON'),
    (43.648549, -79.381097, 'Toronto', 'M5B', 2, 2, 1, 1000, 2016, 0, 'Bright 2-bedroom apartment in downtown', 1050000, '75 Sherbourne St, Toronto, ON'),
    (43.647895, -79.377261, 'Toronto', 'M5G', 1, 1, 0, 600, 2017, 0, 'Compact unit in the heart of Toronto', 600000, '35 Gerrard St E, Toronto, ON'),
    (43.655106, -79.344567, 'Toronto', 'M5G', 3, 2, 1, 1400, 2012, 1, 'Family home with a beautiful garden', 1200000, '18 Dundas St E, Toronto, ON'),
    (43.654365, -79.395043, 'Toronto', 'M5B', 4, 3, 1, 2500, 2014, 1, 'Spacious townhouse in downtown Toronto', 1750000, '100 Bay St, Toronto, ON'),
    (43.672957, -79.353235, 'Toronto', 'M6K', 3, 3, 1, 2000, 2006, 1, 'Beautiful Victorian home with modern upgrades', 1300000, '223 Roncesvalles Ave, Toronto, ON'),
    (43.676802, -79.414479, 'Toronto', 'M4C', 3, 2, 1, 1800, 2009, 0, 'Modern home in a great neighborhood', 1400000, '205 Cosburn Ave, Toronto, ON'),
    (43.749745, -79.451299, 'Toronto', 'M3M', 2, 1, 1, 800, 2010, 1, 'Stylish condo with great amenities', 750000, '1500 Jane St, Toronto, ON'),
    (43.737268, -79.377926, 'Toronto', 'M4A', 4, 3, 1, 2200, 2004, 1, 'Renovated home near parks', 1650000, '51 Lawrence Ave E, Toronto, ON'),
    (43.711011, -79.331401, 'Toronto', 'M6A', 5, 4, 1, 3500, 1999, 1, 'Large house with a private backyard', 2100000, '235 Sheppard Ave W, Toronto, ON'),
    (43.759711, -79.421017, 'Toronto', 'M5A', 3, 2, 1, 1600, 2013, 0, 'Luxury apartment with city views', 1800000, '90 Front St E, Toronto, ON'),
    (43.711836, -79.434102, 'Toronto', 'M3H', 3, 2, 1, 1800, 2006, 1, 'Spacious family home', 1450000, '88 Wilson Ave, Toronto, ON'),
    (43.739653, -79.295982, 'Toronto', 'M9N', 2, 2, 1, 950, 2015, 1, 'Condo near transit', 650000, '12 Weston Rd, Toronto, ON'),
    (43.715682, -79.396820, 'Toronto', 'M6P', 3, 2, 0, 2000, 2011, 0, 'Detached home with modern design', 1650000, '87 High Park Ave, Toronto, ON'),
    (43.728695, -79.309259, 'Toronto', 'M9R', 4, 3, 1, 2500, 2000, 1, 'Family-friendly neighborhood, close to schools', 1800000, '45 Royal York Rd, Toronto, ON'),
    (43.757328, -79.370349, 'Toronto', 'M5A', 3, 2, 1, 1500, 2012, 0, 'Spacious unit with walkout balcony', 1100000, '55 Bathurst St, Toronto, ON'),
    (43.753852, -79.304729, 'Toronto', 'M5N', 4, 3, 1, 2800, 2010, 1, 'Luxury home with top-notch features', 1900000, '72 Dupont St, Toronto, ON'),
    (43.729312, -79.451123, 'Toronto', 'M5R', 3, 3, 1, 2100, 2009, 0, 'Elegant home with a large living space', 1600000, '48 Avenue Rd, Toronto, ON'),
    (43.642375, -79.387797, 'Toronto', 'M5T', 2, 1, 0, 700, 2015, 0, 'Cozy apartment in Chinatown', 650000, '188 Spadina Ave, Toronto, ON'),
    (43.755612, -79.370161, 'Toronto', 'M5H', 3, 2, 1, 1700, 2014, 1, 'Townhome with a modern interior', 1250000, '23 Mercer St, Toronto, ON'),
    (43.734116, -79.331947, 'Toronto', 'M6L', 4, 2, 1, 2500, 2012, 1, 'Family home with a huge yard', 1750000, '101 Glencairn Ave, Toronto, ON');

-- Insert sample data into Images
INSERT INTO Images (house_id, image_id)
VALUES
    (1, 101),
    (1, 102),
    (2, 201),
    (3, 301),
    (3, 302),
    (4, 401),
    (5, 501),
    (6, 601),
    (7, 701),
    (8, 801),
    (9, 901),
    (10, 1001),
    (11, 1101),
    (12, 1201),
    (13, 1301),
    (14, 1401),
    (15, 1501),
    (16, 1601),
    (17, 1701),
    (18, 1801),
    (19, 1901),
    (20, 2001),
    (21, 2101),
    (22, 2201),
    (23, 2301),
    (24, 2401),
    (25, 2501),
    (26, 2601),
    (27, 2701),
    (28, 2801);
