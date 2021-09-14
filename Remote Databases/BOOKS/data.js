const appID = 'BB107C72-540E-12DA-FF54-724DB0F36A00';
const apiKey = 'F5308537-211E-4E37-B40C-8CE45A754313';

function host(endpoint) {
    return `https://api.backendless.com/${appID}/${apiKey}/data/${endpoint}`;
}

export async function getBooks() {
    const response = await fetch(host('Books'));
    const data = await response.json();
    return data;
}

export async function createBook(book) {
    const response = await fetch(host('Books'), {
        method: 'POST',
        body: Json.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = response.json();
    return data;
}

export async function updateBook(book) {
    const id = book.objectId;
    const response = await fetch(host('Books/' + id), {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const response = await fetch(host('Books/' + id), {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;

}