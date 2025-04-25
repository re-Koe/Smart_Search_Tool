import sqlite3
import argparse
import sys

DB_FILE = "db.sqlite3"


def execute_sql_file(cursor, sql_file):
    with open(sql_file, "r", encoding="utf8") as file:
        sql_script = file.read()
        cursor.executescript(sql_script)


def main():
    parser = argparse.ArgumentParser(
        description="Populate a SQLite database using a specified SQL file."
    )
    parser.add_argument(
        "sql_file", type=str, help="Path to the .sql file to pre-populate the database."
    )
    args = parser.parse_args()

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Check if tables exist and create them if not (using the updated schema)
    create_table_query = """
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
        price REAL,  -- New field for price
        address TEXT  -- New field for address
    );
    """

    create_images_table_query = """
    CREATE TABLE IF NOT EXISTS Images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        house_id INTEGER NOT NULL,
        image_id INTEGER NOT NULL,
        FOREIGN KEY (house_id) REFERENCES Houses (id) ON DELETE CASCADE
    );
    """

    cursor.execute(create_table_query)
    cursor.execute(create_images_table_query)
    conn.commit()

    try:
        execute_sql_file(cursor, args.sql_file)
        print(f"Database populated with data from {args.sql_file}.")
    except sqlite3.Error as e:
        print(f"An error occurred while executing the SQL file: {e}", file=sys.stderr)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
    print("Done")
