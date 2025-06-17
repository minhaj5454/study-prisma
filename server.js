//Below require just requires the .env file into the file. 

//Database configuration for the successfully execution.

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs")

console.log(ejs)

const app = express();
const morgan = require('morgan');
//Router of the end user.
const userRoutes = require('./routes/user/user');
const adminRoutes = require('./routes/admin/superAdmin');
const postRoutes = require("./routes/post/post")
const commentRoutes = require("./routes/comment/comment")

//Following 3 modules are multilingual modules.
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')

//Below code is multilingual middleware setup.
i18next.use(Backend).use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

const cors = require("cors");

//Port is getting defined here.
const port = process.env.PORT || 4000;

//cors specification.
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

//below upload file is a base where we upload all our static images, files, and document.
//we can use 'public' instead of using 'uploads'.(Not necessary to use uploads or public just naming convention)
app.use('/uploads', express.static('uploads'));
//below middlewares are body parsers.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//below middleware is for the multilingual module.
app.use(middleware.handle(i18next));
app.use(morgan('dev'));

//Base routes for the end users.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
userRoutes(app);
adminRoutes(app);
postRoutes(app)
commentRoutes(app)

// Handle 404 (Not Found)
app.use((req, res) => {
  res.status(404).send({
    error: 'Page Not Found',
    message: 'The requested resource was not found 3'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send({
    error: err.name || 'Internal Server Error',
    message: "Something went wrong",
    details: err.message || "Undefined"
  });
});

async function startServer() {
  try {
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
//databaseFunction
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
