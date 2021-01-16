//declare variables
var userID;
const arrColours = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#800080', '#ff00ff'];

//Get user ID
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //user is signed in
        userID = user.uid;
    } else {
        //not signed in
    }
})

//read from database allgroupids


//array of all group IDs
let allGroupIds = ['poo'];

//create nodes
database.ref('allgroups').set(allGroupIds);

//create group ID
function newGroupId() {
    let randomId = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';

    for(let i = 0; i < 6; i++) {
        randomId += characters[(Math.floor(Math.random() * characters.length))];
    }

    return randomId;
}




//for the create group button
function createGroup() {
    
    let trueId = newGroupId();
    const validate = (currentValue) => currentValue === trueId;

    while (allGroupIds.every(validate)) {
        trueId = newGroupId();
    } 

    database.ref('profiles/'+ userID + '/groupID').set(trueId);

    let profColour = arrColours[Math.floor(Math.random() * arrColours.length)];

    //set members node with colour
    database.ref('groups/' + trueId).set('');
    database.ref('groups/' + trueId + '/members/' + userID).set(profColour);

    //set schedule node
    database.ref('groups/' + trueId + '/schedule').set('');

    //redirect
    window.location.href = "schedule.html";  
}


//for the join group button
function joinGroup() {
    //associated to ID of field of entry of group code 'join'
    let checkGrId = document.getElementById('joinGroup').value;
    const validate = (currentValue) => currentValue === checkGrId;
    
    if(allGroupIds.every(validate)) {
        database.ref('profiles/'+ userID + '/groupID').set(checkGrId);
    } else {
        alert("enter a valid room code");
    }

    //colour random
    let profColour = arrColours[Math.floor(Math.random() * arrColours.length)];

    //enter group node
    database.ref('groups/' + checkGrId + '/members/' + userID).set({
        profColour
    });

    //redirect
    window.location.href = "schedule.html";
}

//get groupId of user
let sameGrId = database.ref('profiles/'+ userID + '/groupID');

//schedule on click of cell plus button
let addTimeslot = () => {

    let ref = firebase.database().ref('groups/' + constantGrId + '/schedule');
    ref.once("value")
      .then(function(snapshot) {
        var cellOne = snapshot.numChildren(); // should return 0, 1, or 2
      });

      if (cellOne === 0 || cellOne === 1) {
          ref.child(cell.id).push().set(userID);
      } else {
          alert('full cell, choose another loser');
      }

}