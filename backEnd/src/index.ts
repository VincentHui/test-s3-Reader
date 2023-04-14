import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  _Object,
} from "@aws-sdk/client-s3"; // ES Modules import
import express from "express";
import cors from "cors";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";
dotenv.config();

const createPresignedUrlWithClient = async (
  client: S3Client,
  bucket: string,
  key: string
) => {
  return getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: bucket, Key: key }),
    { expiresIn: 3600 }
  );
};

const bucketName = process.env.BUCKET_NAME!;
const client = new S3Client({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});

const command = new ListObjectsCommand({
  Bucket: bucketName, // required
});

const app = express();
const port = 1000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//enabling cors for local deployment
app.use(cors(corsOptions));
app.get("/downloadLink", async (req, res) => {
  const { key } = req.query as { key: string };
  if (!key) {
    console.error("Requires a valid key");
    res.statusMessage = "Requires a valid key";
    res.status(400).end();
    return;
  }
  console.log(`downloading with key: ${key}`);
  const presignedUrl = await createPresignedUrlWithClient(
    client,
    bucketName,
    key
  );
  res.set("Access-Control-Allow-Origin", "*");
  res.send(presignedUrl);
});

app.get("/bucketContents", async (_req, res) => {
  console.log(`getting contents for bucket : ${bucketName}`);
  const response = await client.send(command);
  res.send(response);
});

app.listen(port, () => {
  console.log(`S3 app listening on port ${port}`);
});
