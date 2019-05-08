const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//console.log(highScores);

const maxHighScores = 5;


finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", function() {
  saveScoreBtn.disabled = !username.value;
});


const saveHighScore = function(event) {
  //console.log("Clicked!");
  event.preventDefault();

  
  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);
  //console.log(highScores);
 
  highScores.sort(function(x, y) {
    return y.score - x.score;
  });
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  window.location.assign("/index.html");
};
