import dotenv from'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express'
import StudentModel from './modules/student.model.js';
const app = express();
const port = 3000;
const db_connection_string = process.env.MONGODB_URI;

app.use(express.json());

app.post('/students/add',async(req,res) => {
    try{
        const addedStudent = await StudentModel.create(req.body);
        res.status(200).json({
            message: "student added!",
            student: addedStudent
        })
    } catch(error){
        console.log(err.message);
        res.status(500).json({
            message: "Error adding student!"
    });
    }
});

// app.get("/students/list",async(req,res) => {
//     try{
//         const allStudents = await StudentModel.find();
//         res.status(200).json({
//             message: "Error retrieving students!",
//             student:allStudents
//         });
//     } catch (error){
//         console.log(err.message);
//         res.status(500).json({
//             message: "Error retrieving students!"
//         });
//     }
// })
//get by id
app.get("/students/list/:id",async(req,res) => {
    try{
        const allStudents = await StudentModel.findById(req.params.id);
        if(allStudents){
        res.status(200).json({
            message: "Error retrieving students!",
            student:allStudents
        })}
        else{
            res.status(500).json({message:"not found"})
        }
    } catch (error){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving students!"
        });
    }
})

//get by email
app.get("/students/email/:email",async(req,res) => {
    try{
        const StudentsByEmail = await StudentModel.findOne({email: req.params.email});
        res.status(200).json({
            message: "Error retrieving students by email!",
            student:StudentsByEmail
        })
    } catch (error){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving students!"
        })
    }
})

app.put("/students/update/:id",async(req,res) => {
    try{
        const update=req.body
        const allStudents = await StudentModel.findByIdAndUpdate({_id:req.params.id},
          {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            nationalId: req.body.nationalId,
            gender: req.body.gender

          },{new: true});
        res.status(200).json({
            message: "retrieving successful!",
            student:allStudents
        });
    } catch (error){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving students!"
        });
    }})
mongoose.connect(db_connection_string )
.then(() =>{
    console.log('connected to DB......');
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
})
.catch((error)=>{
    console.log("Error:",error)
})