import { Router } from "express";
import authenticationService from "../services/authenticationService";

const router = Router();

router.post("/", (req, res) => {
  authenticationService
    .authenticate(req.body)
    .then(user => {
      res.status(200);
      return res.send(user);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

export default router;
