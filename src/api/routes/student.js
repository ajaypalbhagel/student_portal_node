// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const StudentService = require('../service/student')

// Create a new student
router.post('/', async (req, res) => {
  console.log("check post")
  const response = await StudentService.addStudent(req.body);
  res.status(200).json({});
});

// get student
router.get('/', async (req, res) => {
  console.log("check here")
  const response = await StudentService.getStudentList({_id:"672b9193630ac2eade567378"},{});
  res.status(200).json(response);
});

router.get('/:id',async(req, res) => {
  console.log("check id api")
  const studentId= req.params.id
  const response = await StudentService.getStudentById(studentId);
  res.status(200).json(response);
})

module.exports = router;
