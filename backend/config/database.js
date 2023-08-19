const mongoose = require("mongoose");

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

const connectDatabase = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/ecom", {}).then((data) => {
    console.log(`Monogodb connected with server ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
