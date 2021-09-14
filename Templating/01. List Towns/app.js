function solve() {
    document.getElementById('btnLoadTowns').addEventListener('click', main)

    async function main() {
        const towns = document.getElementById('towns').value.split(', ');
        const source = await fetch('URL')
            .then(res => res.text())

        const template = Handlebars.compile(source);

        const html = template({ towns });
        const div = document.getElementById('root')

        div.innerHTML = html;
    }
}
solve()