import { Router } from "express";
import testRoute from "./test.route.js";

const router = Router();

const defaultRoutes = [
   {
      path: "/test",
      route: testRoute
   }
];

defaultRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
