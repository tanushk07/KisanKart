const path = require("path");
const express = require("express");
const router = express.Router();

const krishiController=require("../controllers/krishi")

router.get('/crop',krishiController.getForm)
router.post("/crop",krishiController.getAssessment)
module.exports=router