import aws from 'aws-sdk';

const client = new aws.DynamoDB.DocumentClient({
    


  accessKeyId: process.env.DYNAMO_ACCES_KEY,
  secretAccessKey: process.env.DYNAMO_SECRET,
  region: process.env.DYNAMO_REGION,
  params: {
    TableName: "user"
  }
});

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise()
};