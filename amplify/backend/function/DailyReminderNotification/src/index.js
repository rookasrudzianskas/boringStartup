/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	USER_TABLE
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const https = require('https');

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

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    const options = {
        hostname: 'https://exp.host',
        path: '/--/api/v2/push/send',
        method: 'POST',
        port: 443, // 👈️ replace with 80 for HTTP requests
        headers: {
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(new Error(err));
                }
            });
        });

        req.on('error', err => {
            reject(new Error(err));
        });

        // 👇️ write the body to the Request object
        req.write(JSON.stringify(message));
        req.end();
    });
}
