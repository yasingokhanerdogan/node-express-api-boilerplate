import { Router } from "express";
import { TestController } from "../../controllers/index.js";

const router = Router();

router.get("/", TestController.Test);

export default router;
