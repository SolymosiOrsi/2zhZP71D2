"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
function szamolTeruletMagassaggal(alap, magassag) {
    return alap * magassag;
}
function szamolTeruletEsOldallal(oldalA, oldalB, szogRad) {
    return oldalA * oldalB * Math.sin(szogRad);
}
// Felhasználótól adatok bekérése
var alap = parseFloat(readlineSync.question("Adja meg a paralelogramma alapjat (szam): "));
var magassag = parseFloat(readlineSync.question("Adja meg a paralelogramma magassagat (szam): "));
var oldalA = parseFloat(readlineSync.question("Adja meg az elso oldalt (szam): "));
var oldalB = parseFloat(readlineSync.question("Adja meg a masodik oldalt (szam): "));
var szog = parseFloat(readlineSync.question("Adja meg a szoget fokban (szam): "));
// Szög átváltása radiánba
var szogRad = (szog * Math.PI) / 180;
// Terület kiszámolása mindkét módszerrel
var terulet1 = szamolTeruletMagassaggal(alap, magassag);
var terulet2 = szamolTeruletEsOldallal(oldalA, oldalB, szogRad);
// Eredmény kiírása
console.log("Paralelogramma ter\u00FClete magass\u00E1ggal: ".concat(terulet1));
console.log("Paralelogramma ter\u00FClete oldallal \u00E9s sz\u00F6ggel: ".concat(terulet2));
