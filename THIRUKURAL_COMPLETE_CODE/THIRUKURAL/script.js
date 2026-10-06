let good = 0;
let released = 0;
let playing = false;
let timer = null;

const garden = document.getElementById("garden");
const goodScore = document.getElementById("goodScore");
const badScore = document.getElementById("badScore");
const level = document.getElementById("level");
const message = document.getElementById("message");
const tree = document.getElementById("tree");

function goToGame() {
    document.getElementById("game").scrollIntoView({
        behavior: "smooth"
    });
}

function startGame() {
    if (playing) {
        message.innerText = "🎮 Game already running!";
        return;
    }

    playing = true;
    good = 0;
    released = 0;

    updateScore();

    message.innerText = "🌸 Click Flower or 🍂 Leaf!";

    createItem();
    timer = setInterval(createItem, 1000);
}

function createItem() {
    if (!playing) return;

    const item = document.createElement("div");
    item.className = "item";

    if (Math.random() > 0.4) {
        item.innerHTML = "🌸";
        item.dataset.kind = "good";
    } else {
        item.innerHTML = "🍂";
        item.dataset.kind = "bad";
    }

    item.style.left = (Math.random() * 80 + 5) + "%";

    garden.appendChild(item);

    item.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (item.dataset.kind === "good") {
            good++;
            message.innerText = "🌸 Good deed remembered!";
        } else {
            released++;
            message.innerText = "🍂 Negativity released!";
        }

        updateScore();
        item.remove();
    });

    setTimeout(function() {
        if (item.parentElement) {
            item.remove();
        }
    }, 4000);
}

function updateScore() {
    goodScore.innerText = good;
    badScore.innerText = released;

    const total = good + released;

    if (total < 5) {
        level.innerText = "Seed";
        tree.style.fontSize = "130px";
    } else if (total < 10) {
        level.innerText = "Sprout";
        tree.style.fontSize = "170px";
    } else if (total < 20) {
        level.innerText = "Bloom";
        tree.style.fontSize = "210px";
    } else {
        level.innerText = "Forest";
        tree.style.fontSize = "260px";
    }
}
