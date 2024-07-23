# Phonebook

## Overview
This is a web-based phonebook application that allows users to manage their contacts. Users can add, view, edit, and delete contacts. The application also includes features such as contact search, sorting, favoriting, and persistent data storage.

## Features
- **Contact Fields**:
  - First Name (required)
  - Last Name (required)
  - Phone Number (required)
  - Email (optional, must follow email format)
  - Age (optional, must be a number between 1 and 100)
  - Gender
  - Address (optional)

- **Contact Management**:
  - After adding a contact, the user is redirected to the contact's details page.
  - The contact's details page allows users to view, edit, and delete the contact information.

- **Interactive Links**:
  - Clicking on the email will open the default email application with the email pre-filled.
  - Clicking on the phone number will open the phone dialer with the number pre-filled

- **Main Page**:
  - Displays a list of all contacts.
  - Provides a search functionality to find contacts by phone number, first name, last name, or email.
  - Allows users to favorite contacts, which will appear at the top of the list.
  - Supports sorting contacts alphabetically (A-Z and Z-A).

- **Data Persistence**:
  - All contact data is saved and persists across page refreshes and browser restarts.

- **User Authentication**:
    - you can use the following information for the first login also you can see this inforamtion in login file  
    \
    username : eve.holt@reqres.in \
    password : cityslicka

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/MohammadMahdiDerakhshandeh/phonebook.git
    ```
2. Navigate to the project directory:
    ```sh
    cd phonebook
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.

## Built With
- React
- antd (for styling)
- Local Storage (for data persistence)
- react-router-dom (for routing)