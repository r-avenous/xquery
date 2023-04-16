const ResumeParser = require('./src/parseResume');
const fs = require("fs/promises");
const express = require("express");
const multer = require('multer')
const cors = require("cors");
// const _ = require("lodash");
const { v4: uuid } = require("uuid");
// import { generateUploadURL } from './s3.js'
const { generateUploadURL,uploadDirect } = require('./s3.js')
const service = require('./service.js');
const {addUser} = require('./db.js');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./front'))


app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})


app.get("/parseResume/:id", async (req, res) => {
	const id = req.params.id;
	let data;

	try {
		data = await fs.readFile(`data/parseResume/${id}.json`, "utf-8");
	} catch (err) {
		return res.sendStatus(404);
	}
   data = JSON.parse(data);
	res.json({
		data: data
	});
});

app.post("/uploadParseResume",multer().single('file'),async (req,res)=>{
	//get file from req param
	let file = req.file;
	let id = uuid();
	console.log(file);
	let resumeName = "Resume";
	if(file.originalname){
		resumeName = file.originalname
	}
	//upload file to s3
	let result = await uploadDirect(file,id);
	let url = result.Location;
	console.log(url);
	//parse resume
	let data = await ResumeParser.parseResumeUrl(url);
	//send response
	let resp = await addUser(url,id,data,resumeName);
  data.uuid=id;
	res.send(data);

})

app.post("/parseResume", async (req, res) => {
	const id = uuid();
	const url = req.body.url;
  console.log(url);

	if (!url) {
		return res.sendStatus(400);
	}
	await fs.mkdir("data/parseResume", { recursive: true });

 ResumeParser
  .parseResumeUrl(url) // url
  .then(data => {
    // console.log('Yay! ', data.name);
    fs.writeFile(`data/parseResume/${id}.json`,JSON.stringify(data));
	res.status(201).json({
		id: id,
		data:data
	});
    // return data;
  })
  .catch(error => {
    console.error(error);
  });


});

app.get("/generateToken", async (req, res) => {

	console.log("generateToken");

	const data=  await service.generateToken();
	res.send(data);

	  
});
app.post("/runxquery", async (req, res) => {
	const { query } = req.body; // assuming you're sending category and query in the request body
	console.log("xquery", query);

	// your xquery code here

	const data = await service.xqueryData(query); // assuming this is the function that fetches data using xquery
	res.send(data);
});






app.post("/getDataID", async (req, res) => {
	console.log("getDataID");
	// const email = req.body.email;
	// const access_token = req.body.access_token;
	// console.log(email);
	// console.log(access_token);
	// const response=await service.getDataID(access_token,email);

	res.send({status:"ok"});
});



app.post("/postDataBasic", async (req, res) => {
	console.log("postDataBasic");
	// const access_token = req.body.access_token;
	// console.log(access_token);
	// const Email = req.body.Email;
	// const Last_Name = req.body.Last_Name;
	// const First_Name = req.body.First_Name;
	// const City = req.body.City;
	// const Country = req.body.Country;
	// const Mobile = req.body.Mobile;
	// const Whatsapp_Number = req.body.Whatsapp_Number;
	// const Linkedin = req.body.Linkedin;

	// const response =await service.postDataBasic(access_token, Email, Last_Name, First_Name, City, Country, Mobile, Linkedin, Whatsapp_Number);

	res.send({status:"ok"});


});
app.post("/postDataEducation", async (req, res) => {
	console.log("postDataEducation");
	// const access_token = req.body.access_token;
	// const Email = req.body.Email;
	// const University = req.body.University;
	// const Field_s_of_Study = req.body.Field_s_of_Study;
	// const Graduation_Year = req.body.Graduation_Year;
	// const Current_GPA = req.body.Current_GPA;
	// const Resume_link = req.body.Resume_link;
	// const Image = req.body.Image;
	// const Score = req.body.Score;
	// const Code_Chef = req.body.Code_Chef;
	// const Code_Forces = req.body.Code_Forces;
	// const Leet_Code = req.body.Leet_Code;
	// const Test = req.body.Test;


	// const response = await service.postDataAcad(access_token, Email, Test, Resume_link, Image, Score, Current_GPA, Code_Chef, Code_Forces, Leet_Code, University, Field_s_of_Study, Graduation_Year);

	res.send({status:"ok"});




});

app.post("/postWorkAndProjData", async (req, res) => {
	console.log("postWorkAndProjData");
	// const access_token = req.body.access_token;
	// const idForAPICalls = req.body.idForAPICalls;
	// const Work_Experience = req.body.Work_Experience;
	// const Projects = req.body.Projects;

	// const response = await service.postWorkAndProjData(access_token, idForAPICalls, Work_Experience, Projects);
	res.send({status:"ok"});
});
app.post("/postSkillCheck", async (req, res) => {
	console.log("postSkillCheck");
	// const access_token = req.body.access_token;
	// const Email=req.body.Email;
	// const Is_the_Work_section_filled=req.body.Is_the_Work_section_filled;
	// const Skill_Set=req.body.Skill_Set;

	// const response = await service.postSkillCheck(access_token, Email, Is_the_Work_section_filled, Skill_Set);
	res.send({status:"ok"});
});


app.post("/postAssociateCandi", async (req, res) => {
	console.log("postAssociateCandi");
	// const access_token = req.body.access_token;
	// const idForAPICalls = req.body.idForAPICalls;
	// console.log(idForAPICalls);

	// const response = await service.postAssociateCandi(access_token, idForAPICalls);
	res.send({status:"ok"});


});
app.post("/getWorkExpData", async (req, res) => {

	console.log("getWorkExpData");
	// const access_token = req.body.access_token;
	// const idForAPICalls = req.body.idForAPICalls;
	// console.log(idForAPICalls);

	// const response = await service.getWorkExpData(access_token, idForAPICalls);
	res.send({status:"ok"});







});


app.listen(3000, () => {
	
	console.log("API Server is running...");
	// service.generateStaticToken();
	//setInterval(service.generateStaticToken, 1000*60*60*60);




});
