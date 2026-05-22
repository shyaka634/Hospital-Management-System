import express from "express";
import {registerRecruitment, getRecruitment} from '../controllers/recruitmentController.js'
const recruitmentroutes= express.Router()
recruitmentroutes.post('/register',registerRecruitment);
recruitmentroutes.get('/filterAll',getRecruitment);

export default recruitmentroutes;