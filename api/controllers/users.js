import { Router } from "express";
import userService from "../services/userService";
import * as util from "../../src/util/commons";

const router = Router();

router.get("/", (req, res) => {
  userService
    .getAllUsers()
    .then(users => {
      res.status(200);
      return res.send(users);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.get("/:userId", (req, res) => {
  userService
    .getUserByID(req.params.userId)
    .then(user => {
      if (!util.isEmpty(user)) {
        res.status(200);
        return res.send(user);
      }

      res.status(404);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.post("/", (req, res) => {
  userService
    .createUser(req.body)
    .then(user => {
      res.status(201);
      res.setHeader("Resource", `${req.baseUrl}${req.url}${user.id}`);
      return res.send(user);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.put("/:userId", (req, res) => {
  userService
    .updateUser(req.params.userId, req.body)
    .then(user => {
      if (!util.isEmpty(user)) {
        res.status(202);
        return res.send(user);
      }

      res.status(404);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.delete("/:userId", (req, res) => {
  userService
    .deleteUser(req.params.userId)
    .then(response => {
      if (response) {
        res.status(202);
        return res.send(response);
      }

      res.status(404);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

export default router;
