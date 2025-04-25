# Sub-Team 5.2 Report: Results Page

## 1. Summary of Decisions and Options Considered

Our sub-team was responsible for developing the results page of our application. The primary objectives were:

1. Display search results in both card view and tabular view formats.
2. Implement a detailed view for individual property listings.
3. Enable users to swipe between results and cycle through property images.

We considered several options for implementing these features:

- For the dual view (card and table), we debated between using a toggle switch or tabs for user selection. We ultimately chose a toggle switch for its simplicity and ease of use.
- For the detailed view, we considered a new page versus a modal. We opted for a modal to maintain context and improve user experience by keeping them on the same page.
- For image cycling, we explored using a carousel component versus simple next/previous buttons. We decided on a carousel for a more intuitive and visually appealing experience similar to what you see on current social media apps.

Our decisions were driven by user experience considerations, performance, and the need for seamless integration with other components of the application.

## 2. Individual Contributions

- **Marton**: Focused on implementing the details modal for individual property listings. This included creating the modal component, populating it with relevant data and organizing the styling to meet the client's requirements, and implementing the image cycling functionality within the modal. I also worked on integrating our codes during deployment and connecting everything before deployment.

- **Ozgen**: Worked on integrating the results page with the rest of the application. This involved setting up the main results view, implementing the card and table view toggle, and ensuring proper data flow from the search component to the results display. Also worked on the markdown file and putting together D2 documentation.

Both team members collaborated on code reviews, bug fixes, and overall design decisions to ensure a cohesive user experience.

## 3. Verification Instructions

In order to test our code on subteam 2, please follow these steps:

### OPTION 1:

1. Clone the repository and navigate to the project directory by doing `cd app`.
2. Install dependencies by running `npm install`
3. Start the development server with `npm run dev`
4. Navigate to the smart search screen and click view results.
5. Verify the following functionalities:
   - Toggle between card view and table view of results.
   - Click on a result to open the details modal.
   - Within the modal, test image cycling and property information display.
   - Test swiping between results in the modal view (this can be done by hovering you mouse on the far left and far right of the screen)

### OPTION 2:

1. Visit the deployment link
2. Follow steps 4 and 5 from option 1

All of our code can be found in the `app` directory. Key files include:

1. `results.tsx`
2. `homecard.tsx`
3. `homelist.tsx`
4. `homelistitem.tsx`
5. `detailmodal.tsx`
6. `detailmodal.css`

In addition to this we made slight adjustments to app.tsx and app.css to incorporate routing and slight global styling.

## Our Application:

### OPTION 1:

Follow the steps outlined in OPTION 1 Under the verification section to run the project.

### OPTION 2:

Build with Docker:

Clone this directory and navigate into the frontend folder:
git clone git@github.com:csc301-2024-f/project-5-startup.git
cd project-5-startup/app/frontend

Create Docker image (this will take a while on the first run)
docker build -t 301-d2 .

Run the docker image
docker run -d -p 80:80 301-d2

(This starts an nginx server listening to port 80, alternatively you can listen on a different port by changing the first 80 after -p)
