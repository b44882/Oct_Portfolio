
window.addEventListener("DOMContentLoaded", function(){
var randomNumber = 0;

//PLAYER: Image Generation + Selection
var plaImg = function(player){
	var img = document.getElementById("playerImg");
		img.setAttribute("src", "img/"+player+".png");
	battle(player);
}

//OPPONENT: Image Generation
var oppImg = function(opponent){
	var img = document.getElementById("opponentImg");
		img.setAttribute("src", "img/"+opponent+".png");
}

var ranNumGen = function(){
	randomNumber = Math.ceil(Math.random()*100);
	while (randomNumber == 100){
		randomNumber = Math.ceil(Math.random()*100);
	}
	return randomNumber
};

var result = function(ranNum){
	if (ranNum < 34){
	oppImg("rock");
	return "rock";
	}
	if (ranNum > 34 && ranNum < 67){
	oppImg("paper");
	return "paper";
	}
	if (ranNum > 67){
	oppImg("scissors");
	return "scissors";
	}
};

var battle = function(select){
	var player = select
	var opponent=result(ranNumGen());
	var win = "Player wins! " + player + " beats " + opponent + "!";
	var lose = "Opponent wins! " + opponent + " beats " + player + "!";
	var tie = "Tie! " + player + " ties with " + opponent + "!";
	var textBox = document.getElementById("result");
	var textContent = document.createElement("p");
	if (player == "rock"){
		if (opponent == "rock"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=tie;
		}
		if (opponent == "paper"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=lose;
		}
		if (opponent == "scissors"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=win;
		}
	};
	if (player == "paper"){
		if (opponent == "rock"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=win;
		}
		if (opponent == "paper"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=tie;
		}
		if (opponent == "scissors"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=lose;
		}
	};
	if (player == "scissors"){
		if (opponent == "rock"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=lose;
		}
		if (opponent == "paper"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=win;
		}
		if (opponent == "scissors"){
			textBox.insertBefore(textContent, textBox.firstChild);
			textContent.innerHTML=tie;
		}
	};
};
rock.addEventListener("click", function(){plaImg("rock")});
paper.addEventListener("click", function(){plaImg("paper")});
scissors.addEventListener("click", function(){plaImg("scissors")});
});





