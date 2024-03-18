import mongoose from "mongoose";
const facilitatorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    nationalId: {
        type: String,
        unique: true,
        length: 16
    },
    courses: [{
        type: String,
        required: true
}],
Role: {
    type: String,
    required: true
}
},{timestamps: true});

const FacilitatorModel = mongoose.model('facilitators',facilitatorSchema);
export default FacilitatorModel;