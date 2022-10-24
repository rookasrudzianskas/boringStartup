/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	USER_TABLE
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const {USER_TABLE} = process.env;

exports.handler = async (event) => {

    // get All users from the database

    // send notification to all users

    // later personalize the message based on the user progress. @TODO

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
