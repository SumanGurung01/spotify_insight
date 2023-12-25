// const accessToken = 'BQBscGgHwlUm4-tG7Xdbox-tYxq6c52aCfpVOsnqXo_YULVUV_TeuKV1cWyrIRpcnncnkwSRwb_qKUFeCOabwuxkiHL7DCYE7yok4gZRQfj00ZIhefkLE5XhhMnqChlgkvXiYxAvGlG2J-RFIhG7Cfs-05aaQr6zencmnVuPVaVGHzemr5bYInv7qRP5UiyrjzuTkXDZHQT-ZQ'


// var userid = "31br5qo6atqhrtvp53kxnyoehf2y"

// const getRecentlyPlayed = (accessToken) => {
//     fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken,
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(error => console.error('Error:', error));
// }

// getRecentlyPlayed(accessToken)
var init = { longTerm: { lastname: "gurung" } }
var obj = { shortTerm: { name: "suman" } }

var final = { ...init, ...obj }

console.log(final)


