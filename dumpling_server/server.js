const express = require('express');
const bodyParser =  require('body-parser');
const cors = require("cors");
const admin = require("./firebaseConfig");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/verifyToken', async (req,res) => {
    const {token} = req.body;
    try {
        const decodedToken = await admin.auth(). verifyIdToken(token);
        res.status(200).send(decodedToken);
    }catch(error){
        res.status(400).send(error.message);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})