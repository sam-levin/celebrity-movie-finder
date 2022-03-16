// script file to see fetch for imdb, celebrity api


// variable declarations

var key = "k_01ly574i"

var ninjasUrl = "https://api.api-ninjas.com/v1/celebrity?name="

var ninjasKey = "EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY"

var submitBtn = document.getElementById("submit-btn");

var inputEl = document.querySelector("#actor-input");

var mainContainer = document.querySelector(".main-container");

var actorPicContainer = document.querySelector(".pic-container");

// buttonHandler function


var buttonHandler = function (event) {


    // prevent page refresh

    event.preventDefault();
    
    var actorName = inputEl.value.trim();

    // dynamic search based on user input

    var url = "https://imdb-api.com/en/API/SearchName/k_01ly574i/" + actorName;

    fetch(url).then(function(response) {

        response.json().then(function(data) {

            console.log(data);

            console.log(data.results[0].id);

            var actorId = data.results[0].id

            // now searching imdb with newly acquired actor id

            var secondUrl = "https://imdb-api.com/API/Name/k_01ly574i/" + actorId;

            fetch(secondUrl).then(function(response) {

                response.json().then(function(data) {

                    // we obtain info about the movies they're known for, and an image

                    console.log(data);

                    console.log(data.image);

                    console.log(data.knownFor);
                
                })

            });
        })
    });

    // fetching celebrity API data with user input

    $.ajax({

        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/celebrity?name=' + actorName,
        headers: { 'X-Api-Key': 'EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY'},
        contentType: 'application/json',

        // succesful request will console log data we want

        success: function(result) {

            console.log(result);


        },
        error: function ajaxError(jqXHR) {

            console.error('Error: ', jqXHR.responseText);
        }
    }); 
    
}

// an event listener for our submit button

submitBtn.addEventListener("click", buttonHandler);