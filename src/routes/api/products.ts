import { body, validationResult } from "express-validator";
const pool = require("../../db");
const express = require("express");
const router = express.Router();
const updateProductByID = require("../../helpers/update-product.helper");
const filterProducts = require("../../helpers/filter-products.helper");

//ADD A PRODUCT
router.post(
  "/products/add",
  body("productGroup").isString(),
  body("ageGroup").isString(),
  body("gender").isString(),
  body("category").isString(),
  body("createdAt").isString(),
  body("onSale").isString(),
  body("designer").isString(),
  body("imageUrl").isString(),
  body("brand").isString(),
  body("description").isString(),
  body("saleStarts").isString(),
  body("saleEnds").isString(),
  body("salePercentage").isString(),
  body("partnerId").isInt(),
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
        productGroup,
        ageGroup,
        gender,
        category,
        createdAt,
        onSale,
        designer,
        imageUrl,
        brand,
        description,
        saleStarts,
        saleEnds,
        salePercentage,
        partnerId,
      } = req.body;

      const data = await pool.query(
        "INSERT INTO public.products (PRODUCT_GROUP, AGE_GROUP, GENDER, CATEGORY, CREATED_AT, ON_SALE, DESIGNER, IMAGE_URL, BRAND, DESCRIPTION, SALE_STARTS, SALE_ENDS, SALE_PERCENTAGE, PARTNER_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
        [
          productGroup,
          ageGroup,
          gender,
          category,
          createdAt,
          onSale,
          designer,
          imageUrl,
          brand,
          description,
          saleStarts,
          saleEnds,
          salePercentage,
          partnerId,
        ]
      );
      res.status(200).json(data.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//GET PRODUCTS BY PARTNER ID
router.get("/products/:id", async (req: any, res: any) => {
  try {
    const data = await pool.query(
      "SELECT * from public.products WHERE PARTNER_ID = $1",
      [req.params.id]
    );
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

//EDIT PRODUCT
router.put(
  "/products/edit",
  body("saleStarts").isString(),
  body("saleEnds").isString(),
  body("salePercentage").isString(),
  body("productsId").isArray(),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      req.body.productsId.forEach(async (productId: any) => {
        delete req.body.productsId;
        const query = updateProductByID(productId, req.body);
        const columnValues = Object.keys(req.body).map(function (key) {
          return req.body[key];
        });
        await pool.query(query, columnValues);
      });
      res.status(200).json();
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//FILTER PRODUCTS
router.post(
  "/products/filter",
  body("saleStarts").isString().optional(),
  body("saleEnds").isString().optional(),
  body("salePercentage").isString().optional(),
  body("onSale").isString().optional(),
  body("brand").isString().optional(),
  body("kidzieId").isString().optional(),
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      const query = filterProducts(req.body);
      const columnValues = Object.keys(req.body).map(function (key) {
        return req.body[key];
      });
      const data = await pool.query(query, columnValues);
      console.log(data.rows);
      res.status(200).json(data.rows);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
