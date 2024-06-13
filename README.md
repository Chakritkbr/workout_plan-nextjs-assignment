# Workout Plan (Next.js)
This is an assignment 
Welcome to Workout Plan! This project utilizes Next.js for server-side rendering and React for front-end development. It includes backend functionalities using MongoDB with Mongoose for data modeling.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (v14 or higher)
- npm (v7 or higher) or yarn (v1.22 or higher)
- MongoDB (make sure it's running locally or accessible)

### Installation

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd workout_plan-nextjs
   ```

2. **Install dependencies:**

   If you're using npm:

   ```
   npm install
   ```

   If you're using yarn:

   ```
   yarn install
   ```

### Configuration

1. **Environment Variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```plaintext
   MONGO_URI=mongodb://localhost:27018/Workout-plan
   JWT_SECRET=
   ```

   Replace `mongodb://localhost:27018/Workout-plan` with your MongoDB connection URI. Ensure MongoDB is running on `localhost` and listening on port `27018`.

   The `JWT_SECRET` should be a strong secret key used for JWT token encryption. For development purposes, it can be a simple string like `friday`, but for production, use a more secure and complex secret.

### Development

To run the project in development mode, use the following command:

   ```
   npm run dev
   # or
   yarn dev
   ```

   This will start the Next.js development server.

### Building for Production

To build the project for production deployment, run:

   ```
   npm run build
   # or
   yarn build
   ```

### Starting the Production Server

After building, you can start the production server with:

   ```
   npm start
   # or
   yarn start
   ```

### Linting

Linting is set up with ESLint to maintain code quality. Run the following command to lint your code:

   ```
   npm run lint
   # or
   yarn lint
   ```

### Additional Notes

- **Tailwind CSS:** This project uses Tailwind CSS for styling. You can customize styles in `styles/globals.css`.
- **TypeScript:** TypeScript is set up as a dev dependency. Ensure your code follows TypeScript conventions.

## Contributing

Thank you for considering contributing to Workout Plan! Please follow GitHub Flow when contributing. Create a pull request for your contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
