var config = {
  apiKey: "AIzaSyAEnB8AKZCYe1W83PvFJoZNwXwrBWg87H8",
  authDomain: "learnfire-a727a.firebaseapp.com",
  databaseURL: "https://learnfire-a727a.firebaseio.com",
  projectId: "learnfire-a727a",
  storageBucket: "learnfire-a727a.appspot.com",
  messagingSenderId: "884825951184"
};
firebase.initializeApp(config);

function saveInfo(profile) {
  var info = [];
  info.push(...profile)
  localStorage.setItem('infos', JSON.stringify(info));
  // history.pushState(null, null, "profile.html");
  window.location.assign(window.location.href+"/profile.html")
}

firebase.auth().onAuthStateChanged(function(user) {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  console.log(user);
  if (user != null) {
    if (user.isAnonymous) {
      console.log('Anonymous');
    }else if(!user.emailVerified && user.providerData[0].providerId != "facebook.com"){
      user.sendEmailVerification().then(function() {
      console.log('email sent');
    }).catch(function(error) {
      console.log(error);
    });
    }else {

      saveInfo(user.providerData);
      // user.providerData.forEach(function (profile) {
      // console.log("Sign-in provider: "+profile.providerId);
      // console.log("  Provider-specific UID: "+profile.uid);
      // console.log("  Name: "+profile.displayName);
      // console.log("  Email: "+profile.email);
      // console.log("  Photo URL: "+profile.photoURL);
      // console.log(profile);
      // });
    }

  } else {
    console.log('Signed out');
    localStorage.clear();
  }
});

function getVal(id){
  return document.getElementById(id).value;
}

function onSubmit(submit){
  if(submit.id == 'register'){
    register();
  }
  if(submit.id == 'facebook'){
    signIn(new firebase.auth.FacebookAuthProvider());
  }
  if(submit.id == 'google'){
    signIn(new firebase.auth.GoogleAuthProvider());
  }
  if(submit.id == 'anonymous'){
    anonymous();
  }

}

function register() {
  var email = getVal('email');
  var pass = getVal('password');
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

function signIn(provider) {
  firebase.auth().signInWithPopup(provider);
  firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {

  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

function anonymous(){
  firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}
