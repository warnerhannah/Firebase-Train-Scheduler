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

database.ref().on("value", function(snapshot){

});


database.ref().set({

});