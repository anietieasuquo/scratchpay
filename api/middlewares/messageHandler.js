import express from "express";

const app = express();

app.use((req, res, next) => {
  req.context = {
      createResponse: (response) => ({...response}),
      createError: (error) => ({
          message: error,
          timestamp: new Date().toUTCString(),
          url: `${req.baseUrl}${req.url}`
      })
  };

  next();
});

export default app;
