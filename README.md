# Payment App

## Description
This project is a full-stack application for a payment gateway. It is built using Node.js for the backend and React with Tailwind for the frontend. The application supports various functionalities, including user authentication, payment processing, and a responsive user interface.

## Tech Stack
- **Frontend:** React (using Vite)
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Validation:** Zod

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

### Steps to create the `.env` file for backend:

1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Crate `.env` file
3. Open the `.env` file in a text editor and add the following content:

   ```plaintext
   MONGODB_URL="Your mongoDB URL"
   SECRET_KEY="Your secret key"
   PORT=3000

### Steps to create the `.env` file for frontend:
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend

2. Crate `.env` file
3. Open the `.env` file in a text editor and add the following content:

   ```plaintext
   VITE_API_URL=http://localhost:3000

## Run Project
Navigate back to the root directory and run the development server:
```bash
cd ..
npm install
npm run dev
```

## Run Using Docker

To run the application using Docker, make sure your environment variables are set in the `docker-compose.yml`, and run the following command from the root directory:

```bash
docker-compose up
```

## Usage
- Access the frontend at `http://localhost:5173/`
- Access the backend at `http://localhost:3000/`
