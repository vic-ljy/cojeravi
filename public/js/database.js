
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

var allGroupIds = [];

//read from database allgroupids
database.ref('allGroups').on('value', (allGroupsData) => {
    allGroupIds = [];
    allGroupsData.forEach(function(groupIdItem) {
        //alert(groupIdItem.val());
        allGroupIds.push(groupIdItem.val());
    })
    //alert("allGroupIds is "+allGroupIds);
})

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
 // maybe delete newGroupId here

function createNewGroup() {
    //alert('check a');
    var trueId = newGroupId();

    var validate = (currentValue) => {
        if (currentValue === trueId) return true;
        else return false;
    }
    //var validate = (currentValue) => currentValue === trueId;

    //alert('lalalala');

    while (allGroupIds.every(validate)) {
        trueId = newGroupId();
    }
    //alert('check b');
    database.ref('allGroups').push().set(trueId);
    //alert('sandwich');
    database.ref('profiles/'+ userID + '/groupID').set(trueId);
    //alert('elastic');

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
function joinExistingGroup() {
    //associated to ID of field of entry of group code 'join'
    let trueId = document.getElementById('joinGroup').value;
    const validate = (currentValue) => currentValue === trueId;
    
    if(allGroupIds.every(validate)) {
        database.ref('profiles/'+ userID + '/groupID').set(trueId);
    } else {
        alert("enter a valid room code");
    }

    //colour random
    let profColour = arrColours[Math.floor(Math.random() * arrColours.length)];

    //enter group node
    database.ref('groups/' + trueId + '/members/' + userID).set({
        profColour
    });

    //redirect
    window.location.href = "schedule.html";
}


