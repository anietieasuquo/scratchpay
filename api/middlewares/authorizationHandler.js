import express from "express";
import authenticationService from "../services/authenticationService";
import { isValid } from "../../src/util/commons";

const app = express();

const publicPaths = ["/", "/auth"];

const isPublicUrl = url => {
  for (let index = 0; index < publicPaths.length; index++) {
    const publicUrl = publicPaths[index];
    const parts = publicUrl.split("/");
    if (parts.length === 0 || url.endsWith(publicUrl)) {
      return true;
    }
  }
  return false;
};

app.use((req, res, next) => {
  if (!isPublicUrl(req.url)) {
    const authHeader = req.header("Authorization");
    if (!isValid(authHeader)) {
      res.status(401);
      return res.send(req.context.createError("Unauthorized"));
    }

    let token = authHeader.split(" ");

    if (token.length !== 2 || !isValid(token[1].trim())) {
      res.status(401);
      return res.send(req.context.createError("Unauthorized"));
    }

    token = token[1];

    authenticationService
      .isAuthorized(token)
      .then(auth => {
        if (auth.auth) {
          next();
        } else {
          res.status(403);
          return res.send(req.context.createError("Forbidden"));
        }
      })
      .catch(error => {
        res.status(401);
        return res.send(req.context.createError(error));
      });
  } else {
    next();
  }
});

export default app;
