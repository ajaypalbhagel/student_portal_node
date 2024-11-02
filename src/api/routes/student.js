// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const StudentService = require('../service/student')

// Create a new student
router.post('/', async (req, res) => {
  const response = await StudentService.addStudent(req.body);
  res.status(201).json({});
});

// Create a new student
router.get('/', async (req, res) => {
  const response = await StudentService.getStudentList(req.body);
  res.status(201).json(response);
});

module.exports = router;
