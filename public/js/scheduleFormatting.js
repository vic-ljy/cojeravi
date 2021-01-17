/*
-----READING DATABASE AND FORMATTING TIMETABLE------
-> .on('value' blah blah blah thingy)
    -> forEach timeslot under groups/groupID/schedule:
        -> get the timeslot (.key) and members (another forEach)
            -> get the colours of the members 

- retrieve groupID value from 'profiles' (for path)
*/
//retrieving userID
var userID, roomID;
var sessionDetails = [];
//retrieving groupID
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //alert("signed in; userID is " + userID);
        userId = user.uid;

        //retrieving groupID
        database.ref('profiles/' + userId + "/groupID").once('value').then(function(snapshot) {
            roomID = snapshot.val();
            console.log('roomID retrieved');
            //code here runs after code outside .once()

        });
        //code here runs before code in .once()
    } else {
        alert("not signed in");
    }
})


setTimeout(function(){
    console.log('success');
    database.ref('groups/'+roomID+'/schedule').on('value', (scheduleData) => {
        
        scheduleData.forEach(function(timeslot) {
            sessionDetails = [];
            let time = timeslot.key; //session time — use to get id of cell
            let memberList = [];
            timeslot.forEach(function(member) {
                memberList.push(member.val());
                console.log('member pushed');
            })
            //memberList is array of member ids
            for (memberID of memberList) {
                let memberInfo = [memberID];
                database.ref('groups/'+roomID+'/members/'+memberID).once('value').then(function(snapshot) {
                    memberInfo.push(snapshot.val());
                    console.log('memberInfo: '+memberInfo);
                });
            }
            console.log('hi');
        });
    });
}, 2000);


//.ON TO READ DATABASE AND WRITE DATABASE
function joinSession(cellidentity) {
    //ref
    database.ref('groups/' + roomID + '/schedule/' + cellidentity).push().set()
}

cell.id = ("day" + j + "hr" + hour); //i = 1 is at 7am; eg. day1hr12
//

firebase.database.now();