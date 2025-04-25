# Sub-Team 1 Report

## Summary of Decisions and Options Considered

For our frontend development, we chose to use React with TypeScript and MUI (Material-UI) as our UI framework. The decision was influenced by these factors:

- **MUI (Material-UI)**: We selected MUI for its robust component library and design flexibility, which allows for the development of clean, responsive, and consistent UIs. MUI provides a variety of pre-built components that align with Google's Material Design principles, making it easier to maintain a similar look and feel across the application. The customization options available in MUI also allow us to fine-tune components to fit specific needs, enhancing the user experience.

- **TypeScript**: We chose to use TypeScript because of its static type checking and intellisense features that speed up development time, and improve code quality and maintainability. TypeScript helps us catch errors early in development, provides better code documentation through type definitions, and it was one of the tools that our partner Realtime wanted us to use.

- **Frontend Design**: The frontend interface, as shown in the attached screenshot (Frontend.png), incorporates a simple and user-friendly layout. The chat box is positioned to the left, and a map placeholder with filter options is situated on the right. This design allows users to interact with the chat while simultaneously viewing and filtering map results. The chat bubbles start from the top to enhance readability, and padding has been added to maintain a clean separation between elements. The overall design ensures responsiveness across various devices, providing a good user experience.

## Individual Contributions

- **[Kowshik]**: Coded the initial layout of the frontend. Developed the chat, filter, and map sections, applying custom CSS for consistency and implementing some interactive elements to showcase what the user experience would look like. Added MUI components like grid which helps create a responsive layout.
- **[Nicholas]**: Initial setup of the project, and development environment. Refactored many JavaScript files into TypeScript, and upgraded/replace a lot of outdated or vulnerable npm packages. Set up each service used by the project into individual Docker containers and deployed on AWS.

## Verification Details

- The software functionalities match our documentation, and a production build deployed to AWS can be veiwed [here](http://3.142.242.46/) (http only).
- All features are live and operational, with the latest version deployed and reflected in our repository.

## Application: Details Regarding Deployment and Further Application

A video on how to set up the project is avalable [here](https://youtu.be/pwUQ6KuoRxk).

### Build manually:

To deploy this from your terminal, you would first need to install npm from [Node.js](https://nodejs.org/en) (npm (Node Package Manager) is included with Node.js). Then, follow these steps:

1. Clone this directory and navigate into the `frontend` folder:

```bash
git clone git@github.com:csc301-2024-f/project-5-startup.git
cd project-5-startup/app/frontend
```

2. Install dependencies (this may take a while)

```bash
npm install --legacy-peer-deps 
```

3. Preview

   a. To run in development mode:

   ```bash
   npm run dev
   ```

   b. To build and preview a production version:

   ```bash
   npm run build
   npm run preview
   ```

### Build with Docker:

1. Clone the repository and open it:

```bash
git clone git@github.com:csc301-2024-f/project-5-startup.git
cd project-5-startup.
```
2. Run Docker compose

```bash
docker compose up
```

(This starts an nginx server listening to port 80, alternatively you can listen on a different port by changing the first `80` after `ports:` in the yml file)

Alternatively, you can just click [here](http://3.142.242.46/).
