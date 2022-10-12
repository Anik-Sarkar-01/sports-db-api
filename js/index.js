const loadPlayers = search  => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`)
        .then(res => res.json())
        .then(data => displayPlayers(data.player[0]))
}

const displayPlayers = players => {
    console.log(players);
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = ``;
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = ``;
    // console.log(playersContainer);
    const playersDiv = document.createElement('div');
    playersDiv.classList.add('card');
    playersDiv.innerHTML = `
    <img src="${players.strBanner ? players.strBanner : console.log("not found")}" class="card-img-top" alt="">
    <div class="card-body">
        <h5 class="card-title" style="text-align: center;">${players.strPlayer}</h5>
        <div style="display: flex; padding: 30px; justify-content:space-around"  >
            <img src="${players.strCutout}" style="width: 45%;" class="card-img" alt="">
            <img src="${players.strFanart2}" style="width: 50%;" class="card-img" alt="">
        </div>
        <p class="card-text" style="text-align: center;">${players.strDescriptionEN.slice(0,250)}</p>
        <div style="display: flex; justify-content:center">
            <a href="#" onclick="loadPlayerDetails(${players.idPlayer})" class="btn btn-primary">Read More</a>
        </div>
    </div>
    `;
    playersContainer.appendChild(playersDiv);
}

const searchResult = () => {
    const searchField = document.getElementById('search-field');
    // console.log(searchField);
    const searchFieldText = searchField.value;
    // console.log(searchFieldText);
    loadPlayers(searchFieldText);
    searchField.value = ``;
    
}

const loadPlayerDetails = playerId => {
    // console.log("loading Player Details",playerId);
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`)
    .then(res => res.json())
    .then(data => displayPlayerDetails(data.players[0]))
}

const displayPlayerDetails = player => {
    
    const detailsContainer = document.getElementById('details-container');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('card');
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = ``;
    detailsDiv.innerHTML = `
    <p class="card-text" style="text-align: center;">${player.strDescriptionEN}</p>
    `;
    detailsContainer.appendChild(detailsDiv);
}

loadPlayers('Messi');