// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const StudentService = require('../service/student');
const studentSchema = require('../model/studentSchema');

// Create a new student
router.post('/', async (req, res) => {
  console.log("check post")
  const response = await StudentService.addStudent(req.body);
  res.status(200).json({});
});

// get student and pagination
router.get('/', async (req, res) => {
  
  let page = req.query.page || 1;
  page = parseInt(page)
  let pageSize = req.query?.pageSize || 10;
  pageSize = parseInt(pageSize)
  const skip = (page - 1) * pageSize;
  const limit = pageSize;
  let query = {}
 const proj = {firstName:1,rollNo:1,class:1,gender:1,mobileNumber:1,parentName:1,email:1,lastName:1}

const { firstName, lastName, email, gender, rollNo, mobileNumber,parentName, search } = req.query
console.log("check the query  ", query )
if (search) {
  // If a search term is provided, create the $or query for multiple fields
  
  query = {
    
    $or: [
      { firstName: { $regex: search, $options: 'i' } },  
      { lastName: { $regex: search, $options: 'i' } },   
      { email: { $regex: search, $options: 'i' } },     
      { rollNumber: { $regex: search, $options: 'i' } },
      { class: { $regex: search, $options: 'i' } }       
    ]
  };
}
 if (firstName) {
  query.firstName = new RegExp(firstName,'i')
 }

  if (lastName) {
  query.lastName = lastName
  }

  if (email) {
  query.email = email
  }

  if (gender) {
  query.gender = gender 
  }

  if (rollNo) {
  query.rollNo = rollNo
  }

  if (mobileNumber) {
    query.mobileNumber = mobileNumber
    }

  if (parentName) {
    query.parentName = parentName
    }
  console.log(JSON.stringify(query),"check query here")
  const response = await StudentService.getStudentList(query,proj,skip,limit);

  const totalCounts = await StudentService.getCount(query)
  const totalPages = Math.ceil( totalCounts / pageSize);
  res.status(200).json({
    
    data: response,
    pagination: {
      totalCounts,
      totalPages,
      pageSize,
      currentPage: page,
    },
  });
});

router.put('/:id', async(req, resp) => {
  let studentId = req.params.id;   
   let data = req.body
   console.log("check the req body  ",req.body)
   let updateData = {}
  if (data.firstName) {
    updateData.firstName = data.firstName
  }

  if (data.lastName) {
    updateData.lastName = data.lastName;
  }

  // if (data.email) {
  //   updateData.email = data.email;
  // }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // console.log("check ", emailRegex.test)
  if (data.email) {
    // console.log("check ", emailRegex.test)
    // console.log("check if condition ", (!emailRegex.test(data.email)) )
    if (emailRegex.test(data.email)) {
      // console.log("check ",test)
      // console.log("checkkkkkkkkkkkkkkkkk", (!emailRegex.test(data.email)) )
      console.log("check data email ", data.email)
      updateData.email = data.email;   
      console.log ()
      
      // return resp.status(400).json({ message: 'Invalid email format' })
    }else {
 
        console.log("Email is missing from the data.");
        return resp.status(400).json({ message: 'Email is required' });
      }
    // updateData.email = data.email;
      // resp.status(400).json({ message: 'Invalid email format' })
  
  }else {
     
    console.log("Invalid email format:", data.email);
   
     resp.status(400).json({ message: 'Invalid email format' });
  }
//   }else {
 
//   console.log("Email is missing from the data.");
//   return resp.status(400).json({ message: 'Email is required' });
// }
  // const mobileNumberRegex = /^[6-9]\d{9}$/;
  // if (data.mobileNumber) {
  //   console.log()
  //   if (mobileNumberRegex.test(data.mobileNumber)) {
      
  //     updateData.mobileNumber = data.mobileNumber;

  //   }
  // }

  //  return resp.status(400).json({ message: 'Invalid email format' })
  
  // console.log(updateData)
    let result = await StudentService.updateItems( {_id: studentId}, {$set: updateData})
    // console.log("check the result",result)
    // resp.status(200).json({data:result,"message":"Student update successfully","statusCode":200});
})  

router.get('/:id',async(req, res) => {
  try{
    const studentId= req.params.id
    const response = await StudentService.getStudentById(studentId);
    res.status(200).json({data:response});
  }catch(err){
    res.status(500).json({statusCode:500,errorMessage:err.message || "Internal Server error"});
    console.log(err)
  }
  
})

module.exports = router;
