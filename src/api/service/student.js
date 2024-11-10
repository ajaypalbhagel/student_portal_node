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

 static async getStudentList(query = {}, projection = {},skip = 0, limit = 10){
    try{
        let response = await Student.find(query,projection).skip(skip).limit(limit)
        if(response){
            return response
        }
    }catch(err){
        throw new Error(err);
    }
 }

 static async getCount(query = {}){
    try{
        // let response = await Student.find({query}).countDocuments({"firstName":1},{});
        let response = await Student.countDocuments(query);
        // console.log(response)
        if(response){
            return response
        }
    }catch(err){
        throw new Error(err);
    }
 }



static async getStudentById(studentId){
    try{
        let response = await Student.findById(studentId)
        return response
    }catch(err){
        throw new Error (err);
    }
}

static async updateItems(query ,updateData){
    try{
        let response = await Student.updateMany(query,updateData)
        return response
    }catch(err){
        throw new Error (err);
    }
}

}

module.exports = StudentService;
