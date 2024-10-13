const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
    .connect(
      "mongodb+srv://mohdmusharraf0607:UNDERtaker1995@cluster0.4sbio.mongodb.net/"
    )
    .then(() => {
      console.log("connected..");
    });
  } catch (error) {
    res.status(400).json({
        message: "Not Connected"
    })
  }
};
conn();