import { Router } from "express";
import { PermissionController } from "./controllers/PermissionController";
import { ProductController } from "./controllers/ProductController";
import { RoleController } from "./controllers/RoleController";
import { RolePermissionController } from "./controllers/RolePermissionController";
import { UserAccessControlListController } from "./controllers/UserAccessControlListController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can, is } from "./middleware/ensuredPermissions";

const routes = Router();

routes.post("/users", new UserController().create);

routes.post("/login", new LoginController().login);

routes.get("/products", 
ensuredAuthenticated(),
is(["administrator"]),
can(["list-product"]),
new ProductController().getAll
);

routes.post(
  "/products",
  ensuredAuthenticated(),
  is(["administrator"]),
  new ProductController().create
);

routes.post(
  "/roles",
  ensuredAuthenticated(),
  is(["administrator"]),
  new RoleController().create
);

routes.post("/roles/:roleId",
ensuredAuthenticated(),
is(["administrator"]),
new RolePermissionController().create);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  is(["administrator"]),
  new PermissionController().create
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  is(["administrator"]),
  new UserAccessControlListController().create
);

export { routes };
