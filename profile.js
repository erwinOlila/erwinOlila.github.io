var config = {
  apiKey: "AIzaSyAEnB8AKZCYe1W83PvFJoZNwXwrBWg87H8",
  authDomain: "learnfire-a727a.firebaseapp.com",
  databaseURL: "https://learnfire-a727a.firebaseio.com",
  projectId: "learnfire-a727a",
  storageBucket: "learnfire-a727a.appspot.com",
  messagingSenderId: "884825951184"
};
firebase.initializeApp(config);

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

var list = document.getElementById('list');

var profile = JSON.parse(localStorage.getItem('infos'));

document.getElementById('photo').src = profile[0].photoURL;
document.getElementById('name').innerHTML += (profile[0].displayName);
document.getElementById('email').innerHTML += (profile[0].email).toLowerCase();
document.getElementById('icon').addEventListener('click', addTask);
document.getElementById('toDo').addEventListener('submit', addTask);

function dateAdded(){
  let current = new Date();
  return (current.getDate()
                  + "-" +(current.getMonth()+1)
                  + "-" +current.getFullYear()
                  + " @ " +current.getHours()
                  + ":"   +current.getMinutes()
                  + ":"   +current.getSeconds());
}

function showEdit(show) {
  if (show) {
    document.getElementById('whole').classList.add('blur');
    document.getElementById('edit-info').style.display = 'grid';
  } else {
    document.getElementById('whole').classList.remove('blur');
    document.getElementById('edit-info').style.display = 'none'
  }
  document.getElementById('edit-form').addEventListener('submit', () => {
    let age = document.getElementById('age-info').value;
    let prof = document.getElementById('profession-info').value;
    let address = document.getElementById('address-info').value;
    console.log(age)
    firebase.database().ref(`info/${profile[0].uid}/age`).set(age);
    firebase.database().ref(`info/${profile[0].uid}/profession`).set(prof);
    firebase.database().ref(`info/${profile[0].uid}/address`).set(address);
  })
}

function colorize(thing){
  if(thing.id == 'task-container'){
    thing.classList.add('recolor-task');
    return;
  }
  thing.classList.add('recolor-pen');
}

function decolorize(thing){
  if(thing.id == 'task-container') {
    thing.classList.remove('recolor-task');
    return;
  }
  thing.classList.remove('recolor-pen');
}

function addTask(e){
  e.preventDefault();
  let task = document.getElementById('task').value;
  let time = dateAdded();
  var profData = firebase.database().ref(`${profile[0].uid}`).child(`${time}`);
  profData.set(task);
  document.getElementById('toDo').reset();
}

function onLoad(){
  // checks if local storage is empty (happens if not signed in)
  if(localStorage.getItem('infos') === null){
    window.location.href = "/";
  }
  // read data from database for profile info
    firebase.database().ref("info/").once("value").then((snap) => {
      // if data under this node is empty, create one
    if(!snap.hasChild(`${profile[0].uid}`)) {
      let pushInfo = firebase.database().ref(`info/${profile[0].uid}`);
      pushInfo.child("name").set(profile[0].displayName);
      pushInfo.child("email").set(profile[0].email);
      pushInfo.child("age").set("na");
      pushInfo.child("address").set("na");
      pushInfo.child("profession").set("na");
    }
    // if data is available, fetch data and reflect in website
    var getInfo = firebase.database().ref(`info/${profile[0].uid}/age`);
    getInfo.once('value').then((snap) => {
      document.getElementById('age').innerHTML += `<span>${snap.val()}</span>` })

    var getInfo = firebase.database().ref(`info/${profile[0].uid}/address`);
    getInfo.once('value').then((snap) => {
      document.getElementById('address').innerHTML += `<span>${snap.val()}</span>` })

    var getInfo = firebase.database().ref(`info/${profile[0].uid}/profession`);
    getInfo.once('value').then((snap) => {
      document.getElementById('profession').innerHTML += `<span>${snap.val()}</span>` })
  })
  // fetch and reflect all tasks
  let getTasks = firebase.database().ref(`${profile[0].uid}`);
  getTasks.on('child_added', (data) => {
    let time = data.Xn.path.W[1];
    let task = data.val();
    list.innerHTML += `<p id="task-container" onClick="remove(this)" onmouseover="colorize(this)" onmouseout="decolorize(this)" class="task-container"><span id="time" class="time">${time}</span><span id="task-name" class="task-name">${task}</span></p>`
  });
  // set up digital clock
  getTime();

  // configure placeholder for input foeld
  document.getElementsByName('task')[0].placeholder = `Hi ${profile[0].displayName}, do you have any plans in mind?`;
}

function getTime() {
  let current = new Date();

  let hrs = current.getHours();
  let min = current.getMinutes();
  let mnt = months[current.getMonth()];
  let day = current.getDate();
  let yr  = current.getFullYear();
  let suf = (hrs > 12)? "PM" : "AM";

  hrs = (hrs == 12)? 0 : hrs;
  hrs = (hrs > 12)? hrs - 12 : hrs;

  hrs = tick(hrs);
  min = tick(min);

  let timeFormat = `<span class="dig-time clock">${hrs}:${min} ${suf}</span>`;
  let dateFormat = `<span class="dig-time date">${mnt} ${day} ${yr}</span>`;
  document.getElementById('clock').innerHTML =timeFormat+dateFormat;
  setInterval(getTime, 6000);
}

function tick(val) {
  return ((val < 10) ? "0" + val : val);
}

function remove(task){
   let time = task.childNodes[0].innerHTML;
   let name = task.childNodes[1].innerHTML;
   firebase.database().ref(`${profile[0].uid}`).child(`${time}`).remove();
   task.remove();
}

function logOut(){
  firebase.auth().signOut().then(() => {
  }).catch(function(error) {
  });
  localStorage.clear();
  window.location.href = "/";
}
