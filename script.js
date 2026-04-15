//All koden som trengs for oppgave 1

let knappOppg1 = document.querySelector("#Oppg1Knapp");
let inputOppg1 = document.querySelector("#Oppg1Input");
let rektangelEl = document.querySelector("#rekt");
let feilEl = document.getElementById("feilmelding");
spanEl = document.querySelector("span");
let samlingBredder = [];

knappOppg1.addEventListener("click", GenererRektangel);

function GenererRektangel() {
    let bredde = inputOppg1.value;
    if (bredde >= 1 && bredde <= 9 && !samlingBredder.includes(bredde)) {
        samlingBredder.push(bredde)
        feilEl.innerHTML = "";
        let hoyde = 10 - bredde;
        spanEl.innerHTML = bredde * hoyde;
        rektangelEl.style.height = hoyde * 50 + "px";
        rektangelEl.style.width = bredde * 50 + "px";
    }
    else {
        feilEl.innerHTML = "Bredden må være mellom 1 og 9, og kan ikke ha blitt brukt tidligere";
    }
}

//All koden som trengs for oppgave 2
//Del 1
let tabellEl = document.querySelector("table");
//Dette er den arrayen vi kommer til å bruke mest
let trapesData = [
    {
        Type: "Kvadrat",
        Bunnlinje: 10,
        Topplinje: 10,
        Hoyde: 10,
        Forskyvning: 0,
        Areal: 100
    }, {
        Type: "Rektangel",
        Bunnlinje: 20,
        Topplinje: 20,
        Hoyde: 5,
        Forskyvning: 0,
        Areal: 100
    }, {
        Type: "Parallelogram",
        Bunnlinje: 20,
        Topplinje: 20,
        Hoyde: 10,
        Forskyvning: 2,
        Areal: 200
    }, {
        Type: "Trapes",
        Bunnlinje: 20,
        Topplinje: 10,
        Hoyde: 5,
        Forskyvning: 2,
        Areal: 75
    }, {
        Type: "Trapes",
        Bunnlinje: 5,
        Topplinje: 3,
        Hoyde: 10,
        Forskyvning: 5,
        Areal: 40
    }
];

function genererTabell() {
    tabellEl.innerHTML = "";
    let headerTr = document.createElement("tr");
    for (const header in trapesData[0]) {
        let th = document.createElement("th");
        th.innerHTML = header;
        headerTr.appendChild(th);
    }
    tabellEl.appendChild(headerTr);
    let id = 0;
    trapesData.forEach(firkant => {
        let tr = document.createElement("tr");
        tr.addEventListener("click",tegnTrapes);
        for (const egenskap in firkant) {
            let td = document.createElement("td");
            td.id = id
            td.innerText = firkant[egenskap];
            tr.appendChild(td);
        }
        id++;

        tabellEl.appendChild(tr)
    });
    //Denne legges inn for del 2
    let tr = document.createElement("tr");
    for (const header in trapesData[0]) {
        let td = document.createElement("td");
        if (header == "Type") {
            td.innerHTML = "<b>Legg til ny firkant</b>";
        }
        else if (header != "Areal") {
            td.innerHTML = `<input type="number" placeholder="${header}" class="nyFirkant">`;
        }
        else {
            td.innerHTML = `<button onclick="leggTilFirkant()">Legg til</button>`;
        }
        tr.appendChild(td);
    }
    tabellEl.appendChild(tr)
}
genererTabell();
// Dette er det som er funksjonen for del 2
function leggTilFirkant() {
    let nyfirkant = document.querySelectorAll(".nyFirkant");
    let firkant = {
        Type: "Ukjent"
    };

    nyfirkant.forEach(egenskap => {
        firkant[egenskap.placeholder] = Number(egenskap.value);
    });
    if (firkant.Bunnlinje != firkant.Topplinje) {
        firkant.Type = "Trapes";
    } else if (firkant.Forskyvning != 0) {
        firkant.Type = "Parallellogram";
    }
    else if (firkant.Topplinje != firkant.Hoyde) {
        firkant.Type = "Rektangel";
    }
    else {
        firkant.Type = "Kvadrat"
    }
    firkant.Areal = ((firkant.Topplinje + firkant.Bunnlinje) + firkant.Hoyde) / 2;

    trapesData.push(firkant);
    genererTabell();
}

//Dette er funksjonen for del 3

function tegnTrapes(e) {
    let valgtFirkant = e.target.id;
    let x = 0;
    let y = 0;
    var c = document.querySelector("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,1000,500)
    ctx.beginPath();
    x += trapesData[valgtFirkant].Forskyvning*5;
    ctx.moveTo(x,y);
    x += trapesData[valgtFirkant].Topplinje*5;
    ctx.lineTo(x,y);
    x = trapesData[valgtFirkant].Bunnlinje*5;
    y = trapesData[valgtFirkant].Hoyde*5;
    ctx.lineTo(x,y);
    x = 0;
    ctx.lineTo(x,y);
 ctx.closePath();

    ctx.fillStyle = "#4800ff";
    ctx.fill();
   
}