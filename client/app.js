
const getLocalIp = function(onFoundIp) {
    const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    const pc = new PeerConnection({ iceServers: [] })
    const noop = function() {}
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
    pc.createDataChannel(''); // Dummy channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop) // Create offer and set local description
    pc.onicecandidate = function(ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
            const localIp = ipRegex.exec(ice.candidate.candidate)[1]
            onFoundIp(localIp)
            pc.onicecandidate = noop
        }
    };
}

const fetchUser = function(localIp) {
    const userIdDiv = document.getElementById('userId')
    const localIpDiv = document.getElementById('localIp')
    const externalIpDiv = document.getElementById('externalIp')
    const getUserEndpoint =  'https://xn5sj7q118.execute-api.us-east-1.amazonaws.com/prod/get-user'
    const requestInit = {
        method: 'GET',
        headers: {
            InternalIp: localIp
        },
    }
    const NOT_FOUND = 'Not Found'
    fetch(getUserEndpoint, requestInit)
        .then(response => response.json())
        .then(user => {
            userIdDiv.innerText = user.userId || NOT_FOUND
            localIpDiv.innerText = user.intIp || NOT_FOUND
            externalIpDiv.innerText = user.extIp || NOT_FOUND
        })
        .catch(error => {
            console.error(error)
            userIdDiv.innerText = NOT_FOUND
            localIpDiv.innerText = NOT_FOUND
            externalIpDiv.innerText = NOT_FOUND
        })
}

const init = function() {
    getLocalIp(fetchUser)
}

window.onload = init;
