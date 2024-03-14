import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express();
const port = process.env.PORT || 3000;
const db_connection_string = process.env.MANGODB_URI;

app.use(express.json());
mangoose.connect(db_connection_string)
.then() => {
    console.log('connected to DB......');
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});
}.catch{
    console.log(err);
}