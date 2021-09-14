$(() => {
    const section = document.getElementById('allMonkeys');
    processData()

    async function processData() {
        const source = await fetch('URL')
            .then(res => res.text())
        const template = Handlebars.compile(source);
        const html = template({ monkeys });
        section.innerHTML = html;
    }
})

function display(btn) {
    const p = btn.parentNode.getElementsByClassName('info')[0];
    const functionality = {
        none: () => showInfo(),
        block: () => hideInfo()
    }
    functionality[p.style.display]();
    function showInfo() {
        p.style.display = 'block';
        btn.textContent = 'Hide';
    }
    function hideInfo() {
        p.style.display = 'none';
        btn.textContent = 'Info';
    }
}