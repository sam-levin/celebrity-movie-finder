// script file to see fetch for yelp

// imdb API key
var key = "k_01ly574i"

// url to API Ninjas Celebrity API
var ninjasUrl = "https://api.api-ninjas.com/v1/celebrity?name="

// Celebrity API key
var ninjasKey = "EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY"

// targeting some html elements
var submitBtn = document.getElementById("submit-btn");
var clearBtn = document.getElementById("clear-btn");

// we dont want background color to show up until search 
// will add class later
var mainDiv = document.getElementById("main-content");
var inputEl = document.querySelector("#actor-input");
var mainContainer = document.querySelector(".main-container");
var actorPicContainer = document.querySelector(".pic-container");

// function to search user input for data from both APIs

var clear = function() {
    console.log("clearfunction ran")
    inputEl.value = "";
    mainDiv.textContent = "";
}

var clearButtonHandler = function (event) {

    event.preventDefault();
    clear();
    

}

var buttonHandler = function (event) {

    // prevents browser refresh
    event.preventDefault();

    // takes user input and stores it in variable
    
    var actorName = inputEl.value.trim();

    // gives mainDiv a class so background will appear
    mainDiv.classList.add("has-background-dark");

    // url to IMDB API with user search
    var url = "https://imdb-api.com/en/API/SearchName/k_01ly574i/" + actorName;

    // have actorName become a favorite
    var favorites = document.getElementById("favorites");
    var favoriteAdd = document.querySelector(".favorites");
    favoriteAdd.textContent = inputEl.value.trim();
    favoriteAdd.classList.add("has-text-light", "is-size-5");
    favorites.appendChild(favoriteAdd);

    // fetch IMDB

    fetch(url).then(function(response) {

        console.log(response)

        response.json().then(function(data) {
            
            // obtain IMDB Actor Id

            var actorId = data.results[0].id

            // search IMDB again for actor page

            var secondUrl = "https://imdb-api.com/API/Name/k_01ly574i/" + actorId;

            fetch(secondUrl).then(function(response) {

                response.json().then(function(data) {

                    // obtain image, movies/shows the actor is known for

                    

                    // create dynamic elements

                    var actorContainer = document.createElement("div");

                    var actorPic = document.createElement("img");

                    // src for picture comes from IMDB 

                    actorPic.src = data.image

                    var actorMovieContainer = document.createElement("div");

                    var actorAwardsContainer = document.createElement("div");

                    var actorSummaryContainer = document.createElement("div");
                    
                    // movie titles from IMDB
                    
                    var knownFor1 = data.knownFor[0].fullTitle;

                    var knownFor2 = data.knownFor[1].fullTitle;

                    var knownFor3 = data.knownFor[2].fullTitle;

                    var knownFor4 = data.knownFor[3].fullTitle;

                    var awards = data.awards;

                    //var summary = data.summary;
                    

                    actorMovieContainer.textContent = "This actor is known for : " +
                    
                    knownFor1 + ", " + knownFor2 + ", " + knownFor3 + ", " + knownFor4 + ".";

                    actorAwardsContainer.textContent = "Awards : " + awards;

                    //actorSummaryContainer.textContent = "Summary: " + summary;

                    // add class for styling 

                    actorMovieContainer.classList.add("is-size-3");

                    actorAwardsContainer.classList.add("is-size-3");

                    //actorSummaryContainer.classList.add("is-size-3");

                    // append elements

                    actorPicContainer.appendChild(actorPic);

                    actorContainer.appendChild(actorAwardsContainer);

                    actorContainer.appendChild(actorMovieContainer);

                    // actorContainer.appendChild(actorSummaryContainer);

                    mainContainer.appendChild(actorContainer);

                })

            });

        })

        


    });

    // fetching Celebrity API

    $.ajax({

        method: 'GET',

        // search Celebrity API with user input

        url: 'https://api.api-ninjas.com/v1/celebrity?name=' + actorName,

        // our Celebrity API key in header request for authorization

        headers: { 'X-Api-Key': 'EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY'},

        contentType: 'application/json',

        success: function(result) {

            // obtain facts about actor from Celebrity API

            console.log(result);

            var actorInfoContainer = document.createElement("div");

            var actorName = document.createElement("p");

            var actorAge = document.createElement("p");

            var actorBirthday = document.createElement("p");

            var actorNationality = document.createElement("p");

            var actorHeight = document.createElement("p");

            var name = result[0].name.toUpperCase();
            
            var age = result[0].age;

            var birthday = result[0].birthdy;

            var nationality = result[0].nationality.toUpperCase();

            var height = result[0].height;


            // we display actor's name, age, birthday, nationality

            actorName.textContent = "Name : " + name;

            // update class for stling

            actorName.classList.add("is-size-2");

            actorAge.textContent = "Age : " + age;

            actorAge.classList.add("is-size-3");

            actorBirthday.textContent = "Birthday : " + birthday;

            actorBirthday.classList.add("is-size-3");

            actorNationality.textContent = "Nationality : " + nationality;

            actorNationality.classList.add("is-size-3");

            actorHeight.textContent = "Height : " + height + " meters";

            actorHeight.classList.add("is-size-3");

            actorInfoContainer.appendChild(actorName);

            actorInfoContainer.appendChild(actorAge);

            actorInfoContainer.appendChild(actorBirthday);

            actorInfoContainer.appendChild(actorNationality);

            actorInfoContainer.appendChild(actorHeight);

            mainContainer.appendChild(actorInfoContainer);

        },

        error: function ajaxError(jqXHR) {

            console.error('Error: ', jqXHR.responseText);
        }

    }); 

    
}

/////////////////////////////////////////////////////////////////////////////

// function to clear screen data




// event listener runs buttonHandler function on submit btn

submitBtn.addEventListener("click", buttonHandler);

// event listener on clear button

clearBtn.addEventListener("click", clearButtonHandler);