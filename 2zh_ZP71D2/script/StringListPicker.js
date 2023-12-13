"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
function valasszVeletlenszeruen(lista) {
    if (lista.length < 3) {
        console.error("Hiba: A bemeneti lista nem tartalmaz elég elemet.");
        return [];
    }
    var valasztottak = lista.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
    return valasztottak;
}
// Felhasználótól bemeneti lista kérése
var bemenetString = readlineSync.question("Adjon meg egy vesszovel elvalasztott sztring listat (pl.: elso, masodik, harmadik): ");
var bemenet = bemenetString.split(',').map(function (s) { return s.trim(); });
// Véletlenszerűen kiválasztott 3 elem
var eredmeny = valasszVeletlenszeruen(bemenet);
// Kiírjuk az eredményt
console.log("Véletlenszerűen kiválasztott elemek:", eredmeny);
