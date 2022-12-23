// server/index.js
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
//console.log(process.env);

//openai stuff
const OPENAI_KEY = process.env.OPENAI_KEY;
console.log(OPENAI_KEY);
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function coverLetterGen (text) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 1500,
  });
  console.log(response);
  return response;
}


const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//to be able to parse request bodies
app.use(bodyParser.json())

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/endpoint1", (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.resume);
  console.log(req.body.jobDescription);
  const combinedtext = `${req.body.resume}\n Write a cover letter with details from the resume above based on the job description below\n${req.body.jobDescription}`;
  console.log(combinedtext);
  
  coverLetterGen(combinedtext)
    .then((data) => {
      console.log("Processing Complete!");
      //console.log(data.json());
      res.json({ 
        serverMessage: "Hello from server!" ,
        yourMessage: data
      });
    })
    .catch((error) => {
      console.error(`Generation error: ${error}`);
    });
  
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});