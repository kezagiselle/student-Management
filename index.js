import dotenv from'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express'
import StudentModel from './modules/student.model.js';
import FacilitatorModel from './modules/facilitator.modules.js';
import { get } from 'http';
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
        console.log(error.message);
        res.status(500).json({
            message: "Error adding student!"
    });
    }
});

app.get("/students/list",async(req,res) => {
    try{
        const allStudents = await StudentModel.find();
        res.status(200).json({
            message: "Error retrieving students!",
            student:allStudents
        });
    } catch (error){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving students!"
        });
    }
})
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

    app.delete("/students/:id",async(req,res) => {
        try{
            const StudentById = await StudentModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "successful deleting!",
                student: StudentById
            })
        } catch (err){
            console.log(err.message);
            res.status(500).json({
                message: "Error retrieving students!"
            })
        }
    })

mongoose.connect(db_connection_string)
.then(() =>{
    console.log('connected to DB......');
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
})
.catch((error)=>{
    console.log("Error:",error)
})

//facilitator DB
// mongoose.connect(db_connection_string1)
// .then(() =>{
//     console.log('connected to DB......');
// app.listen(port1, () =>{
//     console.log(`server is running on port ${port1}`);
// })
// })
// .catch((error)=>{
//     console.log("Error:",error)
// })

app.post('/facilitators/add',async(req,res) => {
    try{
        const addedFacilitator = await FacilitatorModel.create(req.body);
        res.status(200).json({
            message: "facilitators added!",
            facilitator: addedFacilitator
        })
    } catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error adding facilitator!"
    });
    }
});

app.get('/facilitators/list',async(req,res) => {
    try{
        const listFacilitators = await FacilitatorModel.find();
        res.status(200).json({
            message: "facilitators list!",
            facilitator: listFacilitators
        })
    } catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error displaying facilitator!"
    });
    }
});
app.get('/facilitators/list/:id',async(req,res) => {
    try{
        const findingById = await FacilitatorModel.findById(req.params.id);
        res.status(200).json({
            message: "facilitators list by id!",
            facilitator: findingById
        })
    } catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error displaying facilitator!"
    });
    }
});

app.get('/facilitators/email/:email',async(req,res) => {
    try{
        const findingByEmail = await FacilitatorModel.findOne({email:req.params.email});
        res.status(200).json({
            message: "facilitators list by email!",
            facilitator: findingByEmail
        })
    } catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error displaying facilitator!"
    });
    }
});

app.put("/facilitators/update/:id",async(req,res) => {
    try{
        const update=req.body
        const allFacilitators = await FacilitatorModel.findByIdAndUpdate({_id:req.params.id},
          {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            nationalId: req.body.nationalId,
            gender: req.body.gender

          },{new: true});
        res.status(200).json({
            message: "retrieving successful!",
            facilitators:allFacilitators
        });
    } catch (err){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving students!"
        });
    }})

    app.delete("/facilitators/:id",async(req,res) => {
        try{
            const FacilitatorsById = await FacilitatorModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "successful deleting!",
                facilitator: FacilitatorsById
            })
        } catch (err){
            console.log(err.message);
            res.status(500).json({
                message: "Error retrieving students!"
            })
        }
    })