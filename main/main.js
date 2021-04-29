var mangaAPI = 'http://localhost:3000/course';

function start() {
    getMangaList(renderMangaList);
    handleCreateManga();
}

function getMangaList(callback) {
    fetch(mangaAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback)

}

function renderMangaList(listManga) {
    var listMangaBlock = document.querySelector('#list-manga');
    var html = listManga.map(function(manga) {
        return `<li>
        <h2>${manga.name}</h2>
        <p>${manga.description}</p>
        </li>`
    }).join('')

    listMangaBlock.innerHTML = html;
}

function handleCreateManga() {
    var createButton = document.querySelector('#add');
    createButton.onclick = function(e) {
        var nameInput = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var form = {
            name: nameInput,
            description: description,
        }
        createManga(form, getMangaList(renderMangaList))
    }
}

function createManga(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(mangaAPI, options)
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}


start();