const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-southeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");
    const params = {
        Key: {webpageURL: event.url, highlightID: event.highlightID},
        TableName: "highlights",
    };
    
    console.log(params.Key)
    
    console.log(event)
    
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            date: Date.now(),
            webpageURL: event.url,
            highlightID: context.awsRequestId,
            highlightText: event.text,
            webpageTitle: event.title,
            webpageTopic: event.topic
        }),
        
    };
    
    let self = this;
    
    
    docClient.delete(params, (err, data) => {
        if(err){
            callback(err, null);
        } else {
            callback(null, "deleted");
        }
    })
};
