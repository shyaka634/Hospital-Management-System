import express from 'express';
import { insertPost, getAllPosts } from '../controllers/postController.js';
const postroute= express.Router();

postroute.post('/register',insertPost);
postroute.get('/getAll', getAllPosts);

export default postroute;