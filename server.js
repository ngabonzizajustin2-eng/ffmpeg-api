import express from 'express';
const app=express();
app.use(express.json());
app.get('/',(req,res)=>res.send('FFmpeg API is running'));
app.post('/render',(req,res)=>res.json({status:'placeholder',message:'Scaffold created'}));
app.listen(process.env.PORT||10000);
