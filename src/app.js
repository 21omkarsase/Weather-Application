const path = require("path"); //core module are witten above the npm module
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;
// console.log(__dirname, "\n", __filename);

//setup static directory to server
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Omkar Sase",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Omkar Sase",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Omkar Sase",
  });
});

app.get("/weather", (req, res) => {
  //   res.send("Weather page");
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(
    location,
    (err, { latitude, longitude, name: location, region, country } = {}) => {
      if (err) {
        res.send({ err });
      } else {
        showForecast(latitude, longitude, location, region, country);
      }
    }
  );
  const showForecast = (latitude, longitude, location, region, country) => {
    forecast(longitude, latitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      if (data.body.current) {
        updatedData = data.body.current;
      } else {
        updatedData = data;
      }
      res.send({
        address: `${location}, ${region}, ${country}`,
        weather: updatedData,
      });
    });
  };
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [{}],
  });
});

app.get("/help/*", (req, res) => {
  //   res.send("<h1>Help article not found</h1>");
  res.render("404error", {
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  //   res.send("<h3>404 Page not found</h3>");
  res.render("404error", {
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port 30000");
});
