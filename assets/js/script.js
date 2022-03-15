// script file to see fetch for imdb, celebrity api

var IMDBurl = "https://imdb-api.com/en/API/FullCast/k_c2a3w0b6/tt1375666"

var key = "k_c2a3w0b6"

var ninjasUrl = "https://api.api-ninjas.com/v1/celebrity?name=LeonardoDiCaprio"

var ninjasKey = "EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY"

var mainEl = $("#main-content")

var actorName = $("#actor-name").val();

var testActorName = 'Leonardo DiCaprio'

var printActorDetails = function(actorName, actorData){
    var actorNameEl = $("<h5>").text(actorName)
    var actorHeightEl = $("<h5>").text("Height:" + actorData[0].height + " meters ")
    var actorAgeEl = $("<h5>").text("Age: " + actorData[0].age + " years old")
    mainEl.append(actorNameEl, actorHeightEl, actorAgeEl)
}

fetch(IMDBurl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
    })
});

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/celebrity?name=' + testActorName,
    headers: { 'X-Api-Key': 'EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        printActorDetails(testActorName, result)
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


// This code isnt working atm
/*$("#actor-form-input").on("click", "button",function(event){
    event.preventDefault();
    var inputActor = $("#actor-name").val()
    $("#actor-name").val("")
    if (inputActor == "") {
        window.alert("Please type in a city name or choose from one of your past searches")
    } else {
        console.log(inputActor)
    }
}) */