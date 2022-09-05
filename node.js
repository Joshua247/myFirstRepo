const navSlide = () =>{
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    nav.classList.toggle('.nav-active');
  });
}

navSlide();

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

const 
apiURL = 'https://www.azlyrics.com/';

// GET INPUT VALUE
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let searchValue = search.value.trim();

  if(!searchValue){
    alert('No song-Lyrics to Search! please Enter a song or Artist name');
  }else{
    beginSearch(searchValue);
    
  }
})

// CREATE SEARCH FUNCTION
async function beginSearch(searchValue){
  const searchResult = await fetch(`${apiURL}
  /sugest/ ${searchValue}`);
  const data = await searchResult.json();
  console.log(data);

  displayData(data);
 
}

function displayData(data){
  result.innerHTML = `
  <ul class='songs'>
     ${data.data
    .map(song=> ` <li>
                    <div>
                        <strong>
                        ${song.artist.name} - ${song.title}
                        </strong>
                    </div>
                    <span data-artist='${song.artist}'>Get Lyrics</span>
                  </li>
    `)
    .join('')}

  </ul>
  `;
}

//GET LYRICS FUNCTION
result.addEventListener('click', e =>{
  const clickedElement = e.target;

  // check get lyrics button
  if(clickedElement.target === 'SPAN'){
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
})

async function getLyrics(artist, songTitle){
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <p>${lyrics}</p>`;
}