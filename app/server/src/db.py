import sqlite3
from typing import Dict, Any, List, Optional
import math

EARTH_RADIUS_KM = 6371


class Database:
    def __init__(self, path: str) -> None:
        self.conn = sqlite3.connect(path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row

    def get_house(self, house_id: int) -> Optional[Dict[str, Any]]:
        cursor = self.conn.cursor()

        cursor.execute(
            """
            SELECT * FROM Houses WHERE id = ?
        """,
            (house_id,),
        )

        house_row = cursor.fetchone()

        if house_row is None:
            return None

        house = dict(house_row)

        cursor.execute(
            """
        SELECT image_id FROM Images WHERE house_id = ?
        """,
            (house_id,),
        )

        image_rows = cursor.fetchall()

        image_ids = [dict(row)["image_id"] for row in image_rows]
        house["images"] = image_ids

        return house

    def get_houses_in_city(self, city: str) -> List[Dict[str, Any]]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM Houses WHERE city = ?", (city,))
        return [dict(row) for row in cursor.fetchall()]

    def get_houses_near_location(
        self, lat: float, lon: float, distance: int, **filters
    ) -> List[Dict[str, Any]]:
        cursor = self.conn.cursor()

        # Convert latitude and longitude to radians for Haversine calculation
        lat_rad = math.radians(lat)
        lon_rad = math.radians(lon)

        query = """
        SELECT id, city AS name, lat, lon, (
            ? * acos(
                cos(?) * cos(radians(lat)) *
                cos(radians(lon) - ?) +
                sin(?) * sin(radians(lat))
            )
        ) AS distance
        FROM Houses
        WHERE distance <= ?
        """

        # Add each filter to the query
        parameters = [EARTH_RADIUS_KM, lat_rad, lon_rad, lat_rad, distance]

        # Generally formatting strings in a SQL statment is a VERY BAD idea, however
        # since we're only allowing keys in predefined columns, it *should* generally
        # be okay. SQLite also doesnt allow using '?' for "lvalues", so im not sure if there
        # is any proper way to do this, besides maually filtering everything in python.
        for key, value in filters.items():
            if key in ["has_ac", "has_basement"]:
                query += f" AND {key} = ?"
                parameters.append(value)
            elif key in ["bedrooms", "bathrooms", "sqft", "year"]:
                query += f" AND {key} >= ?"
                parameters.append(value)
            elif key in ["price"]:
                query += f" AND {key} <= ?"
                parameters.append(value)

        # Execute the query
        cursor.execute(query, parameters)

        # Fetch results and return only the relevant fields
        houses = [
            {"id": row["id"], "name": row["name"], "lat": row["lat"], "lon": row["lon"]}
            for row in cursor.fetchall()
        ]

        return houses
