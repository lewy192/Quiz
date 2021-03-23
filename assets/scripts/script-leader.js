function compareScore(a, b){
    var score1 = a.score;
    var score2 = b.score;

    var comparison = 0;
    if (score1 < score2){
        comparison = 1;
    
    }else if (score1 > score2){
        comparison =-1
    }
    return comparison;
}




function organiseLeaderboardScores(){
    var leaderScores = JSON.parse(localStorage.getItem('usersLeaderBoard'))
    leaderScores.sort(compareScore)
    if(leaderScores.length > 5){
        for(var i = 0; i < 5;i++){
        var leaderSpot = document.querySelector(`.leader-spot${i}`)
        var playerScore = document.querySelector(`.player-score${i}`)
        leaderSpot.textContent+= `${leaderScores[i].name} at ${leaderScores[i].score} Points.`
    }}else if(leaderScores.length > 0 && leaderScores.length < 5){
        for (var i = 0; i < leaderScores.length;i++){
            var leaderSpot = document.querySelector(`.leader-spot${i}`)
            var playerScore = document.querySelector(`.player-score${i}`)
            leaderSpot.textContent+= `${leaderScores[i].name} at ${leaderScores[i].score} Points.`
        }
    }else{
        
        var leaderContainter =document.querySelector('.leader-container').children
        Array.from(leaderContainter).forEach(child => child.style.display = 'none')
    }
    
}

organiseLeaderboardScores();