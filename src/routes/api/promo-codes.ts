import { body, validationResult } from "express-validator";
const pool = require("../../db");
const express = require("express");
const router = express.Router();
const updatePromoCodeByID = require("../../helpers/update-promo-code.helper");

//ADD A PROMO CODE
router.post(
  "/promo-codes/add",
  body("productGroup").isString(),
  body("category").isString(),
  body("status").isString(),
  body("designer").isString(),
  body("promoStarts").isString(),
  body("promoEnds").isString(),
  body("code").isString(),
  body("percentage").isString(),
  body("emails").isString(),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const {
        productGroup,
        category,
        status,
        designer,
        promoStarts,
        promoEnds,
        code,
        percentage,
        emails,
      } = req.body;

      const data = await pool.query(
        "INSERT INTO public.promo_codes (PRODUCT_GROUP, CATEGORY, STATUS, DESIGNER, PROMO_STARTS, PROMO_ENDS, CODE, PERCENTAGE, EMAILS) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          productGroup,
          category,
          status,
          designer,
          promoStarts,
          promoEnds,
          code,
          percentage,
          emails,
        ]
      );
      res.status(200).json(data.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//EDIT PROMO CODE
router.put(
  "/promo-code/edit/:id",
  body("productGroup").isString().optional(),
  body("category").isString().optional(),
  body("status").isString().optional(),
  body("designer").isString().optional(),
  body("promoStarts").isString().optional(),
  body("promoEnds").isString().optional(),
  body("code").isString().optional(),
  body("percentage").isString().optional(),
  body("emails").isString().optional(),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      const query = updatePromoCodeByID(req.params.id, req.body);
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

//GET PROMO CODES
router.get("/promo-codes", async (req: any, res: any) => {
  try {
    const data = await pool.query("SELECT * from public.promo_codes");
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
