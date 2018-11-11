var config = {
    apiKey: "AIzaSyCrRsqfv5smBtTMsy1ornMXHBu1WOMYRmw",
    authDomain: "train-scheduler-352c8.firebaseapp.com",
    databaseURL: "https://train-scheduler-352c8.firebaseio.com",
    projectId: "train-scheduler-352c8",
    storageBucket: "train-scheduler-352c8.appspot.com",
    messagingSenderId: "656759432919"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm");
    var trainFreq = $("#freq-input").val().trim();
  
   
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: firstTrain,
      frequency: trainFreq
    };
  
    database.ref().push(newTrain);
  
    alert("Train successfully added!");
    

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firsTrain-input").val("");
    $("#freq-input").val("");

  });


database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());


	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTrain = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);


	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));


	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
