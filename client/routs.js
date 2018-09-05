'use strict'

var express = require('express')
var campaignsService = require('../server/campaignsService')
var routs = express.Router()

routs.route('/all').get(function (req, res, next) {
 let id = req.query.id;
 if(id){
     campaignsService.getCampaignsService(id,function(campaigns){
 res.json(campaigns) 
  })

 }else{
   res.json('Must send user id')
 }

   
 
})


module.exports = routs