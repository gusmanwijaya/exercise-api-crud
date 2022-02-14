const { Image } = require("../models");
const path = require("path");
const fs = require("fs");
const rootPath = path.resolve(__dirname, "..");

module.exports = {
  postImage: async (req, res) => {
    try {
      if (req.file) {
        const tmp_path = req.file.path;
        const originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        const filename = req.file.filename + "." + originaExt;
        const target_path = path.resolve(rootPath, `public/images/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const media = await Image.create({
              image: filename,
            });
            res.status(200).json({
              status: "success",
              data: {
                id: media.id,
                image: `http://${req.get("host")}/images/${filename}`,
              },
            });
          } catch (error) {
            res.status(400).json({
              status: "error",
              message: error.message,
            });
          }
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Please input image!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getAllImage: async (req, res) => {
    try {
      const data = await Image.findAll({
        attributes: ["id", "image"],
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getImageById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Image.findAll({
        where: {
          id,
        },
        attributes: ["id", "image"],
      });
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.params;
      const imageById = await Image.findAll({
        where: {
          id,
        },
        attributes: ["id", "image"],
      });

      if (imageById.length <= 0) {
        res.status(404).json({
          status: "error",
          message: "Image not found!",
        });
      } else {
        if (req.file) {
          const currentImage = `${rootPath}/public/images/${imageById[0].dataValues.image}`;
          if (fs.existsSync(currentImage)) fs.unlinkSync(currentImage);

          const tmp_path = req.file.path;
          const originaExt =
            req.file.originalname.split(".")[
              req.file.originalname.split(".").length - 1
            ];
          const filename = req.file.filename + "." + originaExt;
          const target_path = path.resolve(
            rootPath,
            `public/images/${filename}`
          );

          const src = fs.createReadStream(tmp_path);
          const dest = fs.createWriteStream(target_path);

          src.pipe(dest);
          src.on("end", async () => {
            await Image.update(
              {
                image: filename,
              },
              {
                where: {
                  id: imageById[0].dataValues.id,
                },
              }
            );
            res.status(200).json({
              status: "success",
              data: {
                id: imageById[0].dataValues.id,
                image: `http://${req.get("host")}/images/${filename}`,
              },
            });
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Please input image!",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  destroyImage: async (req, res) => {
    try {
      const { id } = req.params;
      const imageById = await Image.findAll({
        where: {
          id,
        },
        attributes: ["id", "image"],
      });

      if (imageById.length <= 0) {
        res.status(404).json({
          status: "error",
          message: "Image not found!",
        });
      } else {
        const currentImage = `${rootPath}/public/images/${imageById[0].dataValues.image}`;
        if (fs.existsSync(currentImage)) fs.unlinkSync(currentImage);
        await Image.destroy({
          where: {
            id: imageById[0].dataValues.id,
          },
        });
        res.status(200).json({
          status: "success",
          message: "Image successfully deleted!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  truncateImage: async (req, res) => {
    try {
      const fileImageDir = fs.readdirSync(`${rootPath}/public/images/`);
      if (fileImageDir.length > 0) {
        fileImageDir.forEach((element) => {
          fs.unlinkSync(`${rootPath}/public/images/${element}`);
        });
      }
      await Image.destroy({
        truncate: true,
      });
      res.status(200).json({
        status: "success",
        message: "Table image successfully truncated!",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
