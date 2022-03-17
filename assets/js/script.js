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
var clearFavoritesBtn = document.getElementById("clear-favorites-btn");

var mainDiv = document.getElementById("main-content");
var inputEl = document.querySelector("#actor-input");
var mainContainer = document.querySelector(".main-container");
var actorPicContainer = document.querySelector(".pic-container");

var formElement = document.querySelector(".form-container");
var favorites = document.getElementById("favorites");
var favoriteListEl = document.querySelector("#favorites-list");

var historyList = [];

/////////////////////////////////////////////////////////

// this function saves the current history list
var saveHistory = function() {
    localStorage.setItem("history", JSON.stringify(historyList));
}

var loadHistory = function() {
    storedHistoryList = JSON.parse(localStorage.getItem("history"))
    if (!storedHistoryList) {
        console.log("penis")
//        historyList = []
    } else {
        console.log("asshat")
        historyList = storedHistoryList    
        console.log(historyList)
    }
    return(historyList)
}

var createHistory = function(actorInput) {
    // have actorName become a favorite
    var newListItem = document.createElement("li")
    newListItem.classList.add("favorite-actor")
    newListItem.textContent = actorInput
    // this next line keeps pushing to the thing
    favorites.appendChild(newListItem);
    saveHistory();
}

// this remove doesn't work at the moment, needs to be addressed
var deleteHistory = function() {
    historyList = [];
    var allFavs = document.querySelectorAll(".favorite-actor");
    allFavs.forEach(function(actor) {
        remove(actor)
    })
    saveHistory();
}

// this creates a new history list from the items in storage
var createHistoryFromStorage = function() {
    if (!historyList) {
    } else {
        for (i = 0; i < historyList.length; i++) {
            createHistory(historyList[i])
        }

    }
}

// this should be edited to have both creation functions in there
var createNewElements = function () {

}

// this needs to be edited to work with every time 
var clear = function() {
    inputEl.value = "";
}

var clearButtonHandler = function (event) {
    event.preventDefault();
    clear();
}

var createActorData = function (actorName){
    var imdbUrl = "https://imdb-api.com/en/API/SearchName/k_01ly574i/" + actorName;
    // fetch IMDB
    fetch(imdbUrl).then(function(response) {
        response.json().then(function(data) {
            if (data.errorMessage === "") {
                console.log("success");
            } else {
                displayErrorModal();
            }

            // obtain IMDB Actor Id
            var actorId = data.results[0].id

            // search IMDB again for actor page
            var secondImdbUrl = "https://imdb-api.com/API/Name/k_01ly574i/" + actorId;

            fetch(secondImdbUrl).then(function(response) {
                 response.json().then(function(data) {

                    // obtain image, movies/shows the actor is known for
                    console.log(data);
                    console.log(data.image);
                    console.log(data.knownFor);

                    // create dynamic elements
                    var actorContainer = document.createElement("div");
                    var actorPic = document.createElement("img");

                    // src for picture comes from IMDB 

                    actorPic.src = data.image
                    actorPic.classList.add("inside-item")
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
            })
        })
    })

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

            if (result.length === 0) {
                displayErrorModal();
            }

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
    })
}

var displayErrorModal = function () {
    // When the user clicks on the button, open the modal
    mainDiv.classList.remove("has-background-dark");

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}



var buttonHandler = function (event) {
    // prevents browser refresh
    event.preventDefault();
    
    // takes user input and stores it in variable
    var actorName = inputEl.value.trim();
    historyList.push(actorName) 
    // gives mainDiv a class so background will appear
    mainDiv.classList.add("has-background-dark");
    clear();
    // if there is an actor element in place, remove it 
    createActorData(actorName);    
    createHistory(actorName);
}

/////////////////////////////////////////////////////////////////////////////

loadHistory();
createHistoryFromStorage();


// event listener runs buttonHandler function on submit btn
submitBtn.addEventListener("click", buttonHandler);

// function to clear screen data
/*clearFavorites(event) {
    event.preventDefault();

    mainDiv.textContent = "";

    inputEl.value = "";

    mainDiv.classList.remove("has-background-dark");

}*/

// event listener on clear button
clearBtn.addEventListener("click", clearButtonHandler);

// event listener for clear favorites button
clearFavoritesBtn.addEventListener("click" , deleteHistory());