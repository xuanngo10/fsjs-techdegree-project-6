// Import express and set up app
const express = require("express");
const path = require("path");

// Init app
const app = express();

// require the data file
const { projects } = require("./data/data.json");

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Add static middleware
app.use("/static", express.static("public"));

// Import Routes
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  res.render("project", {
    projectId: projects[req.params.id].id,
    projectName: projects[req.params.id].project_name
  });
});

// Error handles
app.use((req, res, next) => {
  const err = new Error("oh no!");
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {
  // Log statement to indicate that this function is running
  console.log("Handling 404 error");

  const err = new Error(
    "Oops, page not found. Looks like that route does not exist."
  );
  err.status = 404;
  next(err);
});

// Turn on Express server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
