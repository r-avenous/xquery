// import dotenv from 'dotenv'
const dotenv = require('dotenv')
// import aws from 'aws-sdk'
const aws = require('aws-sdk')


dotenv.config()

const region = "us-east-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const dynamoDb = new aws.DynamoDB({
    region,
    accessKeyId,
    secretAccessKey,
})

const addUser = async (s3Url,uuid,data,resumeName)=>{
  let parsedInfo = aws.DynamoDB.Converter.marshall(data);
    const params = {
        TableName: "ResumeUploads",
        Item: {
            "ID": {
                S: uuid
            },
            "url": {
                S: s3Url
            },
            "isAccountCompleted":{
              BOOL:false
            },
          "parsedInfo":{
              M:parsedInfo
          },
          "resumeName":{
            S:resumeName
          }

        }
    }
    const result = await dynamoDb.putItem(params).promise();
    return result
}
module.exports.addUser = addUser
