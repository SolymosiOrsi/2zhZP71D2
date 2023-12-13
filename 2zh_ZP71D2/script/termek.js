"use strict";

// Paralelogramma kód
function szamolTeruletMagassaggal(alap, magassag) {
    return alap * magassag;
}

function szamolTeruletEsOldallal(oldalA, oldalB, szogRad) {
    return oldalA * oldalB * Math.sin(szogRad);
}

// Véletlenszerű kiválasztás kód
function valasszVeletlenszeruen(lista) {
    if (lista.length < 3) {
        console.error("Hiba: A bemeneti lista nem tartalmaz elég elemet.");
        return [];
    }
    var valasztottak = lista.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
    return valasztottak;
}

// Termék kód
var termekek = [];

var hozzaadButton = document.getElementById("hozzaadButton");
var eredmenyDiv = document.getElementById("eredmenyDiv");
var tablaBody = document.getElementById("tablaBody");

hozzaadButton.addEventListener("click", function () {
    var nev = document.getElementById("nevInput").value;
    var ar = parseFloat(document.getElementById("arInput").value);

    // Add the product to the array
    termekek.push({ nev: nev, ar: ar });

    // Display products in the table
    updateTable();

    // Display additional information (cheapest product, average price, price variation)
    displayAdditionalInformation();
});

// Function to update the table with products
function updateTable() {
    // Clear the table body
    tablaBody.innerHTML = "";

    // Populate the table with products
    for (var i = 0; i < termekek.length; i++) {
        var row = tablaBody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = termekek[i].nev;
        cell2.innerHTML = termekek[i].ar.toFixed(2);
        cell3.innerHTML = "<button onclick='deleteProduct(" + i + ")'>Törlés</button>";
    }
}

// Function to delete a product
function deleteProduct(index) {
    termekek.splice(index, 1);
    updateTable();

    // Update additional information after deleting a product
    displayAdditionalInformation();
}

// Function to display additional information (cheapest product, average price, price variation)
function displayAdditionalInformation() {
    if (termekek.length > 0) {
        var cheapestProduct = legolcsobbTermek(termekek);
        var averagePrice = atlagAr(termekek);
        var priceVariation = arakSzorasa(termekek);

        eredmenyDiv.innerHTML = "Legolcsóbb termék: " + cheapestProduct.nev + " - Ára: " + cheapestProduct.ar.toFixed(2) + "<br>" +
            "Átlagár: " + averagePrice.toFixed(2) + "<br>" +
            "Árak szórása: " + priceVariation.toFixed(2);
    } else {
        eredmenyDiv.innerHTML = "Nincs termék megadva.";
    }
}

// Function to calculate the cheapest product
function legolcsobbTermek(termekek) {
    if (termekek.length === 0) {
        return { nev: "Nincs termék megadva.", ar: 0 };
    }
    var legolcsobb = termekek[0];
    for (var i = 1; i < termekek.length; i++) {
        if (termekek[i].ar < legolcsobb.ar) {
            legolcsobb = termekek[i];
        }
    }
    return legolcsobb;
}

// Function to calculate the average price
function atlagAr(termekek) {
    if (termekek.length === 0) {
        return 0;
    }
    var osszeg = termekek.reduce(function (acc, termek) { return acc + termek.ar; }, 0);
    return osszeg / termekek.length;
}

// Function to calculate the price variation
function arakSzorasa(termekek) {
    if (termekek.length <= 1) {
        return 0;
    }
    var atlag = atlagAr(termekek);
    var negyzetekOsszege = termekek.reduce(function (acc, termek) { return acc + Math.pow(termek.ar - atlag, 2); }, 0);
    return Math.sqrt(negyzetekOsszege / (termekek.length - 1));
}
"use strict";

var szamolButton = document.getElementById("szamolButton");
var paralelogrammaEredmenyDiv = document.getElementById("paralelogrammaEredmenyDiv");

szamolButton.addEventListener("click", function () {
    var alap = parseFloat(document.getElementById("alapInput").value);
    var magassag = parseFloat(document.getElementById("magassagInput").value);
    var oldalA = parseFloat(document.getElementById("oldalAInput").value);
    var oldalB = parseFloat(document.getElementById("oldalBInput").value);
    var szog = parseFloat(document.getElementById("szogInput").value);

    var szogRad = (szog * Math.PI) / 180;

    var terulet1 = szamolTeruletMagassaggal(alap, magassag);
    var terulet2 = szamolTeruletEsOldallal(oldalA, oldalB, szogRad);

    paralelogrammaEredmenyDiv.innerHTML = "Paralelogramma területe magassággal: " + terulet1 + "<br>" +
        "Paralelogramma területe oldallal és szöggel: " + terulet2;
});
"use strict";

var valasztButton = document.getElementById("valasztButton");
var valasztEredmenyDiv = document.getElementById("valasztEredmenyDiv");

valasztButton.addEventListener("click", function () {
    var listaInput = document.getElementById("listaInput").value;
    var bemenet = listaInput.split(',').map(function (s) { return s.trim(); });

    var eredmeny = valasszVeletlenszeruen(bemenet);

    // Kiírjuk az eredményt
    valasztEredmenyDiv.innerHTML = "Véletlenszerűen kiválasztott elemek: " + eredmeny.join(", ");
});
