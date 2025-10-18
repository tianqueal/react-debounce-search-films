# React Debounce: Optimising API Calls for Live Search

This project serves as a practical demonstration of how to efficiently manage frequent API calls in a React application. It implements a film search feature to illustrate a common use case: fetching data based on user input in real-time. The core of this solution is the implementation of a **debounce** mechanism to prevent excessive API requests, ensuring a smooth user experience and responsible API usage.

## Core Concept: The Debounce Solution

In applications with live search functionality, a naive approach would be to send an API request on every keystroke. This leads to a high volume of unnecessary requests, which can strain the server, quickly exhaust API rate limits, and create a sluggish user experience.

This repository provides a clean and effective solution by using a **debounce**. The debounce function delays the execution of the search query until the user has stopped typing for a specified period. This dramatically reduces the number of API calls, making the application more performant and scalable.

## Features

- **Efficient API Call Management**: Implements a debounce to minimise API requests, serving as the core feature of this application.
- **Live Film Search**: Find films by title from the OMDB database.
- **Sortable Results**: Easily sort the search results alphabetically by title.
- **Input Validation**: Provides real-time feedback to prevent empty or invalid searches.
- **Image Error Handling**: Displays a clean placeholder for posters that fail to load, maintaining the UI's integrity.
- **Modern Tooling**: Built with Vite for a fast development experience and includes ESLint for code quality.

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/tianqueal/react-debounce-search-films.git
    cd react-debounce-search-films
    ```

2.  Install the dependencies:

    ```sh
    npm install
    ```

3.  Set up your environment variables. You will need an API key from OMDB.
    - Create a file named `.env.local` in the root of the project.
    - Add your API key to this file:
      ```
      VITE_API_KEY=your_api_key_here
      ```

## Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the project files.
- `npm run preview`: Serves the production build locally.

## Licence

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.