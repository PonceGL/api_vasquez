const { Router } = require("express");
const router = Router();
// const config = require("../../config.producction");
const config = require("../../config");
const articulos = require("../../database/articulos.json");
// const imagenes = require("../../database/imagenes.json");

const rest = new (require("rest-mssql-nodejs"))({
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  server: config.DB_HOST,
  database: config.DB_DATABASE,
});

router.get("/", function (req, res) {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  res
    .status(200)
    .json({ message: "API VASQUEZ, CORS-enabled for all origins!" });
});

// Todos los productos

router.get("/api/articulos", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  res.status(200).json({
    name: "Todos los articulos",
    method: req.method,
    total: articulos.length,
    data: articulos,
  });
});

// Todos los productos por categoria

router.get("/api/articulos/categoria/:id", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const id = req.params.id.replace(/-/g, " ");

  const result = articulos.filter((item) => item.category === id);

  result &&
    res.status(200).json({
      name: `Todos los articulos de la categoria ${id}`,
      method: req.method,
      total: result.length,
      data: result,
    });
});

// Todos los productos por sub categoria

router.get("/api/articulos/subcategoria/:id", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const id = req.params.id.replace(/-/g, " ");

  const result = articulos.filter((item) => item.main_category === id);

  result &&
    res.status(200).json({
      name: `Todos los articulos de la subcategoria ${id}`,
      method: req.method,
      total: result.length,
      data: result,
    });
});

// Todos los productos por sub marca

router.get("/api/articulos/marca/:id", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const id = req.params.id.replace(/-/g, " ");

  const result = articulos.filter((item) => item.brand === id);

  result &&
    res.status(200).json({
      name: `Todos los articulos de la marca ${id}`,
      method: req.method,
      total: result.length,
      data: result,
    });
});

// Todos los productos por sub nombre

router.get("/api/articulos/nombre/:id", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const id = req.params.id.replace(/-/g, " ");

  const result = articulos
    .filter((item) => item.description.includes(id))
    .slice(0, 6);

  result &&
    res.status(200).json({
      name: `Todos los articulos con el nobre ${id}`,
      method: req.method,
      total: result.length,
      data: result,
    });
});

// Imagen por producto

// router.get("/api/imagenes/:id", async (req, res) => {
//   if (req.method !== "GET") {
//     res
//       .status(500)
//       .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
//   }

//   const id = req.params.id;

//   const result = imagenes.filter((item) => item.id === id);

//   result &&
//     res.status(200).json({
//       name: `Imagen del articulo con la clave ${id}`,
//       method: req.method,
//       total: result.length,
//       data: result,
//     });
// });

module.exports = router;
