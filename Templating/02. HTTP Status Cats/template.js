(() => {
    renderCatTemplate();
    function renderCatTemplate() {
        const section = document.getElementById('allCats');
        const cats = window.cats;
        renderRequest()
        async function renderRequest() {
            const source = await fetch('URL')
                .then(res => res.text());
            const template = Handlebars.compile(source);
            const html = template({ cats });
            section.innerHTML = html;
        }
    }
})()
function display(btn) {
    const info = btn.parentNode.getElementsByClassName('status')[0];
    const process = {
        none: () => showInfo(),
        block: () => hideInfo()
    }

    process[info.style.display]();

    function showInfo() {
        info.style.display = 'block';
        btn.textContent = 'Hide status code';
    }
    function hideInfo() {
        info.style.display = 'none';
        btn.textContent = 'Show status code';
    }
}