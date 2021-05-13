(function () {
    var textArray = ["Developer", "React ❤️", "NodeJS", "Math-Geek", "Neovim ❤️", "oh-my-zsh"];

    var text = document.querySelector(".display-text");
    function addText(individualText) {
        var index = 0;
        var textToBeAdded = individualText;

        setTimeout(function adding() {
            if (index >= textToBeAdded.length) return;
            text.innerText += textToBeAdded[index];
            index++;
            setTimeout(adding, 150);
        }, 150);
        setTimeout(function removing() {
            if (text.innerText.length === 0) return;
            text.innerText = text.innerText.slice(0, -1);
            setTimeout(removing, 150);
        }, 1700);
    }

    var index = 0;
    setTimeout(
        function runagain(text) {
            index += 1;
            if (index >= textArray.length) index = 0;

            addText(text);

            setTimeout(runagain, 4000, textArray[index]);
        },
        1000,
        textArray[0]
    );

    var about = document.querySelector("#about");
    var contact = document.querySelector("#contact");

    var aboutContent = document.querySelector("#about-content");
    var contactContent = document.querySelector("#contact-content");

    about.addEventListener("click", handleAbout);

    contact.addEventListener("click", handleContact);

    function handleAbout(event) {
        var aboutBox = new WinBox({
            class: "about",
            title: "About Me",
            width: "500px",
            height: "500px",
            top: "50px",
            right: "10px",
            bottom: "50px",
            left: "50px",
            mount: aboutContent,
            onfocus: function () {
                this.setBackground("#00aa00");
            },
            onblur: function () {
                this.setBackground("#777");
            },
        });
        about.removeEventListener("click", handleAbout);
        console.log(document.querySelector(".winbox.about .wb-close"));
        document
            .querySelector(".winbox.about .wb-close")
            .addEventListener("click", function (event) {
                console.log("Adding the event listener");
                about.addEventListener("click", handleAbout);
            });
    }
    function handleContact(event) {
        var contactBox = new WinBox({
            class: "contact",
            title: "Reach out to me",
            width: "500px",
            height: "500px",
            top: "70px",
            right: "50px",
            bottom: "50px",
            left: "70px",
            mount: contactContent,
            onfocus: function () {
                this.setBackground("#00aa00");
            },
            onblur: function () {
                this.setBackground("#777");
            },
        });
    }
})();
