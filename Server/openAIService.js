require("dotenv").config();
const {Configuration, OpenAIApi} =require ("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);
const extractName = async (text)=>{
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:"Identify name in the following string: "+text
    });
    return response.data.choices[0].text;
}
module.exports= {extractName};