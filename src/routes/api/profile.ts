import { body, validationResult } from "express-validator";
const pool = require("../../db");
const updateAdminByID = require("../../helpers/update-admin.helper");

const express = require("express");
const router = express.Router();

//EDIT PROFILE
router.put(
  "/profile/edit/:id",
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .optional(),
  body("firstName").isString().optional(),
  body("lastName").isString().optional(),
  body("country").isString().optional(),
  body("phoneNumber").isString().withMessage("Invalid phone number"),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      const query = updateAdminByID(req.params.id, req.body);
      const columnValues = Object.keys(req.body).map(function (key) {
        return req.body[key];
      });

      const data = await pool.query(query, columnValues);
      res.status(200).json(data.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
