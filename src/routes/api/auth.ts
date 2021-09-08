import { body, validationResult } from "express-validator";
const pool = require("../../db");

const express = require("express");
const router = express.Router();

//SIGN IN
router.post(
  "/auth/sign-up",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("firstName").isString(),
  body("lastName").isString(),
  body("country").isString(),
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

      const {
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        gender,
        country,
      } = req.body;

      const data = await pool.query(
        "INSERT INTO public.admins (FIRST_NAME, LAST_NAME, USERNAME, EMAIL, PASSWORD, PHONE_NUMBER, GENDER, COUNTRY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          firstName,
          lastName,
          username,
          email,
          password,
          phoneNumber,
          gender,
          country,
        ]
      );
      res.status(200).json(data.rows[0]);
    } catch (error) {
      if (error.constraint === "admins_username_key") {
        res.status(409).send({ error: "Username already exists" });
      } else if (error.constraint === "admins_email_key") {
        res.status(409).send({ error: "Email already exists" });
      } else if (error.constraint === "admins_phone_number_key") {
        res.status(409).send({ error: "Phone number already exists" });
      } else res.status(500).send(error);
    }
  }
);

//SIGN UP
router.post(
  "/auth/sign-in",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const data = await pool.query(
        "SELECT * FROM public.admins WHERE EMAIL = $1",
        [email]
      );

      if (!data.rows[0]) {
        res.status(401).send({ error: "Wrong credentials" });
      } else if (password === data.rows[0].password) {
        res.status(200).json(data.rows[0]);
      } else res.status(401).send({ error: "Wrong credentials" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
