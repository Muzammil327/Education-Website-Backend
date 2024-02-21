import express from "express";

import {
  GetController,
  GetOneController,
  GetBookController,
  GetHeading1Controller,
  GetHeading2Controller,
  GetTagController
} from "./controller.js";

const router = express.Router();

router.get("/get/pakstudy", GetController);
router.get("/get/pakstudy/:question", GetOneController);
router.get("/get/book/:book", GetBookController);
router.get("/get/heading-1/:heading1", GetHeading1Controller);
router.get("/get/heading-2/:heading2", GetHeading2Controller);
router.get("/get/tags", GetTagController);

export default router;