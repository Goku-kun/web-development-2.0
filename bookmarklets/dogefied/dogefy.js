(function () {
    let pTags = document.querySelectorAll("p");
    let h1s = document.querySelectorAll("h1");
    let h2s = document.querySelectorAll("h2");
    let h3s = document.querySelectorAll("h3");
    let h4s = document.querySelectorAll("h4");
    var buttons = document.querySelectorAll("button");

    //if (pTags.length === 0) return;

    for (let pTag of pTags) {
        //console.log(image);
        //image.src = `https://place.dog/${image.width}/${image.height}`;
        pTag.innerText = "doggo🐕";
        pTag.style.backgroundColor = "#000";
        pTag.style.color = "#FFF";
    }

    for (let btn of buttons) {
        btn.innerText = "doggo🐕";
        btn.style.backgroundColor = "#000";
        btn.style.color = "#FFF";
    }

    for (let h of h1s) {
        h.innerText = "doggo🐕";
        h.style.backgroundColor = "#000";
        h.style.color = "#FFF";
    }
    for (let h of h2s) {
        h.innerText = "doggo🐕";
        h.style.backgroundColor = "#000";
        h.style.color = "#FFF";
    }
    for (let h of h3s) {
        h.innerText = "doggo🐕";
        h.style.backgroundColor = "#000";
        h.style.color = "#FFF";
    }
    for (let h of h4s) {
        h.innerText = "doggo🐕";
        h.style.backgroundColor = "#000";
        h.style.color = "#FFF";
    }
})();
