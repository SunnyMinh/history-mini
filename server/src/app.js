const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require("./routes/auth.routes");
const periodRoutes = require("./routes/period.routes");
const eventRoutes = require("./routes/event.routes");
const app = express();
const userRoutes = require("./routes/user.route");
const path = require("path");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "History Wiki API is running",
  });
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/periods",
  periodRoutes
);

app.use(
  "/api/events",
  eventRoutes
);

app.use(
  "/api/users",
  userRoutes
);


module.exports = app;