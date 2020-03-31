const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

function putEventInEventBridge(orderDetails) {

  const detail = { 
    restaurantName: orderDetails.restaurantName,
    order: orderDetails.order,
    name: orderDetails.name,
    amount: orderDetails.amount
  };

  var params = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'order',
        Source: 'custom.orderManager'
      },
    ]
  };

  console.log(params);
  return eventbridge.putEvents(params).promise();
}

exports.putOrder = async (event) => {
  console.log('putOrder');

  const orderDetails = JSON.parse(event.body);
  const data = await putEventInEventBridge(orderDetails); 
  
  console.log(data);
  console.log(orderDetails);

  return {
    statusCode: 200,
    body: JSON.stringify(orderDetails),
    headers: {}
  }
}

exports.notValidRestaurant = async (event) => {
  console.log('notValidRestaurant recieved an order');
  console.log(event);
  return;
}