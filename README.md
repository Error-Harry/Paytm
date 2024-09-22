# Payment App

## Description
This project is a full-stack application for a payment gateway. It is built using Node.js for the backend and React with Tailwind for the frontend. The application supports various functionalities, including user authentication, payment processing, and a responsive user interface.

## Tech Stack
- **Frontend:** React (using Vite)
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Styling:** Tailwind CSS

## Features
- User authentication (Sign In, Sign Up)
- Payment processing functionality
- Responsive user interface
- User dashboard for managing payments

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Error-Harry/Paytm.git
   cd Paytm
   
2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   
3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install


## Environment Variables

To run the application, you will need to set up the following environment variables in a `.env` file in the `backend` directory:

### Steps to create the `.env` file:

1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Crate `.env` file
3. Open the `.env` file in a text editor and add the following content:

   ```plaintext
   MONGODB_URL="Your mongoDB URL"
   SECRET_KEY="Your secret key"
   PORT=3000
## Run Project
Navigate back to the root directory and run the development server::
   ```bash
   cd ..
   npm install
   npm run dev

## Usage
- Access the frontend at `http://localhost:5173/`
- `http://localhost:3000/`
