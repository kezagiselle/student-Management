import mongoose from 'mongoose';
const StudentSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true
    },
    email: {
        type:String,
        unique: true
    },
    phone: {
        type:String,
        required: true
    },
    nationalId: {
        type:String,
        unique: true,
        length: 16
    },
    gender: {
        type:String,
        required: true,
        enum:{
            values: ['Male','Female'],
            message: 'Gender myst be either Male or Female'
        }
    },
 },{timestamps:true});

 const StudentModel = mongoose.model('students',StudentSchema);
 export default StudentModel;