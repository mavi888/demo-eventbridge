const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

function putEvent() {

  const detail = { 
    name : 'Say Bye', 
    date: new Date()
  };

  var params = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'Saying Bye',
        Source: 'say.bye',
      },
    ]
  };

  return eventbridge.putEvents(params).promise();
}

exports.hello = async (event) => {

  const data = await putEvent(); 
  console.log(data);

  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {}
  }
}

