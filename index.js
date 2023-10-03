const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const {BlogModel} =require("./blogschema")
const {BlogRoute}=require("./blogRoute")
const Connect=require("./Config")
const cors=require("cors")
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/",BlogRoute)
app.post('/linkedin-data', async (req, res) => {
  const { url } = req.body;
  const {head}=req.body

  try {
    const linkedinResponse = await axios.get(url);
    const html = linkedinResponse.data;

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Extract the image URL
    const imageUrl = $('meta[property="og:image"]').attr('content');

    // Extract the description
    const description = $('meta[property="og:description"]').attr('content');

    // Extract the heading (title of the webpage)
    const heading = $('title').text();

    // Create a JSON response object with labels
    const responseData = {
      imgURL : imageUrl,
      Discription : description,
      Title : head ? head : heading,
      Url : url
    };
    console.log(responseData)
    const data=new BlogModel(responseData)
    await data.save()
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching LinkedIn data' });
  }
});
  

app.listen(3000,async(req,res)=>{
  try{
    await Connect
    console.log("server is running in Port 5000")
  }
  catch{
      console.log("Server Error")
  }
});