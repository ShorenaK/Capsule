import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
import { createCapsule, findCapsules } from "../models/Capsule.js";

const router = express.Router();

router.get("/capsules", isAuthenticated, async (req, res, next) => {
  console.log("GET /api/capsules called");
  try {
    const capsules = await findCapsules(req.user.id, req.query.q);
    res.json(capsules);
  } catch (error) {
    next(error);
  }
});

router.post("/capsules", isAuthenticated, async (req, res, next) => {
  console.log("POST /api/capsules called");
  const { name, description, openDate } = req.body;

  if (!name || !description || !openDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newCapsule = await createCapsule(
      { name, description, openDate },
      req.user.id
    );
    res.status(201).json(newCapsule);
  } catch (error) {
    next(error);
  }
});

export default router;
