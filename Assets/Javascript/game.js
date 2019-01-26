$(document).ready(function() {

    // The number we will manipulate by clicking crystals. Our "current guess" number.
    var crystalNumber = 0;
  
    // Generates the random "target number" we will try to reach.
    var targetNumber = randomNumGen();
  
    // Starting Variables.
    var wins = 0;
    var losses = 0;
    var crystals;
  
    // Function that generates random values for our crystals and returns our crystals object.
    function randomNumCrystals() {
      // Crystals object.
      return {
        red: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/redcrystal.png"
        },
        blue: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/bluecrystal.png"
        },
        yellow: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/yellowcrystal.png"
        },
        green: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/greencrystal.png"
        }
      };
    }
  
    // Function to create a random number between 19 and 120.
    function randomNumGen() {
      return Math.floor(Math.random() * 102) + 19;
    }
  
    // Function that start/resets the game.
    function startGame() {
      
      crystalNumber = 0;
      // Generate random crystal values.
      crystals = randomNumCrystals();
      // Generate a random target number and render it to the page.
      targetNumber = randomNumGen();
      $("#targetNum-area").text(targetNumber);
    }
  
    // Function that handles updating the page.
    function updateDom(result) {
      $("#winloss-area").empty();
  
      // If the user won...
      if (result === true) {
        // Show victory message, restart the game, and render the new "current guess" number.
        $("#winloss-area").append($("<p>").text("You won!!"));
        startGame();
        renderMatchingNumber();
      }
      // If the user lost...
      else if (result === false) {
        // Show defeat message, restart the game, and render the new "current guess" number.
        $("#winloss-area").append($("<p>").text("You lost!!"));
        startGame();
        renderMatchingNumber();
      }
  
      // Building our win/loss display and appending it to the page.
      var winSpan = $("<span>").text(wins);
      var lossSpan = $("<span>").text(losses);
  
      var pWins = $("<p>").text("Wins: ");
      var pLosses = $("<p>").text("Losses: ");
  
      pWins.append(winSpan);
      pLosses.append(lossSpan);
  
      $("#winloss-area").append(pWins);
      $("#winloss-area").append(pLosses);
    }
  
    // Function to render our crystals to the page.
    function renderCrystals() {
      for (var key in crystals) {
        var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
        var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
        crystalDiv.append(crystalImg);
        $("#crystal-area").append(crystalDiv);
      }
    }
  
    // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
    function updateMatchingNumber(crystal) {
      // Update our "current guess" number based on which crystal was clicked.
      crystalNumber += crystals[crystal.attr("data-name")].points;
    }
  
    // Function that will render your "current guess" number to the page.
    function renderMatchingNumber() {
      var scoreNumDiv = $("<div id='score-number'>").text(crystalNumber);
      $("#score-area").html();
      $("#score-area").html(scoreNumDiv);
    }
  
    // Call our functions to start the game!
    startGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();
  
    // Here we create an on.click event for the crystals.
    $(".crystals-button").on("click", function(event) {
      // Update our "current guess" number and re-render it.
      updateMatchingNumber($(this));
      renderMatchingNumber();
  
      // Check to see if we have won or lost.
      // If our current guess number equals the target number..
      if (crystalNumber === targetNumber) {
        // Increment wins, restart the game, and update the page.
        wins++;
        startGame();
        updateDom(true);
      }
      // If our guess number exceeded our target number...
      else if (crystalNumber > targetNumber) {
        // Increment losses, restart the game, and update the page.
        losses++;
        startGame();
        updateDom(false);
      }
    });
  
  });
  