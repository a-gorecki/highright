const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-southeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");
    var params 
         
     if (event.key === 'all') {params = {

          TableName: "highlights"
         };}
         else {
             params = {
        ExpressionAttributeNames: {
            "#tableKey": event.key
        },
          FilterExpression: "#tableKey = :searchTerm", 
          ExpressionAttributeValues: {
              ":searchTerm": event.term
          },
          TableName: "highlights"
         };
         }
         
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify("Processed")
        
    };
    
    docClient.scan(params, (err, data) => {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};
