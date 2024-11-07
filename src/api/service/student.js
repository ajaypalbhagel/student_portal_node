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

 static async getStudentList(query = {}, projection = {}){
    try{
        let response = await Student.find(query,projection);
        console.log(response)
        if(response){
            return response
        }
    }catch(err){
        throw new Error(err);
    }
 }

static async getStudentById(studentId){
    try{
        let query = {_id:studentId}
        let response = await Student.findById(query)
        console.log(response)
        // if(response){
            return response
        // }
    }catch(err){
        throw new Error (err);
    }
}

}

module.exports = StudentService;
