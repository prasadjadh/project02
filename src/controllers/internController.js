const mongoose = require('mongoose')
const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")




const createIntern = async function(req,res){
    try{
 let data = req.body

 if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg:"Data is required to add the interns details" });
  }
 if (!data.name) {
    res.send({ status: false, msg: "name is requreid" });
  }
  if (!data.email) {
    res.send({ status: false, msg: "email is requreid" });
  }
  if (!data.mobile) {
    res.send({ status: false, msg: "mobile number is requreid" });
  }
  if (!data.collegeId) {
    res.send({ status: false, msg: "collegeId is requreid" });
  }
  let validname =/^[A-Za-z ]{2,100}$/
  if (!validname.test(data.name)) {
    return res.status(400).send({ status: false, msg: "Enter a valid Name" });
  }
  let validMobile =/^[6-9]{1}[0-9]{9}$/
  if (!validMobile.test(data.mobile)) {
    return res.status(400).send({ status: false, msg: "Please enter the Valid mobile Number" });
  }
  let validEmail = /^[a-z0-9]{1,}@[a-z]{1,}[.]{1}[a-z]{1,4}$/
  if (!validEmail.test(data.email)) {
    return res.status(400).send({ status: false, msg: "Please enter the Valid Email Id" });
  }
  let checkName = await internModel.findOne({mobile:data.mobile})
  if(checkName){
    if(checkName.mobile === data.mobile){
          res.status(403).send({status:false,msg:"This mobile Number already used"})
    }
  }
  let checkemail = await internModel.findOne({email:data.email})
      if(checkemail.email === data.email){
          res.status(403).send({status:false,msg:"This Email Id already used"})
    
  }
 
 
  let intern = await internModel.create(data)
  res.status(201).send({Status:true,Data:intern})
} catch(err) {
    res.status(500).send({ status: false, msg: err.message });
  }
  }


  const internGet = async function(req,res){
    try{
      let query = req.query
      
      if(Object.keys(query).length===0){
          return res.status(404).send({status:false, msg:"Please provide the data in query"})
      }

      let findCollege = await collegeModel.findOne({name:query.name})
     

      if(!findCollege){
        return res.status(404).send({status:false,msg:"This college name is not exist"})
      }
      let findIntern = await internModel.find({collegeId:findCollege._id}).select({_id:1,name:1,email:1,mobile:1})
      

     let result ={
       "name":findCollege.name,
       "fullName":findCollege.fullName,
       "logoLink":findCollege.logoLink,
       "interests":findIntern
     }
     res.status(200).send({Status:true,Data:result})

    }catch(err) {
      res.status(500).send({ status: false, msg: err.message });
    }
    }

      


  module.exports.createIntern=createIntern
  module.exports.internGet=internGet