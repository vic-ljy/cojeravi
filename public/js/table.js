// MAIN DATABASE STUFF
// defer
var database = firebase.database();
var rootRef = database.ref(); //the root node

//importing from database addTimeslot function
//import {addTimeslot} from 'js/database.js';

var schedTable = document.getElementById("schedule");
var schedHead = document.getElementById("schedHead");
var schedBody = document.getElementById("schedBody");

var d = new Date();
var month = d.getMonth();
var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var m = months[month];
var date = d.getDate();
var n = d.getDay();
var days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN', 'MON', 'TUES', 'WED'];

var userID;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        //alert("signed in; userID is " + userID);
    } else {
        //alert("not signed in");
        window.location.href = "logIn.html";
    }
})


for(var i = 0; i < 19; i++){
    var row = document.createElement("tr");
    row.id = ("rowId" + i.toString());

  for(var j = 0; j < 6; j++){
    // time slots
    if(j == 0 && i > 1 ){
        var timing = document.createElement("td");
        var timingText = document.createTextNode((i+5) + ":00 - " + (i+5) + ":50");
        timing.appendChild(timingText);
        timing.className = "timeSlot";

        row.appendChild(timing);
    } else {
        // first row with the days of the week
        if (i == 1 & j != 0) {
            var head = document.createElement("th");
            head.className = "days";
            var headText;

            if(j == 1){
              headText = document.createTextNode("TODAY");
              head.className = "today days";
            } else {
              headText = document.createTextNode(m + " " + (date+j-1));
            }
            head.appendChild(headText);

            head.id = ("head" + j.toString());

            row.appendChild(head);
        } else if (i == 0 & j!= 0){
            var week = document.createElement("th");
            week.className = "week";
            var weekText;

            weekText = document.createTextNode(days[n + j- 1]);
            week.appendChild(weekText);

            weekid = ("week" + j.toString());

            row.appendChild(week);
        } else if(j!=0){
        //All other columns (except time column)
            var cell = document.createElement("td");

            cell.className = "slotCell";

            if(j == 1){
              cell.className = "slotCell slotToday";
              cell.style.borderLeft = "6px solid #bdf29d";
              if(i == 18){
                cell.className = "slotCell slotToday slotLast";
              }
            }

            var hour = String(i+5);
             
            if (hour.length == 1) hour = "0" + hour; // I dunno if this works it should tho
        
            cell.id = ("day" + j + "hr" + hour); //i = 1 is at 7am; eg. day1hr12

            //TODO format 7am to 07
            

            var addUser = document.createElement("button");
            addUser.className = "addUserBtn";
            addUser.id = cell.id;

            addUser.onclick = function(){
              joinSession(this.id);
              alert(this.id);
            }
            
            cell.className="slotEmpty";

            if (i == 1) {
              cell.className = "slotEmpty beforeTime";
            } 
            row.appendChild(cell);
        }
    }

  }
    if(i == 0 || i == 1){
      schedHead.appendChild(row);
    } else {
      schedBody.appendChild(row);
    }
}
