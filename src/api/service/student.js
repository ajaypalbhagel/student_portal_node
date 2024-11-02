const Student = require('../model/studentSchema');

class StudentService{

 static async addStudent(req){
    try{
        const newStudent = new Student(req); 
        let response = await newStudent.save();
        if(response){
            return response
        }
    }catch(err){
        throw new Error(err);
    }
 }

 static async getStudentList(req){
    try{
        let response = await Student.find();
        console.log(response)
        if(response){
            return response
        }
    }catch(err){
        throw new Error(err);
    }
 }

}

module.exports = StudentService;
