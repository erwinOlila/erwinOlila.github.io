var firebaseConfig = {
    apiKey: "AIzaSyA9Qtxo66LWPtAAvQFJ_EAjB2NTwKn2lDA",
    authDomain: "home-temperature-data-1ef85.firebaseapp.com",
    databaseURL: "https://home-temperature-data-1ef85-default-rtdb.firebaseio.com",
    projectId: "home-temperature-data-1ef85",
    storageBucket: "home-temperature-data-1ef85.appspot.com",
    messagingSenderId: "527187977802",
    appId: "1:527187977802:web:e9ff71fe661976cbb7a8b3",
    measurementId: "G-WDJD6JLPQX"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();
var dataRef  = database.ref('/');
dataRef.limitToLast(20).get().then(function(snapshot){
if (snapshot.exists()) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    const vals = Object.values(data);
    keys.forEach(function(key, i) {
        this[i] = convertTime(key);
    }, keys);
    plottData(keys, vals);
}
else {
    console.log("No data available");
}
}).catch(function(error){
console.error(error);
})

// dataRef.limitToLast(10).on('child_added', function(data) {
//     var sensor_data = {
//         date: data.key, value: data.val()
//     }
//     console.log(sensor_data.date + ': ' + sensor_data.value)
// })

function convertTime(unix) {
unix = unix - 28800;
var time = new Date(unix * 1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var year = time.getFullYear();
var month = months[time.getMonth()]
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();

var str_time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

return str_time;
}

function plottData(k, v) {
var ctx = document.getElementById('myChart');
const newLocal = 'cyan';
var config = {
    type: 'line',
    data: {
        labels: k,
        datasets: [{
            label: 'Temperature',
            backgroundColor: 'red',
            borderColor: 'red',
            data: v,
            fill:false
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Sensor Data'
        },
        hover: {
            mode: 'nearest',
            intersect: true
        }
    }
}
var myChart = new Chart(ctx, config);

dataRef.limitToLast(1).on('child_added', (snapshot) => {
    console.log(snapshot.key);
    const key = convertTime(snapshot.key);
    const val = snapshot.val();
    if (config.data.labels.includes(key)) {
        console.log("already exists");
    } else {
        config.data.labels.push(key);
        config.data.datasets.forEach(function(dataset) {
            dataset.data.push(val);
        });
        myChart.update();
    }
})
}
