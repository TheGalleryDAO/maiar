import { Schema, model, models } from 'mongoose';


const adminSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  }
});



const Admin = models.Admin || model('Admin', adminSchema);

export default Admin;
