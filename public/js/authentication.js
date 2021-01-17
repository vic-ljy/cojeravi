/*
var userID;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        //alert("signed in; userID is " + userID);
    } else {
        alert("not signed in");
    }
})
*/

function signUpEmailPass() {
    let userName = String(document.getElementById('signUpName').value);
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPassword').value;
    //alert('checkpoint 1');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            //alert('checkpoint 1.5');
            let profilesRef = rootRef.child("profiles");
            let currentUser = firebase.auth().currentUser;
            let userID = currentUser.uid;
            //alert('checkpoint 2');
            profilesRef.child(userID).set({
                name: userName,
                groupID: ""
            });
            //alert('checkpoint 3');
            window.location.href = "groups.html";
        })
        .catch((error) => {
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert("There was an error. :( Message: "+ errorMessage);
        });
}

function signUpGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            //var credential = result.credential;
            //var token = credential.accessToken;
            let profilesRef = rootRef.child("profiles");
            var user = result.user;
            let userID = user.uid;
            let userName = user.displayName.substring(0,user.displayName.indexOf(" "));
            //alert('checkpoint 2');
            profilesRef.child(userID).set({
                name: userName,
                groupID: ""
            });
            //alert('checkpoint 3');
        window.location.href = "groups.html";
        }).catch((error) => {
            //var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            alert("There was an error. :( Message: "+ errorMessage);
        });
}

function logInEmailPass() {
    alert('checkpoint 0');
    let email = document.getElementById('logInEmail').value;
    let password = document.getElementById('logInPassword').value;
    alert("checkpoint 1");
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            //let profilesRef = rootRef.child("profiles");
            let currentUser = firebase.auth().currentUser;
            let userID = currentUser.uid;
            alert('checkpoint 2');
            database.ref('profiles/'+userID+'/groupID').once('value').then(function(snapshot) {
                alert('checkpoint 3');
                if (snapshot.val()== "") {
                    window.location.href = "groups.html";
                } else {
                    window.location.href = "schedule.html";
                }
            });
        })
        .catch((error) => {
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert("There was an error. :( Message: "+ errorMessage);
        });
}

function logInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            //var credential = result.credential;
            //var token = credential.accessToken;
            var user = result.user;
            let userID = user.uid;
            //alert('checkpoint 2');
            
            //Checks if the user's info is stored in database (and if not then adds their name and/or empty groupID string)
            database.ref('profiles/'+userID).once("value").then(function(snapshot) {
                if (!(snapshot.exists() || snapshot.child('name').exists())) {
                    let userName = user.displayName.substring(0,user.displayName.indexOf(" "));    
                    database.ref('profiles/'+userID).update({
                        name: userName
                    });
                }
                if (!(snapshot.child('groupID').exists())) {
                    alert('checkpoint 2');
                    database.ref('profiles/'+userID).update({
                        groupID: ""
                    });
                }
                alert('checkpoint 1');
                database.ref('profiles/'+userID+'/groupID').once('value').then(function(snapshot) {
                    //alert('checkpoint 3');
                    if (snapshot.val()== "") {
                        window.location.href = "groups.html";
                    } else {
                        window.location.href = "schedule.html";
                    }
                });
            });
        }).catch((error) => {
            //var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            alert("There was an error. :( Message: "+ errorMessage);
        });
}

function signOut() {
    firebase.auth().signOut();
    alert("signed out!");
}