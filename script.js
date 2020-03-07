
// $(".enter").on("click", function (event) {
//     event.preventDefault();
//     var player = $("#textarea1").val().trim();
    
//     console.log("https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%22snippet%22%2C%22maxResults%22%3A1%2C%22q%22%3A%22Steph%20Curry%20Highlights%22%7D");
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log("Got reponse:" + response);
//     });
// });

// $(".enter").on("click", function () {
//     event.preventDefault();
// authenticate().then(loadClient)
// execute()
// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("YOUR_API_KEY");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.search.list({
//       "part": "snippet",
//       "maxResults": 1,
//       "q": "Steph Curry Highlights"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });
// });

// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("AIzaSyCOnD4dHdP6XdWBdbY6e3JAvWN84bJG7T4");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.search.list({
//       "part": "snippet",
//       "maxResults": 1,
//       "q": "Steph Curry Highlights"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "168910596445-sd2jatdfri0kr63pkuqtaqshjtrm33k5.apps.googleusercontent.com"});
//   });
var data = {"atlanta": 1, "boston": 2, "brooklyn": 3, "charlotte": 4, "chicago": 5, "cleveland": 6, "dallas": 7, "denver": 8, "detroit": 9, "golden state": 10, "houston":11, "indiana": 12, "la": 13, "los angeles": 14, "memphis": 15, "miami": 16, "milwaukee": 17, "minnesota": 18, "new orleans": 19, "new york": 20, "oklahoma city": 21, "orlando": 22, "philadelphia": 23, "phoenix": 24, "portland": 25, "sacramento": 26, "san antonio": 27, "toronto": 28, "utah": 29, "washington": 30};


$(".enter").on("click", function (event) {
      event.preventDefault();
      var team = $("#textarea1").val().trim();
      $("h1").text("")

      var settings = {
        "url": "https://www.balldontlie.io/api/v1/teams/"+ data[team.toLowerCase()],
        "method": "GET",
        "timeout": 0,
      };
        //first ajax call
        $.ajax(settings).done(function (response) {
        $(".teamName").text(response.full_name);
        // var x = Math.floor(Math.random()*4)

      console.log(team);
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rQLAu0nfEnZbuhYVAVBwo4O6Rv3Ydn1c&q="+response.full_name+"&limit=1&offset=0&rating=G&lang=en"
      console.log(response.full_name);
      console.log(response);
      
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response2) {
          console.log(response2.data[0].url);
          console.log(response2);
        //   $(".video").text(response.data[0].url);
          $("iframe").attr("src", response2.data[0].embed_url);
          $("#giphylink2").attr("href", response2.data[0].url);
      
      }).catch(function(err) {
        console.log(err)
        $("iframe").attr("src", "");
        $("#giphylink2").attr("href", "");
      })
    
    // else{
    //       $("iframe").attr("src", "");
    //       $("#giphylink2").attr("href", "");
    // }
    

      //   var settings = {
      //   "url": "https://www.balldontlie.io/api/v1/teams/"+ data[team.toLowerCase()],
      //   "method": "GET",
      //   "timeout": 0,
      // };
      //   //first ajax call
      //   $.ajax(settings).done(function (response) {
      //   $(".teamName").text(response.full_name);
        // console.log($(".teamName").text(response.full_name))
        // if ($(".teamName").text()===null){
        //   $("iframe").attr("src", "");
        //   $("#giphylink2").attr("href", "");
        // }
      }).catch(function(err) {
        console.log(err)
        $("iframe").attr("src", "");
        $("#giphylink2").attr("href", "");
      })
      // if ($(".teamName").text()===null){
      //   $("iframe").attr("src", "");
      //   $("#giphylink2").attr("href", "");
      // }
    });
        // Basketball API stats call from mySportsFeed
    //   $.ajax({
    //     type: "GET",
    //     url: "https://api.mysportsfeeds.com/v2.1/pull/nba/current/player_stats_totals.json",
    //     dataType: 'json',
    //     async: false,
    //     headers: {
    //       "Authorization": "Basic " + btoa("2dee32d7-5f8d-4bae-9272-ed5518" + ":" + "MYSPORTSFEEDS")
    //     },
    //     data: '{ "comment" }',
    //     success: function (){
    //       alert('Thanks for your comment!'); 
    //     }
    //   });
    //   console.log(playerStatsTotals);
  
