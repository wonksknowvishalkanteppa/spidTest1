function getRandomString(sizeInMb) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;':,./<>?", //random data prevents gzip effect
        iterations = sizeInMb * 1024 * 1024, //get byte count
        result = '';
    for (var index = 0; index < iterations; index++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    };
    return result;
};


//for files
function checkspeed1() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    // xhr.setRequestHeader("Content-type", "false");


    var file = document.getElementById('files').files[0]
    console.log(file['name']);

    var formdata = new FormData();
    formdata.append("files", file);

    size = file['size'];
    console.log(size);
    // for (var pair of formdata.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    var start = new Date().getTime();
    xhr.send(formdata);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var end = new Date().getTime();

            data = this.responseText;
            console.log(data);

            var timeDuration = (end - start) / 1000;
            console.log(timeDuration)
            var bps = (size / timeDuration).toFixed(2);
            var KBps = (bps / 1024).toFixed(2);
            var MBps = (KBps / 1024).toFixed(2);
            var Mbps = MBps * 8;
            var data = "<br>Connection speed(Upload): <br>" + KBps + " KBps<br>" + Mbps + " Mbps<br>" + MBps + " MBps<br>";

            console.log(MBps)
            $("#info").html(data);
        }
    };
}

// string data
var sum = 0;

function checkspeed() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("Content-Type", "application/json");


    var s = getRandomString(2);
    const byteSize = str => new Blob([str]).size;
    var size = byteSize(s);

    var start = new Date().getTime();
    xhr.send(JSON.stringify({ 'data': s }));
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var end = new Date().getTime();
            data = this.responseText;
            // console.log(data);

            var timeDuration = (end - start) / 1000;
            console.log("time: ", timeDuration)

            var bps = (size / timeDuration).toFixed(2);
            var KBps = (bps / 1024).toFixed(2);
            var MBps = (KBps / 1024).toFixed(2);
            var Mbps = MBps * 8;

            sum += Mbps;

            var data = '<br> Chunk size: ' + size / 1024 / 1024 + 'MB';
            data += '<br> Time Taken: ' + timeDuration + 's';
            data += '<br>Speed: ' + Mbps + ' Mbps';
            // console.log("speed: ", MBps);
            $("#info").html(data);

        }
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main1() {
    // var a = setInterval(checkspeed, 5000);
    sum = 0;
    var data = '<br> Chunk size: N/A';
    data += '<br> Time Taken: 0s';
    data += '<br>Speed: 0 Mbps';

    $("#info").html(data);

    var data = '<br>Average upload speed: calculating';
    $("#final").html(data);

    var iterations = 11;
    await sleep(5000);

    for (var i = 1; i < iterations; i++) {
        checkspeed();
        await sleep(5000);
    }

    var avg = sum / (iterations - 1);
    console.log(avg, "hi");
    var data = '<br>Average upload speed: ' + avg.toFixed(2) + ' Mbps';
    $("#final").html(data);

}

// const promise = new Promise(function(resolve, reject) {
//     console.log("indide");
//     var iterations = 3;
//     resolve(iterations);
// });
// promise.then(res => {
//         console.log("above")
//         for (var i = 1; i < res; i++) {
//             window.setTimeout(checkspeed, i * 5000);
//         }
//     })
//     .then(res => {
//         avg = sum / res;
//         console.log(avg, "hi");
//         var data = '<br>Average uploadd speed: ' + avg.toFixed(2) + ' Mbps';
//         $("#final").html(data);
//     })
//     .catch(e => {
//         console.log(e);
//     });

// window.onload = main1();