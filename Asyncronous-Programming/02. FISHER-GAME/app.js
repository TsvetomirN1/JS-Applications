function attachEvents() {

    let allCatches;

    const allCatchesViewDiv = document.getElementById('catches');
    const catchDetails = document.querySelector('.catch');

    const jsonUrl = 'https://fisher-game.firebaseio.com/catches.json';

    const loadBtn = document.querySelector('.load');
    const addBtn = document.querySelector('.add');

    async function getAllCatches() {
        return await fetch(jsonUrl)
            .then((response) => response.json())
            .then((data) => allCatches = data);
    }

    function takeInput(element) {
        let _catch = {};

        _catch.angler = element.querySelector(`.angler`).value;
        _catch.weight = element.querySelector(`.weight`).value;
        _catch.species = element.querySelector(`.species`).value;
        _catch.location = element.querySelector(`.location`).value;
        _catch.bait = element.querySelector(`.bait`).value;
        _catch.captureTime = element.querySelector(`.captureTime`).value;

        return _catch;

    };

    function addCatch() {
        let catchToAdd = JSON.stringify(takeInput(document.getElementById('addForm')));

        fetch(jsonUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: catchToAdd
        }).then(response => response.json());

        document.querySelector('#addForm .angler').value = '';
        document.querySelector('#addForm .weight').value = '';
        document.querySelector('#addForm .species').value = '';
        document.querySelector('#addForm .location').value = '';
        document.querySelector('#addForm .bait').value = '';
        document.querySelector('#addForm .captureTime').value = '';
    }

    function deleteCatch(catchId) {
        fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
            method: 'DELETE',
        }).then((response) => loadAllCatches());
    }


    function updateCatch(catchId, element) {
        let catchForUpdate = takeInput(element.target.parentNode);
        fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(catchForUpdate)
        }).then(response => loadAllCatches());
    }


    function loadAllCatches() {
        allCatchesViewDiv.innerHTML = '';
        getAllCatches()
            .then((data) => {
                Object.entries(data)
                    .forEach((kvp) => {
                        let currentViewCatch = catchDetails.cloneNode(true);
                        currentViewCatch.setAttribute('data-id', kvp[0]);
                        let currentCatch = kvp[1];
                        for (const key in currentCatch) {
                            if (currentCatch.hasOwnProperty(key)) {
                                const element = currentCatch[key];
                                currentViewCatch.querySelector(`.${key}`).value = element;
                            }
                        }
                        currentViewCatch.querySelector('.update').addEventListener('click', (ev) => updateCatch(kvp[0], ev));
                        currentViewCatch.querySelector('.delete').addEventListener('click', () => deleteCatch(kvp[0]));
                        allCatchesViewDiv.appendChild(currentViewCatch);
                    })
            });
    }

    addBtn.addEventListener('click', addCatch);
    loadBtn.addEventListener('click', loadAllCatches);
}

attachEvents();


