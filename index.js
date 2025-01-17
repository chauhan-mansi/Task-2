const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');


const app = express();
app.use(cors())
dotenv.config();
app.use((express.json()));
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:true}))


app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
})
