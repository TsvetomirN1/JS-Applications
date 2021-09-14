window.addEventListener("load", async function () {
    const monkeysTemplateRaw = await fetch("./monkeysContainerTemplate.hbs").then(x => x.text());
    const getTemplateResult = Handlebars.compile(monkeysTemplateRaw);

    const monkeyContainer = document.getElementById("monkeyContainer");
    monkeyContainer.innerHTML = getTemplateResult({
        monkeys
    });

    const displayMap = {
        none: "block",
        block: "none"
    };

    monkeyContainer.addEventListener("click", function (e) {
        const target = e.target;

        if (target.dataset.action === "showInfo") {
            const infoBox = target.parentElement.querySelector("p");

            infoBox.style.display = displayMap[infoBox.style.display];
        }
    });
});