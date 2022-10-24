/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	USER_TABLE
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');

const {USER_TABLE} = process.env;

const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {

    // get All users from the database
    const params = {
        TableName : USER_TABLE,
    };

    const users = await docClient.scan(params).promise();
    console.log('Sending notification to:', users.Items.length(), "users", JSON.stringify(users));
    // send notification to all users
    await Promise.all(users.Items.map(user => user?.expoNotificationToken && sendPushNotification(user.expoNotificationToken)));
    // later personalize the message based on the user progress. @TODO

    return "Finished";
};

export async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
