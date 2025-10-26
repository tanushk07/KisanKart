const mongoose = require('mongoose')
const products = require('../models/products')
const bodyParser = require('body-parser')
const cart = require('../models/cart')

module.exports.postAddProduct = async (req, res, next) => {
  const { name, price, seller, imageUrl, description, category } = req.body
  try {
    await products.create({
      name,
      price,
      seller,
      imageUrl,
      description,
      category,
    })
    res.redirect('/admin/products/all')
  } catch (err) {
    next(err)
  }
}

module.exports.getProductsAll = async (req, res, next) => {
  try {
    let allProducts = await products.find()
    res.render('admin/products-list', { products: allProducts })
    console.log('Products fetched and sent in response')
  } catch (err) {
    next(err)
  }
}

module.exports.getAddProduct = async (req, res, next) => {
  res.render('admin/form')
}

module.exports.getIndex = (req, res, next) => {
  res.render('admin/home')
}

module.exports.getProductId = async (req, res, next) => {
  let id = req.params.id
  try {
    let p = await products.findOne({ _id: new mongoose.Types.ObjectId(id) })
    res.render('admin/product-detail', {
      product: p,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getUpdateProduct = async (req, res, next) => {
  let id = req.params.id
  try {
    let p = await products.findOne({ _id: new mongoose.Types.ObjectId(id) })
    res.render('admin/update-product', {
      product: p,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.postUpdateProduct = async (req, res, next) => {
  try {
    const { name, price, seller, imageUrl, description, id, category } = req.body
    const product = await products.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    product.name = name
    product.price = price
    product.seller = seller
    product.imageUrl = imageUrl
    product.description = description
    await product.save()
    res.render('admin/product-detail', {
      product,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    await products.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    const cartobj = await cart.findOne({
      userid: req.user._id,
    })
    const cartobjitems = cartobj.cartitems.filter(item => item.prodid != id)
    cartobj.cartitems = cartobjitems
    await cartobj.save()
    res.redirect("/admin/products/all");
  } catch (err) {
    next(err)
  }
}
