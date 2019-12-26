import { Router } from "express";
import roleService from "../services/roleService";
import * as util from "../../src/util/commons";

const router = Router();

router.get("/", (req, res) => {
  roleService
    .getAllRoles()
    .then(roles => {
      res.status(200);
      return res.send(roles);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.get("/:roleId", (req, res) => {
  roleService
    .getRoleByID(req.params.roleId)
    .then(role => {
      if (!util.isEmpty(role)) {
        res.status(200);
        return res.send(role);
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
  roleService
    .createRole(req.body)
    .then(role => {
      res.status(201);
      res.setHeader("Resource", `${req.baseUrl}${req.url}${role.id}`);
      return res.send(role);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.put("/:roleId", (req, res) => {
  roleService
    .updateRole(req.params.roleId, req.body)
    .then(role => {
      if (!util.isEmpty(role)) {
        res.status(202);
        return res.send(role);
      }

      res.status(404);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.delete("/:roleId", (req, res) => {
  roleService
    .deleteRole(req.params.roleId)
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
