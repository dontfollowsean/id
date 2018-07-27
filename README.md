# Identity Challenge

Serverless Application that assigns a unique ID to any device that hits a web page. The user can restart the browser, clear cookies, clear the cache, or even switch browsers on the device and the ID will remain the same. This is done by recording the combination of the local and external IP addresses.

Try it [here](https://www.seanewilkinson.com/identity-challenge).

## Run Backend Locally
* [Install Serverless Framework](https://serverless.com)
* Check out dev branch
* Run:
    * `npm install`
    * `serverless dynamodb install`
    * `npm start`

