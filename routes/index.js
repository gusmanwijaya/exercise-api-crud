const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const {
  postImage,
  getAllImage,
  getImageById,
  updateImage,
  destroyImage,
  truncateImage,
} = require("../controller/apiController");

router.post(
  "/create",
  multer({
    dest: os.tmpdir(),
  }).single("image"),
  postImage
);
router.get("/images", getAllImage);
router.get("/images/:id", getImageById);
router.put(
  "/update/:id",
  multer({
    dest: os.tmpdir(),
  }).single("image"),
  updateImage
);
router.delete("/destroy/:id", destroyImage);
router.delete("/truncate", truncateImage);

module.exports = router;
