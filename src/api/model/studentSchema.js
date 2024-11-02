const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        firstName   : { type: String, required: true, trim: true },
        lastName    : { type: String, required: true, trim: true },
        email       : { type: String, required: true, unique: true, trim: true, lowercase: true },
        rollNo      : {  type: String, required: true, unique: true, trim: true },
        class       : { type: String, required: true, trim: true },
        gender      : { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
        mobileNumber: { type: String, required: true, unique: true, trim: true },
        parentName  : { type: String, required: true, trim: true },
        parentMobileNo: { type: String, required: true, trim: true },
        dateOfBirth : { type: Date, required: true },
        bloodGroup  : { type: String, required: true, trim: true },
        address     : { type: String, required: true, trim: true },
        photo       : { type: String, trim: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('student', studentSchema);
