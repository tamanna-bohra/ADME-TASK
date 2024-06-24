Bank Branches Application
Description
-   This application provides a simple interface to view a list of banks and their branches. It includes a REST API to fetch bank and branch data from a CSV file.

Features
-   View all banks
-   Search for branches   by bank ID
-   Fetch and display branch details for a selected bank

Technologies Used

-   Frontend: React, Axios
-   Backend: Node.js, Express, CSV Parser
-   Database: CSV file

Prerequisites
-   Node.js
-   npm (Node Package Manager)
-   React

SETUP

1.  Clone the repository
    -   git clone https://github.com/yourusername/bank-branches-app.git
    -   cd bank-branches-app

2.  Install the dependencies
3.  Start the backend server
    -   cd server
    -   node server.js
4.  Start the frontend
    -   cd client
    - npm start

API Endpoints

1.  Get All Banks
-   URL: /api/banks
-   Method: GET
-   Description: Retrieves a list of all banks with their branches.

2.  Get Branches by Bank ID
-   URL: /api/branches/:bankId
-   Method: GET
-   Description: Retrieves the branches for a specific bank by its ID.

-   Parameters:

    bankId (string): The ID of the bank.
