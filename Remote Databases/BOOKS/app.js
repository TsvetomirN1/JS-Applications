import el from './dom.js';
import * as api from './data.js';

window.addEventListener('load', () => {
    const table = document.querySelector('table tbody');
    document.querySelector('#loadBooks').addEventListener('click', displayBooks);

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const ISBNInput = document.querySelector('#isbn');

    document.querySelector('form > button').addEventListener('click', createBook);

    async function createBook(e) {
        e.preventDefault();

        const book = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: ISBNInput.value
        };
        let valid = true;
        Object.entries(book).find(([k, v]) => {
            if (v.length === 0) {
                alert(`Book${k} cannot be empty`);
                valid = false;
                return true;
            } else {
                return false;
            }
        });
        if (valid === false) {
            return;
        }
        try {
            const created = await api.createBook(book);
            table.appendChild(renderBook(created));
        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    async function displayBooks() {
        const books = await api.getBooks();
        table.innerHTML = '';
        books.sort((a, b) => a.author.localeCompare(b.author)).
            forEach(b => table.appendChild(renderBook(b)));

    }

    function renderBook(book) {
        const deleteBtn = el('button', 'Delete');
        deleteBtn.addEventListener('click', deleteBook);
        const element = el('tr', [
            el('td', book.title),
            el('td', book.author),
            el('td', book.isbn),
            el('td', [
                el('button', 'Edit'),
                deleteBtn
            ])
        ]);
        return element;
    }

    async function deleteBook() {
        try {
            deleteBtn.disabled = true;
            deleteBtn.textContent = "Please wait...";
            await api.deleteBook(book.objectId);
            element.remove();
        } catch (err) {
                deleteBtn.disabled = false;
                deleteBtn.textContent = "Delete";
                alert(err);
                console.log(Error);
            }

        }

    });
