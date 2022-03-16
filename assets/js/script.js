// script file to see fetch for imdb, celebrity api


// variable declarations

var key = "k_01ly574i";

var ninjasUrl = "https://api.api-ninjas.com/v1/celebrity?name=LeonardoDiCaprio";

var ninjasKey = "EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY";

var url = "https://imdb-api.com/en/API/SearchName/k_01ly574i/LeonardoDiCaprio";

// imdb API fetch

fetch(url).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
        console.log(data.results[0].id);
        var actorId = data.results[0].id
        var secondUrl = "https://imdb-api.com/API/Name/k_01ly574i/LeonardoDiCaprio";
        fetch(secondUrl).then(function(response) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data.image);
                console.log(data.knownFor);
            })
        });
    })
})


// celebrity API fetch 

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/celebrity?name=LeonardoCiCaprio',
    headers: { 'X-Api-Key': 'EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);

    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
}); 