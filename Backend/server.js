const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const connected = require("./src/config/db");
const {resume , selfDescription , jobDescription} = require("./src/services/temp");
const generateInterviewReport = require("./src/services/ai.service");

connected();
generateInterviewReport({resume , selfDescription , jobDescription})


const port = process.env.PORT || 8000
app.listen(port , ()=>{
    console.log("server is running on the port 3000")
})