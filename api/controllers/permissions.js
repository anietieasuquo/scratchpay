import { Router } from "express";
import permissionService from "../services/permissionService";
import * as util from "../../src/util/commons";

const router = Router();

router.get("/", (req, res) => {
  permissionService
    .getAllPermissions()
    .then(permissions => {
      res.status(200);
      return res.send(permissions);
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.get("/:permissionId", (req, res) => {
  permissionService
    .getPermissionByID(req.params.permissionId)
    .then(permission => {
      if (!util.isEmpty(permission)) {
        res.status(200);
        return res.send(permission);
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
  permissionService
    .createPermission(req.body)
    .then(permissionId => {
      res.status(201);
      res.setHeader("Resource", `${req.baseUrl}${req.url}${permissionId}`);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.put("/:permissionId", (req, res) => {
  permissionService
    .updatePermission(req.params.permissionId, req.body)
    .then(permission => {
      if (!util.isEmpty(permission)) {
        res.status(202);
        return res.send(permission);
      }

      res.status(404);
      return res.send();
    })
    .catch(error => {
      res.status(400);
      return res.send(req.context.createError(error));
    });
});

router.delete("/:permissionId", (req, res) => {
  permissionService
    .deletePermission(req.params.permissionId)
    .then(response => {
      if (response) {
        res.status(202);
        return res.send();
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
