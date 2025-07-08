const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname,'public')));

const upload = multer({
    dest: path.join(__dirname,'uploads/'),
    limits:{fileSize: 5*1024*1024, files:10}
});

app.post('/submit', upload.array('images',10), async (req,res)=>{
    const data = req.body;
    const files = req.files || [];

    try{
        const transporter = nodemailer.createTransport({
            sendmail:true,
            newline:'unix',
            path:'/usr/sbin/sendmail'
        });

        const attachments = files.map(f=>({
            filename: f.originalname,
            path: f.path
        }));

        await transporter.sendMail({
            from:'no-reply@carito.com',
            to: process.env.NOTIFY_EMAIL || 'challengedsns@gmail.com',
            subject:'New Carito Parts Request',
            text: JSON.stringify({...data, files: files.map(f=>f.filename)}, null, 2),
            attachments
        });
    }catch(err){
        console.error(err);
    }

    res.json({success:true});
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server running');
});
