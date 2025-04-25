# Real Time/bob_2_final_v2.txt.py

## Description about the project

Our product is an intuitive front-end interface for a smart search tool, combining a chatbot and interactive mapping to enable realtors to discover properties that precisely meet their clients' unique requirements.

## Deployment and Github Workflow

​We will follow the [React styling guide specified here:](https://dev.to/abrahamlawson/react-style-guide-24pp).
We will also be using [Prettier](https://prettier.io/) for code formating and [ESLint](https://eslint.org/) for code linting on the frontend and [black](https://github.com/psf/black) and [Pylint](https://pylint.readthedocs.io/en/stable/) for linting.

Each pull request will be reviewed by two other people in the team, depending on expertise and availability.

## Verification Details and Accessing Deployed Application

- The software functionalities match our documentation, and a production build deployed to AWS can be veiwed [here](http://3.142.242.46/) (http only).
- All features are live and operational, with the latest version deployed and reflected in our repository.

## Application: Details Regarding Deployment and Further Application

A public production build is viewable [here](http://3.142.242.46/).

### Build manually:

To deploy this from your terminal, you would first need to install npm from [Node.js](https://nodejs.org/en) (npm (Node Package Manager) is included with Node.js). Then, follow these steps:

1. Clone this directory:

```bash
git clone git@github.com:csc301-2024-f/project-5-startup.git
```

#### Frontend

1. Navigate into the `frontend` folder

```bash
cd project-5-startup/app/frontend
```

2. Install dependencies (this may take a while)

```bash
npm install --legacy-peer-deps
```

3. Set up Environment variables\
   add a '.env.development' folder with the

```
VITE_API_URL=http://localhost:8000
VITE_MAP_API_KEY=AIzaSyAof6s8GTaYQepyrL8OsitmxaXRJ9eWx0Q
```

and a '.env.production' folder with

```
VITE_API_URL=http://<PRODUCTION URL HERE>
VITE_MAP_API_KEY=AIzaSyAof6s8GTaYQepyrL8OsitmxaXRJ9eWx0Q
```

5. Preview

   a. To run in development mode:

   ```bash
   npm run dev
   ```

   b. To build and preview a production version:

   ```bash
   npm run build
   npm run preview
   ```

#### Backend

1. Navigate into the `server` folder

```bash
cd project-5-startup/app/server
```

2. Obtain a Google Gemini API key from https://aistudio.google.com/app/apikey, then create a `.env` folder in the `server` directory with the following key:

```
GEMINI_API_KEY=YOUR_API_KEY
```

3. Create the database

```bash
make db
```

4. Install dependencies

```bash
make deps
```

5. Run the app in development mode

```bash
make app
```

### Build with Docker:

1. Clone the repository and open it:

```bash
git clone git@github.com:csc301-2024-f/project-5-startup.git
cd project-5-startup/app
```

2. Obtain a Google Gemini API key from https://aistudio.google.com/app/apikey, and add the enviroment key to `docker-compose.yml`

```yml
...
container_name: realtime-backend
environment: YOUR_API_KEY
build:
...
```

3. Run Docker compose

```bash
docker compose up
```

4. By default this creates two bind-mounts, one for the database file and one for the static folder in your working directory. Place the example database file into the `db` folder and any images you want to be accessible to the `/images` endpoint into the `static` folder. Note that as Docker must run as root, you may need to `sudo chown` these directories back to yourself to place files into them.

---

## User Stories

As a realtor, I want to quickly see what kind of stores are near my listings, so I can inform my client about what the listing's location has to offer. Because of this, we decided to show nearby locations for listings whenever user clicks on a marker on the map.\
As a realtor, I want to filter nearby places according to my client's preference, so I can quickly find the listings that is near the parks and stores. Because of this, we decided to provide a POI filter under the map so the users can filter what types of nearby locations they want to see when they click on a listing.\
As a realtor, I want to be able to filter listings that have more than 3 rooms, so I can accommodate my client who has two children. Because of that, we added the option to apply filters to listings, including number of rooms.

## Software Architecture

![Software Architecture Diagram](deliverables/Mock%20Ups/software%20architecture%20diagram.jpg)

The diagram shows the architecture of the application, which is divided into three primary layers:

### Presentation Layer

- Built using React and Material-UI.
- Contains the SmartSearch Page, Results Page, and the Chat Component in the SmartSearch Page for user interaction.
- Makes API calls to the backend for fetching data and displays the responses.

### Application Layer

- Powered by a Flask backend.
- Handles API routes:
  - `/api/search`: Processes search queries for property listings.
  - `/api/property/<id>`: Fetches detailed information about a specific property.
  - `/api/images/<id>`: Serves property images.
  - `/api/chat`: Facilitates communication between the Chat Component and the backend.
- Queries data from the SQLite database and serves responses to the frontend.

### Data Layer

- Stores property and image metadata in an SQLite database with two tables:
  - **Properties Table:** Contains information about properties.
  - **Images Table:** Maps image IDs to their respective file paths.
- Images are served from a Public Folder.

### External API

- The Google Maps API is used directly by the frontend to fetch location data.

This architecture ensures a modular and extensible design, enabling a clear separation of concerns between the frontend and backend. Each component communicates with the others via well-defined API endpoints, allowing for efficient data retrieval and a good user experience.

---

## Unit Tests for the Frontend

This section provides an overview of the unit testing setup and practices implemented for the frontend of the project.

### Overview

The frontend unit tests are written to ensure that components and functionality behave as expected. They cover rendering, event handling, and logic. The tests are implemented using the following tools:

- **Testing Framework:** Jest - A JavaScript testing framework.
- **Testing Library:** React Testing Library - A library for testing React components.
- **Babel:** Used to transpile modern JavaScript and JSX code for testing compatibility.

### Setup

1. Clone this directory and navigate into the `frontend` folder:

```bash
git clone git@github.com:csc301-2024-f/project-5-startup.git
cd project-5-startup/app/frontend
```

2. To run the tests, ensure you have all dependencies installed. Install them using:

```bash
npm install --legacy-peer-deps
```

### Scripts

3. The following command is used to execute the tests:

```bash
npm test
```

### File Structure

The unit tests for the frontend are located in the `src/components/__test__` directory. Below are the current test files and their responsibilities:

- **Results.test.jsx**
  - Tests the functionality of the Results page.
  - Includes test cases for rendering results, handling user interactions, and verifying proper data updates.
- **SmartSearch.test.jsx**
  - Tests the behavior of the SmartSearch component.
  - Covers tests for rendering, form validation, and integration with routing.

### Key Features Tested

- **Component Rendering:** Ensures that components render correctly with the expected data and structure.
- **User Interactions:** Tests UI interactions such as button clicks, form submissions, and navigation.
- **Edge Cases:** Verifies the app handles invalid inputs or missing data gracefully.
- **Styling:** Confirms components use proper CSS classes and styles.

### Testing Environment

The following configurations were added to support testing:

- **.babelrc Configuration**
  - Ensures compatibility with modern JavaScript and JSX for Jest.
  - Example:
    ```json
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
      ]
    }
    ```
- **jest.setup.ts**
  - Contains additional setup required for Jest and React Testing Library.
  - Example setup:
    ```javascript
    import "@testing-library/jest-dom";
    ```

### Writing New Tests

To write a new test:

1. Create a test file in `src/components/__test__/` with the naming convention `ComponentName.test.js`.
2. Import the required modules:
   ```javascript
   import { render, screen } from "@testing-library/react";
   import ComponentName from "../ComponentName";
   ```
3. Write your test cases using Jest:
   ```javascript
   test("renders the component correctly", () => {
     render(<ComponentName />);
     expect(screen.getByText("Expected Text")).toBeInTheDocument();
   });
   ```

### Future Improvements

- Increase coverage for edge cases and error handling.
- Add snapshot testing for visual consistency.
- Integrate tests with CI/CD pipelines for automated testing on every commit.

This testing suite ensures reliability and maintainability for the frontend of the project. For any issues or contributions, feel free to open a pull request or file an issue.

---

## Unit Tests for the Backend

This section provides an overview of the unit testing setup and practices implemented for the backend of the project.

### Overview

The backend unit tests are written to ensure the APIs and core functionalities of the Flask application behave as expected. These tests validate the behavior of individual endpoints, database interactions, and error handling. The tests are implemented using the following tools:

- **Testing Framework:** Python's unittest module.
- **Mocking Library:** unittest.mock - Used for mocking database and API calls during testing.
- **Test Client:** Flask's built-in test client - Used for testing Flask endpoints.

### Setup

1. Clone this directory and navigate into the server folder:
   ```bash
   git clone git@github.com:csc301-2024-f/project-5-startup.git
   cd project-5-startup/app/server
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

### Running Tests

The following command is used to execute the tests:

```bash
make tests
```

### File Structure

The unit tests for the backend are located in the `tests` directory. Below are the current test files and their responsibilities:

- **test_search.py**
  - Tests the `/api/search` endpoint.
  - Includes test cases for valid and invalid payloads, empty results, and database errors.
- **test_property.py**
  - Tests the `/api/property/<id>` endpoint.
  - Verifies that the correct property details are returned for a valid ID.
- **test_chat.py**
  - Tests the `/api/chat` endpoint.
  - Covers tests for valid user messages, error handling, and expected bot responses.

### Key Features Tested

- **API Endpoints:** Ensures endpoints return correct HTTP responses, JSON payloads, and error codes for various scenarios.
- **Database Interactions:** Validates database queries, proper data retrieval, and error handling in edge cases.
- **Error Handling:** Tests that invalid requests or server-side errors are handled gracefully with appropriate status codes and messages.
- **Mocked Components:** Ensures isolated testing by mocking database connections and external APIs where necessary.

### Testing Environment

The following configurations were used for backend testing:

- **Flask Configuration:**
  - A separate testing configuration is used during tests to ensure tests do not interfere with the production database.
  - Example configuration:
    ```python
    app.config["TESTING"] = True
    app.config["DATABASE"] = "sqlite:///:memory:"  # In-memory database for testing
    ```
- **Mocking Database Connections:**
  - Mock objects replace actual database connections to simulate data retrieval.
  - Example:
    ```python
    from unittest.mock import MagicMock
    db.get_houses_near_location = MagicMock(return_value=[{"id": 1, "lat": 43.0, "lon": -79.0}])
    ```

### Writing New Tests

To write a new test:

1. Create a test file in the `tests/` directory with the naming convention `test_<module>.py`.
2. Import the required modules and create a test class:

   ```python
   import unittest
   from app import create_app

   class TestSearchAPI(unittest.TestCase):
       def setUp(self):
           self.app = create_app()
           self.client = self.app.test_client()
   ```

3. Write your test cases:
   ```python
   def test_search_valid_payload(self):
       response = self.client.post(
           "/api/search", json={"lat": 43.0, "lon": -79.0, "distance": 10}
       )
       self.assertEqual(response.status_code, 200)
       self.assertIn("houses", response.json)
   ```

### Future Improvements

- Increase test coverage for edge cases and error handling.
- Add integration tests to validate end-to-end workflows.
- Integrate tests with CI/CD pipelines for automated testing on every commit.

This backend testing suite ensures API functions and database has reliable interactions. For any issues or contributions, feel free to open a pull request or file an issue.

## Automated Testing

The project includes automated testing configurations to ensure the reliability and functionality of both the frontend and backend components. However, due to the current billing setup, the csc301 organization who set up this repo isnt paying for automated testing, so automated tests are not being executed as intended. Below is an overview of the automated testing setup:

#### Testing Frameworks Used

- **Frontend:** Jest and React Testing Library are used to validate the behavior and rendering of React components.
- **Backend:** Python's unittest and Flask's built-in testing client are used to test API endpoints and backend functionalities.

#### Current Status

- Automated tests are configured to run on each push via GitHub Actions.
- Due to billing restrictions in the repository's organization, the tests fail to execute.

---

## Preview of our app and video

![image](https://github.com/user-attachments/assets/e1b4ddf4-9b68-4165-b47c-d3865574e342)
![image](https://github.com/user-attachments/assets/d86a0a0c-d3fb-4df8-b821-3b7eac837f2e)
![image](https://github.com/user-attachments/assets/1657cadc-4fde-4ee2-bfae-16b3007cd4fe)
![image](https://github.com/user-attachments/assets/50d7272d-fcb8-4c58-8a13-dc1721efd145)
![image](https://github.com/user-attachments/assets/0fb1bbb1-b464-4530-8e90-a3a313d0ce86)
![image](https://github.com/user-attachments/assets/f217433a-76d1-4fb1-be57-9e1fca2dd26e)
Link to our demo video is [here](https://drive.google.com/drive/folders/19QSu8VVEscCDXub74GkufUsWiujIOqu9?usp=sharing).

---

### Maintenance and Future Development

To ensure the longevity and scalability of the project, the following practices and guidelines are recommended for future maintenance and development:

#### Maintenance Guidelines

- **Regular Updates:**

  - Ensure dependencies (both frontend and backend) are updated regularly to minimize vulnerabilities and maintain compatibility with modern systems.
  - Update environment variables as needed (e.g., VITE_API_URL, VITE_MAP_API_KEY) and rotate API keys periodically for security.

- **Bug Tracking and Resolution:**

  - Use an issue-tracking tool (e.g., GitHub Issues) to document bugs, feature requests, and ongoing tasks.
  - Maintain a changelog to document fixes, updates, and enhancements.

- **Testing:**

  - Regularly run and expand unit tests for both frontend and backend to ensure the reliability of new features and modifications.
  - Add integration and end-to-end testing to validate the interaction between components.

- **Monitoring:**

  - Implement monitoring tools like AWS CloudWatch or New Relic to track application performance and detect errors in the production environment.
  - Set up alerts for critical issues, such as server downtime or failed API calls.

- **Documentation:**
  - Update this README and any related documentation with every major code change.
  - Document newly discovered frequent issues and debugging steps.

#### Future Development

- **New Features:**

  - Enhanced Filtering: Add more filters based on market trends or user preferences, such as schools, commute time, or recent renovations.
  - Predictive Analytics: Incorporate machine learning to suggest properties to users based on historical data and user behavior.

- **Scalability:**

  - Migrate to a more robust database (e.g., PostgreSQL or MongoDB) if the volume of data increases significantly.
  - Explore container orchestration (e.g., Kubernetes) to handle traffic spikes efficiently.

- **Third-Party Integration:**

  - Integrate additional APIs (e.g., real estate market analysis, demographics data) to provide more insightful analytics to users.

- **Security Enhancements:**

  - Implement stricter authentication and authorization measures (e.g., OAuth, 2FA).
  - Conduct regular penetration testing to identify and fix vulnerabilities.

- **CI/CD Pipelines:**

  - Establish continuous integration and deployment pipelines to automate testing and deployment processes.

- **User Feedback:**
  - Gather user feedback through surveys or analytics to prioritize new features and improvements.

---

## Build Manually (Old Version)

To deploy the old version of the application from your terminal, you first need to install npm from [Node.js](https://nodejs.org/en) (npm (Node Package Manager) is included with Node.js). Then, follow these steps:

1. Clone this repository and switch to the `old_version` branch:

   ```bash
   git clone git@github.com:csc301-2024-f/project-5-startup.git
   cd project-5-startup
   git checkout old_version
   ```

2. Navigate into the frontend folder:

   ```bash
   cd app/frontend
   ```

3. Install dependencies (this may take a while):

   ```bash
   npm install --legacy-peer-deps
   ```

4. Run the application:

   a. To run in development mode:

   ```bash
   npm run dev
   ```

   b. To build and preview a production version:

   ```bash
   npm run build
   npm run preview
   ```

   This will start the application locally at [http://localhost:3000](http://localhost:3000). (Might be different for different computers for example mine is http://localhost:5173/)

---

## License

This project is licensed under the MIT License.

### Reason for Choosing the MIT License

The MIT License was chosen for its simplicity, flexibility, and permissiveness. It allows:

- **Freedom of Use:** Anyone can use, modify, and distribute the code for both personal and commercial purposes.
- **Attribution Requirement:** It ensures proper credit is given to the original authors.
- **Collaboration-Friendly:** Its permissive nature encourages contributions from a broader community without imposing restrictive conditions.
- **Suitability for Open Source:** The MIT License aligns with the goal of fostering collaboration and transparency in open-source projects.

By adopting the MIT License, we ensure our project remains accessible while maintaining necessary recognition for contributors.
