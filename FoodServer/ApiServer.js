 const express=require('express');
 const path = require('path');
 const db=require('./DataBaseServeer');
 const cors=require('cors');
 const app=express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 const port = process.env.PORT||4000;
 app.listen(port,()=>{
        console.log('Server is running at 3000');
 })
 app.use('/Images', express.static(path.join(__dirname, 'Images')));
 app.get('/',(req,res)=>{
    db.getData().then((data)=>{
       res.send(data);
    })
    .catch((err)=>{
      res.send(err);
    })
 })
 
 app.post('/',(req,res)=>{
    db.postData(req.body.item_name,req.body.img,req.body.price,req.body.description).then((data)=>{
       res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    })
 })



      