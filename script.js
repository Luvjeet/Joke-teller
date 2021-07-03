const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'a98c20a281ed4ff8b9a0e3cb8f46e9b2',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Joke API

async function getJokes(){
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark,Pun,Spooky,Christmas?blacklistFlags=religious,racist,sexist,explicit';
    try{
        let joke = '';
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (err){
        console.log('Something went wrong!');
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);