// import dotenv from 'dotenv'
const dotenv = require('dotenv')
// import aws from 'aws-sdk'
const aws = require('aws-sdk')
// import crypto from 'crypto'
const crypto = require('crypto')
// import { promisify } from "util"
const { promisify }= require("util")
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-1"
const bucketName = "direct-upload-bucket-for-resume"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})
const uploadDirect = async (file,key)=>{
  const params = {
    Bucket: "work-side-resume-upload",
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }
  const result = await s3.upload(params).promise();
  return result
}
module.exports.uploadDirect = uploadDirect
module.exports.generateUploadURL = async function(){
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}