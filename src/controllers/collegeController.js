const collegeModel = require("../models/collegeModel");

const createCollege = async function (req, res) {
  try {
  let data = req.body;

  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Data is required to add the college details" });
  }
  if (!data.name) {
    return res.send({ status: false, msg: "name is requreid" });
  }
  if (!data.fullName) {
    return res.send({ status: false, msg: "fullname is requreid" });
  }
  if (!data.logoLink) {
    return res.send({ status: false, msg: "logoLink is requreid" });
  }
let validString1 =/^[A-Za-z]{1,}$/
if (!validString1.test(data.name)) {
  return res.status(400).send({ status: false, msg: "Enter a valid Name" });
}
let validString =/^[A-Za-z ,]{1,}$/ 
if (!validString.test(data.fullName)) {
 return res.status(400).send({ status: false, msg: "Enter a valid  fullName" });
}
let checkName = await collegeModel.findOne({name:data.name})
 if(checkName){
   if(checkName.name === data.name){
         return res.status(403).send({status:false,msg:"This collage Name already used"})
   }
 }


let college = await collegeModel.create(data);
 return res.status(201).send({ status: true, data: college });

} catch(err) {
  return res.status(500).send({ status: false, msg: err.message });
}
}






module.exports.createCollege = createCollege