$("#select-player").on("click", function(event) {
  event.preventDefault();
  var playerName = $("#player-input").val();
  var settings = {
  "url": "https://balldontlie.io/api/v1/players?search=" + playerName,
  "method": "GET",
  "timeout": 0,};

  //first ajax call
  $.ajax(settings).done(function (response) {
  console.log(response.data[0]);
  var playerID = (response.data[0].id);
  var playerCity = (response.data[0].first_name + " " + response.data[0].last_name) + " dunk";
  console.log(playerCity);
  console.log(playerID);
  

  var settings2 = {
    "url": "https://balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=" + playerID,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings2).done(function (response2) {
    console.log(response2);
    console.log(response2.data[0].dreb)
    $(".card-title").html(response.data[0].first_name + " " + response.data[0].last_name + " " + "2019-2020 Season Averages")
    $(".player-vitals").html("Position: " + response.data[0].position + " | " + "Team: " + response.data[0].team.abbreviation)
    var res = response2.data[0]
    $("#GP").html(res.games_played);
    $("#MIN").html(res.min);
    $("#fgm").html(res.fgm);
    $("#fga").html(res.fga);
    $("#fg").html(res.fg_pct);
    $("#fg3m").html(res.fg3m);
    $("#fg3a").html(res.fg3a);
    $("#fg3pct").html(res.fg3_pct);
    $("#ftm").html(res.ftm);
    $("#fta").html(res.fta);
    $("#ftpct").html(res.ft_pct);
    $("#oreb").html(res.oreb);
    $("#dreb").html(res.dreb);
    $("#reb").html(res.reb);
    $("#ast").html(res.ast);
    $("#stl").html(res.stl);
    $("#blk").html(res.blk);
    $("#turnover").html(res.turnover);
    $("#pf").html(res.pf);
    $("#pts").html(res.pts);
});
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rQLAu0nfEnZbuhYVAVBwo4O6Rv3Ydn1c&q="+playerCity+"&limit=1&offset=0&rating=G&lang=en"

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
          console.log(response.data[0].url);
          console.log(response);
        //   $(".video").text(response.data[0].url);
          $("iframe").attr("src", response.data[0].embed_url);
          $("#giphylink2").attr("href", response.data[0].url);
      });

  

  });

  
  

});