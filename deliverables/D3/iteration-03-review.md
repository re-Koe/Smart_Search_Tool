# Team 5: bob_2_final_v2.txt.py

> _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.
>
> _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.

## Iteration XX - Review & Retrospect

- When: Nov 17, 2024
- Where: Online on Discord

## Process - Reflection

#### Q1. What worked well

List **process-related** (i.e. team organization and how you work) decisions and actions that worked well.

- We divided the work into frontend, backend, and integration teams, which allowed each team to do their own work without disturbing each other. 
- Check ins regarding the project regularly helped (around 5 times each week), this helped us stay on track and helped us focus towards our goals for the deliverables.
- Using branches, pull requests, and peer code reviews ensured high-quality code integration and reduced the chances of conflicts.
- Maintaining up-to-date documentation for APIs and architecture diagrams helped team members better understand what was going on and also made it easier for who ever was reviewing code pull requests.

#### Q2. What did not work well

List **process-related** (i.e. team organization and how you work) decisions and actions that did not work well.

- The allocation of tasks was not always balanced, leading to some team members taking on significantly more work while others had fewer responsibilities. This uneven workload distribution caused delays in some tasks and reduced overall team efficiency. A more structured and even task assignment is needed to make sure everyone has an even workload.
- Although tasks were divided clearly at the start, there was insufficient communication between the frontend, backend, and integration teams until late in the iteration. This led to issues like mismatched API expectations and integration challenges.
- Misalignment between the frontend and backend teams on API functionality and data formats caused confusion and more work during integration. For example, mismatched expectations for filter structures required more last-minute adjustments.

#### Q3(a). Planned changes

List any **process-related** (i.e. team organization and/or how you work) changes you are planning to make (if there are any)

- Implement a Login and Authentication System: Adding user authentication will allow us to secure user data and provide personalized experiences, such as saving search preferences and chat history.
- Add a Favorites or Shortlist Feature: Letting users mark properties as favorites or add them to a shortlist for later review would really help our users.
- Enable Chat Functionality with AI Assistance: Our partners were supposed to have an AI for this section but we are not working with them anymore. We would still like to do this part but maybe not as complex as wanted since we have limited time.
#### Q3(b). Integration & Next steps

Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

We integrated the previously developed components by merging the individual sub-repos into a unified main repository. Each component was tested and connected using well-defined API endpoints and shared configuration files. For instance, the frontend components (SmartSearch and Chat) were integrated with the Flask backend by using its API endpoints, and the backend was linked to the SQLite database to manage data.

This assignment was helpful as it provided clarity on how to break down and distribute tasks among team members while ensuring the final product came together. It also highlighted the importance of modular development, proper version control, and communication during integration. For the next steps, we aim to enhance the app with features like authentication, favourites, and chat AI capabilities.

## Product - Review

#### Q4. How was your product demo?

- How did you prepare your demo?
- What did you manage to demo to your partner?
- Did your partner accept the features? And were there change requests?
- What were your learnings through this process? This can be either from a process and/or product perspective.
- _This section will be marked very leniently so keep it brief and just make sure the points are addressed_


We are not working with our partners anymore, but we will describe our thoughts on the demo. 

We prepared the demo by finalizing key features like SmartSearch, Chat, and Results components, ensuring they were functional and integrated with the backend. We also created test data in the database and made sure our application was working properly to make sure our demo was good. Our demo demonstrates the main functionalities of the app, including the SmartSearch filters, the Google Maps integration, property results display, and the Chat feature. It also showcases how the app communicates with the backend APIs and database. Through this process, we learned the importance of clear communication and preparation and how that leads to a successful demo. We also realized the value of early integration and continuous testing to avoid last minute issues.
