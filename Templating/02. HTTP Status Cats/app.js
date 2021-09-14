window.addEventListener("load", async function () {
    const statusCodeContainerTemplate = await fetch("./status-code-container.hbs").then(x => x.text());
    Handlebars.registerPartial("cat", statusCodeContainerTemplate);

    const statusCodesContainerTemplate = await fetch("./status-codes-container.hbs").then(x => x.text());
    const template = Handlebars.compile(statusCodesContainerTemplate);

    const allCatsSection = document.getElementById("allCats");

    allCatsSection.innerHTML = template({
        cats: window.cats
    });

    const displayMap = {
        none: function (btn, statusDiv) {
            btn.textContent = "Hide status code";
            statusDiv.style.display = "block";
        },
        block: function (btn, statusDiv) {
            btn.textContent = "Show status code";
            statusDiv.style.display = "none";
        }
    };

    allCatsSection.addEventListener("click", function (e) {
        const target = e.target;

        if (target.classList.contains("showBtn")) {
            const container = e.target.parentElement;
            const statusDiv = container.querySelector("div.status");

            displayMap[statusDiv.style.display](target, statusDiv);
        }
    });
})