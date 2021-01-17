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
        userID = user.uid;

        //retrieving groupID
        database.ref('profiles/' + userID + "/groupID").once('value').then(function(snapshot) {
            roomID = snapshot.val();
            console.log('roomID retrieved'); //first
            //code here runs after code outside .once()
            //displaying group ID on the schedule
            document.getElementById("gc").innerHTML = roomID.toUpperCase();
        });
        //code here runs before code in .once()
    } else {
        alert("not signed in");
    }
})

   
setTimeout(function() {
    console.log('success');//second
    /*/##############
    function nameFromUserId(id) {
        database.ref('profiles/'+id+'/name').once('value').then(function(snapshot) {
            return snapshot.val();
        });
    }*/

    //members list
    database.ref('groups/'+roomID+'/members').on('value', (membersData) => {
        document.getElementById('membersBox').innerHTML = '';
        membersData.forEach(function(memberInfo) {
            
            //member.key = uid
            //member.val() = colour
            //console.log(memberInfo.key + " " + memberInfo.val());
            var member = document.createElement("p");
            database.ref('profiles/'+memberInfo.key+'/name').once('value').then(function(snapshot) {
                var memberName = document.createTextNode(snapshot.val());
                member.appendChild(memberName);
                member.style.color = memberInfo.val();
                document.getElementById("membersBox").appendChild(member);
            });
        });
    });

    //format database cells
    database.ref('groups/'+roomID+'/schedule').on('value', (scheduleData) => {

        

        var allBtn = [];
        //hopefully this works lol
        for (var i = 7; i <= 23; i++) {
            for (var j = 1; j <= 5; j++) {
                var add = "";
                if (i < 10) add = "0";
                allBtn.push('bday' + j + 'hr' + add + i);
            }
        }

        allBtn[i].className = "addUserBtn";
            
        scheduleData.forEach(function(timeslotX) {
            var d = parseInt(timeslotX[2] + timeslotX[3]);
            var h = parseInt(timeslotX[0] + timeslotX[1]);
            var newDate = new Date();
            var todayDate = newDate.getDate();
            var relativeDayX = d - todayDate + 1; //1 = today
            let timeslotXKey = 'bday'+relativeDayX+'hr'+h;
            allBtn.splice(allBtn.indexOf(timeslotXKey),1);
        });

        for (var i = 0; i < allBtn.length; i++) {
            document.getElementById(allBtn[i]).className = "addUserBtn"; 
            document.getElementById('m1' + allBtn[i]).className = "noneUser";
            /*document.getElementById(allBtn[i]).onclick = function() {

                document.getElementById("member1").style.opacity = "1";
                document.getElementById("member1").style.zIndex = "1";
            };*/
        }
        console.log('ayayayay ' + i);
        
        scheduleData.forEach(function(timeslot) {
            sessionDetails = [];
            let time = timeslot.key; //session time — use to get id of cell
            var dd = parseInt(time[2] + time[3]);
            var mm = parseInt(time[4] + time[5]);
            var yy = parseInt(time[6] + time[7]);
            var currentDate = new Date();
            nowDate = currentDate.getDate();
            nowMonth = currentDate.getMonth();
            nowYear = currentDate.getFullYear();
            //change this for future
            if ((yy == (nowYear-2000)) && (mm == (nowMonth+1)) && (dd >= nowDate && dd <= nowDate + 4)) {
                var hh = parseInt(time[0] + time[1]);
                let memberIDs = []; //list of ids
                let memberList = []; //2D array incl. colour
                timeslot.forEach(function(member) {
                    memberIDs.push(member.val());
                });
                //memberList is array of member ids
                database.ref('groups/'+roomID+'/members').once('value').then(function(membersData) {//membersData = data from database
                    membersData.forEach(function(member) {
                        let memberInfo = [];
                        if (memberIDs.includes(member.key)) {
                            memberInfo.push(member.key);
                            memberInfo.push(member.val());
                            memberList.push(memberInfo);
                        }
                    });
                    console.log('memberList: '+memberList); //[[m1ID, m1COL],[m2ID, m2COL]]
                    console.log('time: '+time); //hhddmmyy

                    //FOR JENNA POOPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                    var relativeDay = dd - nowDate + 1; //1 = today
                    var timeslotId = 'day'+relativeDay+'hr'+hh; 
                    console.log(timeslotId);
                    var cell = document.getElementById(timeslotId);
                    
                    
                    //var index = allCells.indexOf(timeslotId); //initialized
                    //allCells.splice(index, 1);
                    //"day" + j.toString() + "hr" + hour

                    
                    //given time is within the next 5 days: 
                    //get element by id to identify the cell that the time (in this run of the loop) corresponds to
                        //eg. if time is today at 7, then get the element that contains the buttons/icons for today at 7
                    //format that cell accordingly

                    //? userID = id of current signed in user
                    //? function to get name from user ID: nameFromUserId(id)

                    database.ref('profiles').once('value').then(function(snapshot) {
                        //memberlist undefined ERRORR ERRORR (((((((((((())))))))))))
                        console.log('memberList: '+memberList);
                        var name1 = snapshot.child(memberList[0][0]+'/name').val();
                        var name1_letter = name1[0].toUpperCase();
                        var m1 = document.getElementById("m1b" + timeslotId);

                        if (memberList.length == 2) {
                            //two members
                            var name2 = snapshot.child(memberList[1][0]+'/name').val();
                            var name2_letter = name2[0].toUpperCase();
                            var m2 = document.getElementById("m2b" + timeslotId);
                        }

                        if (memberList.length == 1) {
                            if (userID == memberList[0][0]) {
                                m1.className = "schedUnpairedUser";
                            } else {
                                m1.className = "schedUnpaired";
                            }
                            m1.style.backgroundColor = memberList[0][1];
                            m1.innerHTML = name1_letter;
                            //lighten? ----
                        } else if (memberList.length == 2) {
                            if (userID == memberList[0][0]) {
                                m1.className = "schedPairedUser";
                                m2.className = "schedPaired";
                            } else if (userID == memberList[1][0]) { 
                                m1.className = "schedPaired";
                                m2.className = "schedPairedUser";
                            } else {
                                m1.className = "schedPaired";
                                m2.className = "schedPaired";
                            }
                            m1.style.backgroundColor = memberList[0][1];
                            m2.style.backgroundColor = memberList[1][1];
                            m1.innerHTML = name1_letter;
                            m2.innerHTML = name2_letter;
                            cell.style.backgroundColor = '#292d30';
                        } else {
                            console.log("error: invalid number of members");
                        }
                        console.log('while complete');
                    });
                });
            }
        });
        /*
        for (var a = 0; a < allCells.length; a++) {
            document.getElementById('b' + allCells[a]).className = "addUserBtn";
        }
        console.log("Amount empty " + a);
        */
    });
}, 3000)



function twoDigits(input) {
    if (input<10 && input>=0) {
        return "0" + String(input);
    } else {return input}
}

//if extra time: revise this for exceptions
//.ON TO READ DATABASE AND WRITE DATABASE
function joinSession(cellIdentity) {
    //get the current day number eg. sunday
    let tOday = new Date();
    let dAte = tOday.getDate();
    let mOnth = tOday.getMonth() + 1;
    let yEar = tOday.getFullYear() - 2000;

    //New: 'b' + cell.id; --> move index by one
    
    //get the day number and add
    let dayRel = parseInt(cellIdentity[4]);
    let scheduledDay = dAte + dayRel - 1;
    //get hour
    let hourN = parseInt(cellIdentity[8] + cellIdentity[9]);
    
    
    //concat
    let timeslotId = (`${twoDigits(hourN)}${twoDigits(scheduledDay)}${twoDigits(mOnth)}${yEar}`);
    database.ref('groups/' + roomID + '/schedule/' + timeslotId).push().set(userID);
}

//cell.id = ("day" + j + "hr" + hour); //i = 1 is at 7am; eg. bday01hr12



//displaying members






