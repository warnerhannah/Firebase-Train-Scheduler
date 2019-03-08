var config = {
    apiKey: "AIzaSyC1m09X1tdhpTdmJt5DDiu-RoQqSb07S2o",
    authDomain: "cbc2019-d1813.firebaseapp.com",
    databaseURL: "https://cbc2019-d1813.firebaseio.com",
    projectId: "cbc2019-d1813",
    storageBucket: "cbc2019-d1813.appspot.com",
    messagingSenderId: "539021525066"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format("hh:mm");

var trainName;
var trainDestination;
var trainTime;
var trainFrequency;

var trainMinutes;



// add any current trains from firebase
database.ref().on("child_added", function (childSnapshot) {
    // if theres a value
    if (childSnapshot.val().trainName && childSnapshot.val().trainDestination && childSnapshot.val().trainTime && childSnapshot.val().trainFrequency) {
        // Set the variables for highBidder/highPrice equal to the stored values in firebase.
        trainName = childSnapshot.val().trainName;
        trainDestination = childSnapshot.val().trainDestination;
        trainTime = childSnapshot.val().trainTime;
        trainFrequency = childSnapshot.val().trainFrequency;
        // Change the HTML to reflect the stored values
        // create rows 
        var newRow = $("<tr>");

        var nameData = $("<td>");
        nameData.text(trainName);
        newRow.append(nameData);
        var destinationData = $("<td>");
        destinationData.text(trainDestination);
        newRow.append(destinationData);
        var frequencyData = $("<td>");
        frequencyData.text(trainFrequency);
        newRow.append(frequencyData);
        var timeData = $("<td>");
        timeData.text(arrivalTime(trainTime, trainFrequency));
        newRow.append(timeData);
        var nextTrain = $("<td>");
        nextTrain.text(minutesTo(trainTime, trainFrequency));
        newRow.append(nextTrain);

        $("tbody").append(newRow);
    }
});


// on submit
$("#submit").click(function () {
    // get info from boxes 
    // save to variables 
    name = $("#trainname").val().trim();
    destination = $("#traindestination").val().trim();
    time = $("#firsttraintime").val().trim();
    frequency = $("#trainfrequency").val().trim();

    // save variables to database
    database.ref().push({
        trainName: name,
        trainDestination: destination,
        trainTime: time,
        trainFrequency: frequency,
    });

    // display 
    // create to new row
    var newRow = $("<tr>");

    var nameData = $("<td>");
    nameData.text(name);
    newRow.append(nameData);
    var destinationData = $("<td>");
    destinationData.text(destination);
    newRow.append(destinationData);
    var frequencyData = $("<td>");
    frequencyData.text(frequency);
    newRow.append(frequencyData);
    var timeData = $("<td>");
    timeData.text(arrivalTime(time, frequency));
    newRow.append(timeData);
    var nextTrain = $("<td>");
    nextTrain.text(minutesTo(time, frequency));
    newRow.append(nextTrain);


    $("tbody").append(newRow);
});

function arrivalTime(firstTime, tFrequency) {
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder)
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    return (moment(nextTrain).format("hh:mm"));
}

function minutesTo(firstTime, tFrequency) {
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted)
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log(diffTime)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder)
    var tMinutesTillTrain = tFrequency - tRemainder;
    return tMinutesTillTrain;
};