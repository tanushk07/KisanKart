const products = require("../models/products");

const { sortCategory } = require("../utils/sortCategory");

module.exports.getHome = async (req, res, next) => {
  try {
    let product = await products.find({});
    let sortedProducts = sortCategory(product);

    // if (req.user._id) {
    //   res.render('index', {
    //     products: sortedProducts,
    //     user: req.user._id
    //   })
    // }
    // else {
    //   res.render('index', {
    //     products: sortedProducts,
    //   })
    // }
    res.render("index", {
      products: sortedProducts,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getLogin = async (req, res, next) => {
  res.render("login");
};

module.exports.getSignup = async (req, res, next) => {
  res.render("signup");
};
