import express from 'express';
import { insertDepartment, getAllDepartments } from '../controllers/departmentController.js';
const departmentroute= express.Router();

departmentroute.post('/register',insertDepartment);
departmentroute.get('/getAll', getAllDepartments);

export default departmentroute;