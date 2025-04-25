import unittest

# Import the Flask app
from src.app import create_app


class TestApp(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Setup actions, like preparing test data in the database
        cls.app = create_app()
        cls.client = cls.app.test_client()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()

    def test_search_valid_1(self):
        response = self.client.post(
            "/api/search",
            json={
                "lat": 43.651070,
                "lon": -79.347015,
                "distance": 10,
                "filters": {"city": "Toronto"},
            },
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("houses", data)

    def test_search_valid_2(self):
        response = self.client.post(
            "/api/search",
            json={
                "lat": 45,
                "lon": 45,
                "distance": 10,
            },
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data, {"houses": []})

    def test_search_valid_3(self):
        response = self.client.post(
            "/api/search",
            json={
                "lat": 45,
                "lon": 45,
                "distance": 999999999,
                "filters": {"sqft": 1000, "has_ac": 1},
            },
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data["houses"]), 21)

    def test_search_invalid_payload(self):
        response = self.client.post("/api/search", json={})
        self.assertEqual(response.status_code, 400)

    def test_get_house_valid(self):
        response = self.client.get("/api/property/1")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], 1)
        self.assertIn("images", data)

    def test_get_house_not_found(self):
        response = self.client.get("/api/property/999")
        self.assertEqual(response.status_code, 404)

    def test_get_image_valid(self):
        response = self.client.get("/api/images/101")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, "image/jpeg")

    def test_get_image_not_found(self):
        response = self.client.get("/api/images/999")
        self.assertEqual(response.status_code, 404)

    # def test_chatbot_valid_message(self):
    #     response = self.client.post("/api/chat", json={"message": "Hello, chatbot!"})
    #     self.assertEqual(response.status_code, 200)
    #     data = response.get_json()
    #     self.assertEqual(data["response"], "You typed: Hello, chatbot!")

    # def test_chatbot_missing_message(self):
    #     response = self.client.post("/api/chat", json={})  # No message provided
    #     self.assertEqual(response.status_code, 400)
    #     data = response.get_json()
    #     self.assertEqual(data["error"], "No message provided")

    # def test_chatbot_empty_message(self):
    #     response = self.client.post("/api/chat", json={"message": ""})
    #     self.assertEqual(response.status_code, 200)
    #     data = response.get_json()
    #     self.assertEqual(data["response"], "You typed: ")


if __name__ == "__main__":
    unittest.main()
