const url = " https://api.dictionaryapi.dev/api/v2/entries/en/"

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const button = document.getElementById("search-button");

const getDefinitions = async () => {

    let inputWord = document.getElementById("input-word").value;

try {
    const response = await fetch (`${url}${inputWord}`)
    const data = await response.json();
    console.log(data);
    result.innerHTML = `
    <div class="word row">
    <p class="h3 col-10 text-start">${inputWord}</p>
    <button onclick="playSound()" type="button" class="btn btn-lg col-2 justify-content-end border-0 text-end">
        <i class="bi bi-volume-up-fill"></i>
    </button>
    </div>
    <div class="details row mb-2">
    <p class="h6 col-10 text-muted fw-lighter text-start">${data[0].meanings[0].partOfSpeech}</p>
    <p class="h6 col-10 text-muted fw-lighter text-start">${data[0].phonetics[1].text}</p>
    </div> <br>
    <p class="word-meaning fs-6 col-10 text-start">
    ${data[0].meanings[0].definitions[0].definition} }
    </p>
    <p class="word-example fs-6 col-10 text-start ps-4 mt-4 fst-italic" style="color: var(--bs-blue);">
    ${data[0].meanings[0].definitions[0].example || ""}
    </p>`;

    sound.setAttribute("src", `${data[0].phonetics[1].audio}`)
    console.log(sound)
} catch (e) {
    result.innerHTML = `
    <p class="h3 col-10 text-start">Uh-oh!</p>
    </div>
    <div class="details row mb-2">
    <p class="h6 col-10 text-muted fw-lighter text-start">Sorry pal, we couldn't find definitions for the word you were looking for.</p>
    <p class="h6 col-10 text-muted fw-lighter text-start">You can try the search again at later time or head to the web instead.</p>
    </div>`
 }

} 

function playSound() {
    sound.play();
}


button.addEventListener('click', getDefinitions)
