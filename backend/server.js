const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary").v2;

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception.");
  server.close(() => {
    process.exit(1);
  });
});

// Dotenv loads environment variables from a .env file into process.env
dotenv.config({ path: "backend/config/config.env" });

//connecting to db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,

});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

// handle unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  server.close(() => {
    process.exit(1);
  });
});
