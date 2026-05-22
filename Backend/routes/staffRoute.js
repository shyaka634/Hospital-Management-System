import express from 'express'
import { registerStaff, getAllStaff,getStaffById,updateStaffById,deleteStaffById } from '../controllers/staffController.js'
const staffroute=express.Router();
staffroute.post('/register',registerStaff)
staffroute.get('/getAll',getAllStaff)
staffroute.get('/employee/:id',getStaffById)
staffroute.put('/update/:id',updateStaffById)
staffroute.delete('/delete/:id',deleteStaffById)

export default staffroute;