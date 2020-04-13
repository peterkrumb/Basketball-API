$("#select-player").on("click", function (event) {
  event.preventDefault();

  var playerName = $(".input").val();
  var settings = {
    url:
      "https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/players?search=" +
      playerName,
    method: "GET",
    timeout: 0,
  };

  //first ajax call
  $.ajax(settings).done(function (response) {
    console.log(response.data[0]);
    var playerID = response.data[0].id;
    var playerFull =
      response.data[0].first_name + " " + response.data[0].last_name;
    console.log(playerFull);
    console.log(playerID);

    var settings2 = {
      url:
        "https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=" +
        playerID,
      method: "GET",
      timeout: 0,
    };
    $.ajax(settings2).done(function (response2) {
      console.log(response2);
      console.log(response2.data[0].dreb);
      $(".card-title").html(
        response.data[0].first_name +
          " " +
          response.data[0].last_name +
          " " +
          "2019-2020 Season Averages"
      );
      $(".player-vitals").html(
        "Position: " +
          response.data[0].position +
          " | " +
          "Team: " +
          response.data[0].team.abbreviation
      );
      var res = response2.data[0];
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
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=rQLAu0nfEnZbuhYVAVBwo4O6Rv3Ydn1c&q=" +
      playerFull +
      "&limit=1&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.data[0].url);
      console.log(response);
      //   $(".video").text(response.data[0].url);
      $("iframe").attr("src", response.data[0].embed_url);
      $("#giphylink2").attr("href", response.data[0].url);
    });
  });
});

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const fetchData = async (searchTerm) => {
  var playerName = $(".input").val();
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/players?per_page=100&search=" +
      playerName,
    {
      params: {
        playerName: searchTerm,
      },
    }
  );

  if (response.data.Error) {
    return [];
  }
  return response.data.data;
};
const root = document.querySelector(".autocomplete");
root.innerHTML = `
<input class="input" placeholder="SEARCH FOR a player e.g. LeBron James" type="text"/>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
  </div>
</div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");
const dropdownItem = document.querySelector(".dropdown-item");

const onInput = async (event) => {
  var playerName = $(".input").val();
  event.preventDefault();
  const players = await fetchData(event.target.value);
  console.log(players.length);

  // if (playerName.length < 3) {
  //   dropdown.classList.remove("is-active");
  //   return;
  // }

  resultsWrapper.innerHTML = "";
  if (playerName.length >= 3 && players.length !== 0) {
    dropdown.classList.add("is-active");
    for (let player of players) {
      console.log(player);
      const option = document.createElement("a");
      if (player.id <= 493 || player.id >= 666604) {
        option.classList.add("dropdown-item");
        option.innerHTML = `${player.first_name} ${player.last_name} - ${player.team.abbreviation}`;
        option.addEventListener("click", () => {
          dropdown.classList.remove("is-active");
          input.value = player.first_name + " " + player.last_name;
        });

        resultsWrapper.appendChild(option);
      }
    }
  }
  if (players.length === 0) {
    dropdown.classList.remove("is-active");
  }
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
