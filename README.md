# Identity Challenge

Serverless Application that assigns a unique ID to any device that hits a web page. The user can restart the browser, clear cookies, clear the cache, or even switch browsers on the device and the ID will remain the same. This is done by recording the combination of the local and external IP addresses.

Try it out [here](https://www.seanewilkinson.com/id).

Finding a user's Local IP address uses the [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API):

>WebRTC (Web Real-Time Communications) is a technology which enables Web applications and sites to capture and optionally stream audio and/or video media, as well as to exchange arbitrary data between browsers without requiring an intermediary. The set of standards that comprises WebRTC makes it possible to share data and perform teleconferencing peer-to-peer, without requiring that the user install plug-ins or any other third-party software.

[`RTCPeerConnection.createDataChannel()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createDataChannel) is an experimental feature that is not currently supported by all browsers.

## Run Backend Locally
* [Install Serverless Framework](https://serverless.com)
* Run:
    * `npm install`
    * `serverless dynamodb install`
    * `npm start`

