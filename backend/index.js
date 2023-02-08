const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Router } = require("express");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================= Connectivity ========
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/players");

const cricketerSchema = mongoose.Schema({
  rank: Number,
  name: String,
  country: String,
  dob: String,
  totalRun: Number,
});

const Cricketer = mongoose.model("cricketers", cricketerSchema);

// === GET ,POST, DELETE ========
app
  .route("/cricketers")
  .get(function (request, response) {
    Cricketer.find(function (error, foundCricketers) {
      if (!error) {
        response.send(foundCricketers);
      } else {
        response.send(error);
      }
    });
  })
  .post(function (request, response) {
    console.log(
      "------------------------------New Request generated-------------------------------------------------"
    );
    console.log(request);
    const c1 = new Cricketer({
      // ==== here Rank is the name of the attribute of form field
      rank: request.body.Rank,
      // ==== here Nank is the name of the attribute of form field
      name: request.body.Name,
      country: request.body.Country,
      dob: request.body.DOB,
      totalRun: request.body.TotalRun,
    });
    c1.save(function (error) {
      if (!error) {
        response.send("Data added successfully...");
      } else {
        response.send(error);
      }
    });
  })
  .delete(function (request, response) {
    Cricketer.deleteMany(function (error) {
      if (!error) {
        response.send("All Data Deleted");
      } else {
        response.send(error);
      }
    });
  });

app.listen(3010, function () {
  console.log("Server is running at http://localhost:3010");
});
