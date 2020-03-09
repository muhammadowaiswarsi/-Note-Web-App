import AWSAppSyncClient from 'aws-appsync';

export const AppSync = new AWSAppSyncClient({ // this client is for awsAppsync graphql remains constant
    url: process.env.REACT_APP_GRAPHQL_END_POINT,
    region: process.env.REACT_APP_REGION,
    auth: {
        type: process.env.REACT_APP_AUTHENCITCATION_TYPE,
        apiKey: process.env.REACT_APP_API_KEY,
    },
    disableOffline: true
});

