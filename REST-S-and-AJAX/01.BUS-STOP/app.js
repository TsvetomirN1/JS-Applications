function getInfo() {
    const baseURL = "https://judgetests.firebaseio.com/businfo/{stopId}.json";
    const validID = ["1287", "1308", "1327", "2334"];
    const elements = {
        stopId() { return document.querySelector('input#stopId') },
        stopName() { return document.querySelector('div#stopName') },
        buses() { return document.querySelector('ul#buses') }
    };

    const stopId = elements.stopId().value;
    const url = baseURL.replace('{stopId}', stopId);

    if (!validID.includes(stopId)) {
        elements.stopName().textContent = 'ERROR';
        return;
    }
    fetch(url)
        .then((response) => response.json())
        .then((result) => showInfo(result));

    function showInfo(data) {
        elements.stopName().textContent = data.name;

        Object.keys(data.buses).forEach((bus) => {
            let listItem = document.createElement('li');
            listItem.textContent = `Bus ${bus} arrives in ${data.buses[bus]}`;
            elements.buses().appendChild(listItem);
        });
    }
}