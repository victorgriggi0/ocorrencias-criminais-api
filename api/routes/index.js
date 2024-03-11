const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const auth = require("./authRoute");
const department = require("./departmentRoute");
const user = require("./userRoute");
const role = require("./roleRoute");
const permission = require("./permissionRoute");
const team = require("./teamRoute");
const occurrenceType = require("./occurrenceTypeRoute");
const localType = require("./localTypeRoute");
const condition = require("./conditionRoute");
const occurrence = require("./occurrenceRoute");
const security = require("./securityRoute");
const association = require("./associationRoute");

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(auth);
  app.use(department);
  app.use(user);
  app.use(role);
  app.use(permission);
  app.use(team);
  app.use(occurrenceType);
  app.use(localType);
  app.use(condition);
  app.use(occurrence);
  app.use(security);
  app.use(association);
};
