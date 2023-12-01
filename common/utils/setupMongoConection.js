const { default: mongoose } = require("mongoose");
const {
  DB_MONGO_USER,
  DB_MONGO_PASSWORD,
  DB_MONGO_HOST,
  DB_MONGO_DATABASE,
} = require("../constants/env");

const setupMongoConection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/${DB_MONGO_DATABASE}`
    );

    console.log("Database connection successful");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = setupMongoConection;
