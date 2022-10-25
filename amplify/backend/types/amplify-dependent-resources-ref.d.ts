export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "boringStartup": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "boringStartup": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "s3boringstartupstorage1d02bbb4": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "analytics": {
        "boringstartup": {
            "Region": "string",
            "Id": "string",
            "appName": "string"
        }
    },
    "function": {
        "DailyReminderNotification": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "CloudWatchEventRule": "string"
        }
    }
}