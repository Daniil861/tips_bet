(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".main")) {
        if (!sessionStorage.getItem("current-bet")) sessionStorage.setItem("current-bet", 500);
        document.querySelectorAll(".bet-main__input").forEach((el => {
            if (el.value == +sessionStorage.getItem("current-bet")) el.checked = true;
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_height = document.documentElement.clientHeight;
    const window_width = document.documentElement.clientWidth;
    let inputs = document.querySelectorAll(".bet-main__input");
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 4);
        let arr = [ "jump", "scale", "rotate", "rotate-2" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate"); else if (el.classList.contains("_anim-icon-rotate-2")) el.classList.remove("_anim-icon-rotate-2");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    if (document.querySelector(".level")) countWidthFrameLevel();
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
    function countWidthFrameLevel() {
        let current_points = +document.querySelector(".level__point_1").innerHTML;
        let goal_points = +document.querySelector(".level__point_2").innerHTML;
        document.querySelector(".level__frame-current").style.width = `${current_points / goal_points * 100}%`;
    }
    const prices = {
        price_bomb: 2900,
        price_magnite: 3900
    };
    if (document.querySelector(".shop")) {
        document.querySelector(".shop__cost_bomb").textContent = prices.price_bomb;
        document.querySelector(".shop__cost_magnite").textContent = prices.price_magnite;
        if (!sessionStorage.getItem("bomb")) sessionStorage.setItem("bomb", 0);
        if (!sessionStorage.getItem("magnite")) sessionStorage.setItem("magnite", 0);
    }
    const config_game = {
        row: 0,
        col: 0,
        count: 0,
        pin: 0
    };
    function writeBonusesCount() {
        document.querySelector(".bonuses__count_1").textContent = sessionStorage.getItem("bomb");
        document.querySelector(".bonuses__count_2").textContent = sessionStorage.getItem("magnite");
    }
    function createStartStorrageCandys() {
        sessionStorage.setItem("candy-1", 0);
        sessionStorage.setItem("candy-2", 0);
        sessionStorage.setItem("candy-3", 0);
        sessionStorage.setItem("candy-4", 0);
        sessionStorage.setItem("candy-5", 0);
    }
    function resetInfoCandys() {
        sessionStorage.setItem(`bet-1`, 0);
        sessionStorage.setItem(`coeff-bet-1`, 0);
        sessionStorage.setItem(`bet-2`, 0);
        sessionStorage.setItem(`coeff-bet-2`, 0);
        sessionStorage.setItem(`bet-3`, 0);
        sessionStorage.setItem(`coeff-bet-3`, 0);
        sessionStorage.setItem(`bet-4`, 0);
        sessionStorage.setItem(`coeff-bet-4`, 0);
        sessionStorage.setItem(`bet-5`, 0);
        sessionStorage.setItem(`coeff-bet-5`, 0);
        removeCandySections();
        checkCompleteCandy();
        checkCompleteLevel();
    }
    function removeCandySections() {
        sessionStorage.setItem(`candy-1`, 0);
        sessionStorage.setItem(`candy-2`, 0);
        sessionStorage.setItem(`candy-3`, 0);
        sessionStorage.setItem(`candy-4`, 0);
        sessionStorage.setItem(`candy-5`, 0);
        document.querySelectorAll(".candy-score__block").forEach((item => {
            if (!item.classList.contains("_hide")) item.classList.add("_hide");
        }));
        document.querySelectorAll(".candy-score__count").forEach((item => {
            if (!item.classList.contains("_hide")) item.classList.add("_hide");
        }));
    }
    function checkCompleteCandy(number) {
        if (+sessionStorage.getItem("candy-1") > 0) {
            countCandyPoints(1);
            if (+sessionStorage.getItem("candy-1") > 9) document.querySelector(".candy-score__count_1").classList.remove("_hide");
        }
        if (+sessionStorage.getItem("candy-2") > 0) {
            countCandyPoints(2);
            if (+sessionStorage.getItem("candy-2") > 9) document.querySelector(".candy-score__count_2").classList.remove("_hide");
        }
        if (+sessionStorage.getItem("candy-3") > 0) {
            countCandyPoints(3);
            if (+sessionStorage.getItem("candy-3") > 9) document.querySelector(".candy-score__count_3").classList.remove("_hide");
        }
        if (+sessionStorage.getItem("candy-4") > 0) {
            countCandyPoints(4);
            if (+sessionStorage.getItem("candy-4") > 9) document.querySelector(".candy-score__count_4").classList.remove("_hide");
        }
        if (+sessionStorage.getItem("candy-5") > 0) {
            countCandyPoints(5);
            if (+sessionStorage.getItem("candy-5") > 9) document.querySelector(".candy-score__count_5").classList.remove("_hide");
        }
    }
    function countCandyPoints(number) {
        if (+sessionStorage.getItem(`candy-${number}`) > 0) {
            let count = sessionStorage.getItem(`candy-${number}`);
            let num = 0;
            let block_visible = 0;
            if (+count > 9) {
                num = count.split("");
                sessionStorage.setItem(`coeff-bet-${number}`, num[0]);
                block_visible = num[1];
            } else {
                sessionStorage.setItem(`coeff-bet-${number}`, 0);
                block_visible = +count;
            }
            document.querySelector(`.candy-score__count_${number}`).textContent = sessionStorage.getItem(`coeff-bet-${number}`);
            let length = 0;
            document.querySelectorAll(`.candy-score__block_${number}`).forEach((item => {
                console.log(item);
                if (item.classList.contains("_hide")) length++;
            }));
            if (length < 10) document.querySelectorAll(`.candy-score__block_${number}`).forEach(((item, index) => {
                if (index <= block_visible - 1) item.classList.remove("_hide");
            })); else {
                document.querySelectorAll(`.candy-score__block_${number}`).forEach((item => item.classList.add("_hide")));
                document.querySelectorAll(`.candy-score__block_${number}`).forEach(((item, index) => {
                    if (index <= block_visible - 1) item.classList.remove("_hide");
                }));
            }
            if (1 == number) sessionStorage.setItem("bet-1", .5 * sessionStorage.getItem(`coeff-bet-1`)); else if (2 == number) sessionStorage.setItem("bet-2", 1 * sessionStorage.getItem(`coeff-bet-2`)); else if (3 == number) sessionStorage.setItem("bet-3", 2 * sessionStorage.getItem(`coeff-bet-3`)); else if (4 == number) sessionStorage.setItem("bet-4", 5 * sessionStorage.getItem(`coeff-bet-4`)); else if (5 == number) sessionStorage.setItem("bet-5", 10 * sessionStorage.getItem(`coeff-bet-5`));
        }
    }
    function checkWinCount() {
        let bet = +sessionStorage.getItem("current-bet");
        let arr = [ +sessionStorage.getItem("bet-1"), +sessionStorage.getItem("bet-2"), +sessionStorage.getItem("bet-3"), +sessionStorage.getItem("bet-4"), +sessionStorage.getItem("bet-5") ];
        let sum = bet * arr[0] + bet * arr[1] + bet * arr[2] + bet * arr[3] + bet * arr[4];
        return sum;
    }
    function checkCompleteLevel() {
        let arr = [ +sessionStorage.getItem("candy-1"), +sessionStorage.getItem("candy-2"), +sessionStorage.getItem("candy-3"), +sessionStorage.getItem("candy-4"), +sessionStorage.getItem("candy-5") ];
        let sum = arr.reduce(((a, b) => a + b));
        document.querySelector(".level__point_1").textContent = sum;
        countWidthFrameLevel();
    }
    const config = {
        countRows: 5,
        countCols: 5,
        offsetBorder: 10,
        gemSize: 85,
        imagesCoin: [ 1, 2, 3, 4, 5 ],
        gemClass: "gem",
        gemIdPrefix: "gem",
        gameStates: [ "pick", "switch", "revert", "remove", "refill" ],
        gameState: "",
        movingItems: 0,
        countScore: 0
    };
    const player = {
        selectedRow: -1,
        selectedCol: -1,
        posX: "",
        posY: ""
    };
    const components = {
        container: document.createElement("div"),
        content: document.createElement("div"),
        wrapper: document.createElement("div"),
        gems: new Array
    };
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) {
        changeSizeGem();
        initGame();
        config.countScore = 0;
        writeBonusesCount();
        createStartStorrageCandys();
        findCollisionsGems();
        check_game_over();
    }
    function changeSizeGem() {
        if (window_height <= 320) config.gemSize = 45; else if (window_height > 320 && window_height < 600) config.gemSize = 66; else if (window_height > 600) config.gemSize = 85;
        if (window_width <= 600) config.gemSize = 45; else if (window_width > 600 && window_width < 720) config.gemSize = 55; else if (window_width > 720 && window_width < 900) config.gemSize = 66; else if (window_width > 900) config.gemSize = 85;
    }
    function findCollisionsGems() {
        console.log("FIND COLLISIONS");
        console.log(components.gems);
        config_game.count++;
        if (components.gems[config_game.row][config_game.col] == components.gems[config_game.row][config_game.col + 1]) {
            let gemNumber = components.gems[config_game.row][config_game.col] + 1;
            if (components.gems[config_game.row][config_game.col + 1] == components.gems[config_game.row][config_game.col + 2]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row}_${config_game.col + 2}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col + 2}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 2}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 2}`).setAttribute("data-collision", currentPin);
                }
            }
            if (config_game.row < 4 && components.gems[config_game.row][config_game.col] == components.gems[config_game.row + 1][config_game.col]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", currentPin);
                }
            }
            if (config_game.row < 4 && components.gems[config_game.row][config_game.col] == components.gems[config_game.row + 1][config_game.col + 1]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row}_${config_game.col + 1}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).setAttribute("data-collision", currentPin);
                }
            }
        }
        if (config_game.row < 4 && components.gems[config_game.row][config_game.col] == components.gems[config_game.row + 1][config_game.col]) {
            let gemNumber = components.gems[config_game.row][config_game.col] + 1;
            if (components.gems[config_game.row + 1][config_game.col] == components.gems[config_game.row + 1][config_game.col + 1]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col + 1}`).setAttribute("data-collision", currentPin);
                }
            }
            if (config_game.col > 0 && components.gems[config_game.row][config_game.col] == components.gems[config_game.row + 1][config_game.col - 1]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col - 1}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col - 1}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col - 1}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col - 1}`).setAttribute("data-collision", currentPin);
                }
            }
            if (config_game.row < 3 && components.gems[config_game.row][config_game.col] == components.gems[config_game.row + 2][config_game.col]) {
                let currentPin = 0;
                if (document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).dataset.collision; else if (document.getElementById(`gem_${config_game.row + 2}_${config_game.col}`).dataset.collision) currentPin = document.getElementById(`gem_${config_game.row + 2}_${config_game.col}`).dataset.collision;
                if (0 == currentPin) {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    document.getElementById(`gem_${config_game.row + 2}_${config_game.col}`).setAttribute("data-collision", `${gemNumber}_${config_game.pin}`);
                    config_game.pin++;
                } else {
                    document.getElementById(`gem_${config_game.row}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 1}_${config_game.col}`).setAttribute("data-collision", currentPin);
                    document.getElementById(`gem_${config_game.row + 2}_${config_game.col}`).setAttribute("data-collision", currentPin);
                }
            }
        }
        if (config_game.col < 4) config_game.col++; else {
            config_game.col = 0;
            config_game.row++;
        }
        if (config_game.row > 4 && 0 == config_game.col) {
            config_game.row = 0;
            return false;
        } else return findCollisionsGems();
    }
    function initGame() {
        createContentPage();
        createWrapper();
        createGrid();
        config.gameState = config.gameStates[0];
    }
    function createContentPage() {
        components.content.style.padding = config.offsetBorder + "px";
        components.content.style.width = config.gemSize * config.countCols + 2 * config.offsetBorder + "px";
        components.content.style.height = config.gemSize * config.countRows + 2 * config.offsetBorder + "px";
        components.content.classList.add("field__inner");
        document.querySelector(".field__body").append(components.content);
    }
    function createWrapper() {
        components.wrapper.classList.add("field__wrapper");
        components.content.append(components.wrapper);
    }
    function scoreInc(count, item) {
        let number = +item;
        console.log(item);
        console.log(number);
        if (1 == number) sessionStorage.setItem("candy-1", +sessionStorage.getItem("candy-1") + count); else if (2 == number) sessionStorage.setItem("candy-2", +sessionStorage.getItem("candy-2") + count); else if (3 == number) sessionStorage.setItem("candy-3", +sessionStorage.getItem("candy-3") + count); else if (4 == number) sessionStorage.setItem("candy-4", +sessionStorage.getItem("candy-4") + count); else if (5 == number) sessionStorage.setItem("candy-5", +sessionStorage.getItem("candy-5") + count);
    }
    function check_game_over() {
        let state = checkGroups();
        if (0 == state) {
            let money = checkWinCount();
            if (money > 0) {
                add_money(money, ".check", 500, 1500);
                document.querySelector(".win__sub-text").textContent = "You win!";
                document.querySelector(".win__text").textContent = money;
            } else {
                document.querySelector(".win__sub-text").textContent = "You loose!";
                document.querySelector(".win").classList.add("_loose");
            }
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
            }), 1e3);
        }
    }
    function checkGroups() {
        let items = Array.from(document.querySelectorAll(".gem"));
        let state = 0;
        items.forEach((item => {
            if (item.dataset.collision) {
                state = 1;
                return state;
            }
        }));
        return state;
    }
    function createGem(t, l, row, col, img) {
        let crystall = document.createElement("div");
        crystall.classList.add(config.gemClass);
        crystall.classList.add(`${config.gemClass}_${img}`);
        crystall.id = `${config.gemIdPrefix}_${row}_${col}`;
        crystall.style.top = `${t}px`;
        crystall.style.left = `${l}px`;
        crystall.style.backgroundImage = `url('img/game/icon-${img}.svg')`;
        crystall.setAttribute("data-number", img);
        components.wrapper.append(crystall);
    }
    function createGrid() {
        for (let i = 0; i < config.countRows; i++) {
            components.gems[i] = new Array;
            for (let j = 0; j < config.countCols; j++) components.gems[i][j] = -1;
        }
        for (let i = 0; i < config.countRows; i++) for (let j = 0; j < config.countCols; j++) {
            components.gems[i][j] = Math.floor(Math.random() * (5 - 0) + 0);
            createGem(i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[components.gems[i][j]]);
        }
    }
    function checkCollisionBlock(block) {
        let numberCollision = 0;
        if (block.dataset.collision) numberCollision = block.dataset.collision; else {
            block.classList.add("_anim");
            setTimeout((() => {
                block.classList.remove("_anim");
            }), 1e3);
            return false;
        }
        document.querySelectorAll(".gem").forEach((item => {
            if (item.dataset.collision && item.dataset.collision == numberCollision) {
                let row = parseInt(item.getAttribute("id").split("_")[1]);
                let col = parseInt(item.getAttribute("id").split("_")[2]);
                components.gems[row][col] = -1;
                item.classList.add("remove");
            }
        }));
        let removeBlocks = 0;
        document.querySelectorAll(".gem").forEach((item => {
            if (item.classList.contains("remove")) removeBlocks++;
        }));
        let numberCandy = parseInt(numberCollision.split("_")[0]);
        scoreInc(removeBlocks, numberCandy);
        config.gameState = config.gameStates[3];
        gemFade();
    }
    function removeGemsNew(row, col) {
        document.getElementById(`gem_${row}_${col}`).classList.add("remove");
        components.gems[row][col] = -1;
        let num = document.getElementById(`gem_${row}_${col}`).dataset.number;
        scoreInc(1, num);
        config.gameState = config.gameStates[3];
        gemFade();
    }
    function removeAllGems() {
        document.querySelectorAll(".gem").forEach((item => {
            let row = parseInt(item.getAttribute("id").split("_")[1]);
            let col = parseInt(item.getAttribute("id").split("_")[2]);
            components.gems[row][col] = -1;
            item.classList.add("remove");
        }));
        config.gameState = config.gameStates[3];
        gemFade();
    }
    function checkMoving() {
        config.movingItems--;
        if (0 == config.movingItems) switch (config.gameState) {
          case config.gameStates[3]:
            checkFalling();
            break;

          case config.gameStates[4]:
            placeNewGems();
            break;
        }
    }
    function gemFade() {
        $(".remove").each((function() {
            config.movingItems++;
            $(this).animate({
                opacity: 0
            }, {
                duration: 200,
                complete: function() {
                    $(this).remove();
                    checkMoving();
                }
            });
        }));
    }
    function checkFalling() {
        let fellDown = 0;
        for (let j = 0; j < config.countCols; j++) for (let i = config.countRows - 1; i > 0; i--) if (-1 == components.gems[i][j] && components.gems[i - 1][j] >= 0) {
            document.querySelector("#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j).classList.add("fall");
            document.querySelector("#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j).setAttribute("id", config.gemIdPrefix + "_" + i + "_" + j);
            components.gems[i][j] = components.gems[i - 1][j];
            components.gems[i - 1][j] = -1;
            fellDown++;
        }
        $(".fall").each((function() {
            config.movingItems++;
            $(this).animate({
                top: "+=" + config.gemSize
            }, {
                duration: 100,
                complete: function() {
                    $(this).removeClass("fall");
                    checkMoving();
                }
            });
        }));
        if (0 == fellDown) {
            config.gameState = config.gameStates[4];
            config.movingItems = 1;
            checkMoving();
        }
    }
    function placeNewGems() {
        let gemsPlaced = 0;
        for (let i = 0; i < config.countCols; i++) if (-1 == components.gems[0][i]) {
            components.gems[0][i] = Math.floor(Math.random() * (5 - 0) + 0);
            createGem(0, i * config.gemSize, 0, i, config.imagesCoin[components.gems[0][i]]);
            gemsPlaced++;
        }
        if (gemsPlaced) {
            config.gameState = config.gameStates[3];
            checkFalling();
        } else {
            config.gameState = config.gameStates[0];
            player.selectedRow = -1;
            checkCompleteCandy();
            checkCompleteLevel();
            setTimeout((() => {
                document.querySelectorAll(".gem").forEach((item => {
                    if (item.dataset.collision) item.removeAttribute("data-collision");
                }));
                findCollisionsGems();
                check_game_over();
            }), 500);
        }
    }
    function get_bonus_bomb(block) {
        config.movingItems++;
        document.querySelector(".bonuses__item_1").classList.remove("_anim");
        let row = parseInt(block.getAttribute("id").split("_")[1]);
        let col = parseInt(block.getAttribute("id").split("_")[2]);
        let top_elem_row, top_elem_col, left_elem_row, left_elem_col, right_elem_row, right_elem_col, bottom_elem_row, bottom_elem_col;
        if (row > 0 && row < 4 && col > 0 && col < 4) {
            top_elem_row = row - 1;
            top_elem_col = col;
            left_elem_row = row;
            left_elem_col = col - 1;
            right_elem_row = row;
            right_elem_col = col + 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
            console.log("Применяем бомбу не с краев");
        }
        if (0 == row && col > 0 && col < 4) {
            left_elem_row = row;
            left_elem_col = col - 1;
            right_elem_row = row;
            right_elem_col = col + 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
        }
        if (0 == row && 0 == col) {
            right_elem_row = row;
            right_elem_col = col + 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
        }
        if (0 == row && 4 == col) {
            left_elem_row = row;
            left_elem_col = col - 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
        }
        if (row > 0 && row < 4 && 0 == col) {
            top_elem_row = row - 1;
            top_elem_col = col;
            right_elem_row = row;
            right_elem_col = col + 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
        }
        if (row > 0 && row < 4 && 4 == col) {
            top_elem_row = row - 1;
            top_elem_col = col;
            left_elem_row = row;
            left_elem_col = col - 1;
            bottom_elem_row = row + 1;
            bottom_elem_col = col;
        }
        if (4 == row && col > 0 && col < 4) {
            top_elem_row = row - 1;
            top_elem_col = col;
            left_elem_row = row;
            left_elem_col = col - 1;
            right_elem_row = row;
            right_elem_col = col + 1;
        }
        if (4 == row && 0 == col) {
            top_elem_row = row - 1;
            top_elem_col = col;
            right_elem_row = row;
            right_elem_col = col + 1;
        }
        if (4 == row && 4 == col) {
            top_elem_row = row - 1;
            top_elem_col = col;
            left_elem_row = row;
            left_elem_col = col - 1;
        }
        if (document.getElementById(`gem_${row}_${col}`)) {
            removeGemsNew(row, col);
            document.getElementById(`gem_${row}_${col}`).remove();
        }
        if (document.getElementById(`gem_${top_elem_row}_${top_elem_col}`)) {
            removeGemsNew(top_elem_row, top_elem_col);
            document.getElementById(`gem_${top_elem_row}_${top_elem_col}`).remove();
        }
        if (document.getElementById(`gem_${left_elem_row}_${left_elem_col}`)) {
            removeGemsNew(left_elem_row, left_elem_col);
            document.getElementById(`gem_${left_elem_row}_${left_elem_col}`).remove();
        }
        if (document.getElementById(`gem_${right_elem_row}_${right_elem_col}`)) {
            removeGemsNew(right_elem_row, right_elem_col);
            document.getElementById(`gem_${right_elem_row}_${right_elem_col}`).remove();
        }
        if (document.getElementById(`gem_${bottom_elem_row}_${bottom_elem_col}`)) {
            removeGemsNew(bottom_elem_row, bottom_elem_col);
            document.getElementById(`gem_${bottom_elem_row}_${bottom_elem_col}`).remove();
        }
        config.gameState = config.gameStates[3];
        checkMoving();
    }
    function get_bonus_magnite(block) {
        console.log(components.gems);
        config.movingItems++;
        block.classList.add("_magnite");
        setTimeout((() => {
            document.querySelector(".field__wrapper").classList.add("_magnite");
        }), 500);
    }
    function get_bonus_magnite_2(block) {
        let gem_1 = "";
        let number_1 = 0;
        document.querySelectorAll(".gem").forEach((item => {
            if (item.classList.contains("_magnite")) {
                gem_1 = item;
                number_1 = +item.dataset.number;
            }
        }));
        let row_1 = parseInt(gem_1.getAttribute("id").split("_")[1]);
        let col_1 = parseInt(gem_1.getAttribute("id").split("_")[1]);
        let row_2 = parseInt(block.getAttribute("id").split("_")[1]);
        let col_2 = parseInt(block.getAttribute("id").split("_")[1]);
        let number_2 = +block.dataset.number;
        gem_1.style.backgroundImage = `url('img/game/icon-${number_2}.svg')`;
        gem_1.classList.remove(`gem_${number_1}`);
        gem_1.classList.add(`gem_${number_2}`);
        gem_1.dataset.number = number_2;
        block.style.backgroundImage = `url('img/game/icon-${number_1}.svg')`;
        block.classList.remove(`gem_${number_2}`);
        block.classList.add(`gem_${number_1}`);
        block.dataset.number = number_1;
        console.log(components.gems);
        console.log(components.gems[row_1][col_1]);
        console.log(components.gems[row_2][col_2]);
        number_1 -= 1;
        number_2 -= 1;
        console.log(number_1);
        console.log(number_2);
        components.gems[row_2][col_2] = number_1;
        components.gems[row_1][col_1] = number_2;
        console.log(components.gems);
        document.querySelectorAll(".gem").forEach((item => {
            if (item.classList.contains("_magnite")) item.classList.remove("_magnite");
        }));
        document.querySelector(".bonuses__item_2").classList.remove("_anim");
        setTimeout((() => {
            document.querySelector(".field__wrapper").classList.remove("_magnite");
        }), 500);
        document.querySelectorAll(".gem").forEach((item => {
            if (item.dataset.collision) item.removeAttribute("data-collision");
        }));
        setTimeout((() => {
            findCollisionsGems();
        }), 500);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let bank = +sessionStorage.getItem("money");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".footer-main__button_bet")) document.querySelector(".main__content").classList.add("_bet");
        if (targetElement.closest(".footer-main__button_shop")) {
            document.querySelector(".main__content").classList.add("_shop");
            document.querySelector(".main__hero-image").classList.add("_hide");
            document.querySelector(".header__body").classList.add("_shop");
        }
        if (targetElement.closest(".header__button-back")) {
            document.querySelector(".main__content").classList.remove("_shop");
            document.querySelector(".main__hero-image").classList.remove("_hide");
            document.querySelector(".header__body").classList.remove("_shop");
        }
        if (targetElement.closest(".bet-main__close-icon")) {
            document.querySelector(".main__content").classList.remove("_bet");
            let array = [];
            inputs.forEach((el => {
                if (el.checked) array.push(el.value);
            }));
            if (0 == array.length) {
                sessionStorage.setItem("current-bet", 100);
                document.querySelectorAll(".bet-main__input")[0].checked = true;
            }
        }
        if (targetElement.closest(".bet-main__bets")) {
            inputs.forEach((el => {
                if (el.checked) if (+el.value != +targetElement.closest(".bet-main__item").dataset.val) el.checked = false;
            }));
            sessionStorage.setItem("current-bet", targetElement.closest(".bet-main__item").dataset.val);
        }
        if (targetElement.closest(".shop__button_1")) if (bank >= prices.price_bomb) {
            delete_money(prices.price_bomb, ".check");
            sessionStorage.setItem("bomb", +sessionStorage.getItem("bomb") + 1);
            document.querySelector(".shop__image_1").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".shop__image_1").classList.remove("_anim");
            }), 1e3);
        } else no_money(".check");
        if (targetElement.closest(".shop__button_2")) if (bank >= prices.price_magnite) {
            delete_money(prices.price_magnite, ".check");
            sessionStorage.setItem("magnite", +sessionStorage.getItem("magnite") + 1);
            document.querySelector(".shop__image_2").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".shop__image_2").classList.remove("_anim");
            }), 1e3);
        } else no_money(".check");
        if (targetElement.closest(".gem") && !document.querySelector(".bonuses__item_1").classList.contains("_anim") && !document.querySelector(".bonuses__item_2").classList.contains("_anim")) {
            checkCollisionBlock(targetElement.closest(".gem"));
            document.querySelector(".field__wrapper").classList.add("_hold");
            setTimeout((() => {
                document.querySelector(".field__wrapper").classList.remove("_hold");
            }), 550);
        }
        if (targetElement.closest(".win__button_play")) {
            config_game.pin = 0;
            resetInfoCandys();
            removeAllGems();
            setTimeout((() => {
                document.querySelector(".win").classList.remove("_active");
                if (document.querySelector(".win").classList.contains("_loose")) document.querySelector(".win").classList.remove("_loose");
            }), 500);
        }
        if (targetElement.closest(".win__button_home")) resetInfoCandys();
        if (targetElement.closest(".bonuses__item_1")) if (0 != +sessionStorage.getItem("bomb")) {
            sessionStorage.setItem("bomb", +sessionStorage.getItem("bomb") - 1);
            targetElement.closest(".bonuses__item_1").classList.add("_anim");
        }
        if (targetElement.closest(".bonuses__item_2")) if (0 != +sessionStorage.getItem("magnite")) {
            sessionStorage.setItem("magnite", +sessionStorage.getItem("magnite") - 1);
            targetElement.closest(".bonuses__item_2").classList.add("_anim");
        }
        if (targetElement.closest(".gem") && document.querySelector(".bonuses__item_1").classList.contains("_anim")) {
            let elem = targetElement.closest(".gem");
            get_bonus_bomb(elem);
            document.querySelector(`.bonuses__count_1`).textContent = sessionStorage.getItem(`bomb`);
        }
        if (targetElement.closest(".gem") && document.querySelector(".bonuses__item_2").classList.contains("_anim") && !document.querySelector(".field__wrapper").classList.contains("_magnite")) {
            console.log("=======first=========");
            let elem = targetElement.closest(".gem");
            get_bonus_magnite(elem);
        }
        if (targetElement.closest(".gem") && document.querySelector(".bonuses__item_2").classList.contains("_anim") && document.querySelector(".field__wrapper").classList.contains("_magnite")) {
            console.log("=======second=========");
            let elem = targetElement.closest(".gem");
            get_bonus_magnite_2(elem);
            document.querySelector(`.bonuses__count_2`).textContent = sessionStorage.getItem(`magnite`);
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();