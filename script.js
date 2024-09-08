const params = new URLSearchParams(location.search);
let min, max, cnt = {};

window.addEventListener("load", async() => {
    document.getElementById("siteName").addEventListener("click", () => location.href = location.pathname);
    document.getElementById("start").addEventListener("click", async() => {
        if (params.get("t") == "string"? (() => {
            let txt = document.getElementById("textarea").value;
            if (txt == "") {
                alert("文字列が入力されていないため実行できません。");
                return false;
            }
            document.getElementById("roulette").className = "let long";
            cnt = txt.split("\n");
            return true;
        })(): (() => {
            min = document.getElementById("minval").value;
            max = document.getElementById("maxval").value;
            min = Number(min), max = Number(max);   //0が対応してない
            if (!(min && max) || min > max) {
                alert(`入力に誤りがあるため実行できません。\nエラー内容: ${(!min || !max)? `${!min? "最小値": "最大値"}が存在しません。`: min > max? "最大値より最小値の方が値が大きい": "原因不明"}`);
                return false;
            }
            return true;
        })()) {
            document.getElementById("roulette").style.color = "#999";
            for (let i = 0; i < 12; i++) {
                let rand = Math.random()*((max+1)-min || cnt.length) + (min || 0);
                rand = Math.floor(rand);
                console.log(rand);
                await new Promise((resolve) => setTimeout(resolve, i == 11? 300: 100));
                document.getElementById("roulette").innerText = params.get("t") == "string"? cnt[rand]: rand;
            }
            document.getElementById("roulette").style.color = "black";
        }
    });

    if (params.get("t") == "string") {
        document.getElementById("number").style.display = "none";
        document.getElementById("string").style.display = "block";
    }
});