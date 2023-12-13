// Típusdefiníciók
interface Termek {
  nev: string;
  ar: number;
}

// Függvény a legolcsóbb termék nevének meghatározásához
function legolcsobbTermek(termekek: Termek[]): string {
  if (termekek.length === 0) {
    return "Nincs termék megadva.";
  }

  let legolcsobb = termekek[0];

  for (let i = 1; i < termekek.length; i++) {
    if (termekek[i].ar < legolcsobb.ar) {
      legolcsobb = termekek[i];
    }
  }

  return legolcsobb.nev;
}

// Függvény az átlagár kiszámolásához
function atlagAr(termekek: Termek[]): number {
  if (termekek.length === 0) {
    return 0;
  }

  const osszeg = termekek.reduce((acc, termek) => acc + termek.ar, 0);
  return osszeg / termekek.length;
}

// Függvény az árak szórásának kiszámolásához
function arakSzorasa(termekek: Termek[]): number {
  if (termekek.length <= 1) {
    return 0;
  }

  const atlag = atlagAr(termekek);
  const negyzetekOsszege = termekek.reduce((acc, termek) => acc + Math.pow(termek.ar - atlag, 2), 0);
  return Math.sqrt(negyzetekOsszege / (termekek.length - 1));
}

// HTML elemekre való hivatkozások
const nevInput = document.getElementById("nevInput") as HTMLInputElement;
const arInput = document.getElementById("arInput") as HTMLInputElement;
const hozzaadButton = document.getElementById("hozzaadButton") as HTMLButtonElement;
const eredmenyDiv = document.getElementById("eredmenyDiv") as HTMLDivElement;
const tablaBody = document.getElementById("tablaBody") as HTMLTableSectionElement;


// Termékek tömbje
const termekek: Termek[] = [];

// Hozzáadás gomb eseménykezelője
hozzaadButton?.addEventListener("click", () => {
  const nev = nevInput.value;
  const ar = parseFloat(arInput.value);

  if (!nev || isNaN(ar)) {
    alert("Kérlek adj meg egy érvényes fantázianevet és árat!");
    return;
  }

  const ujTermek: Termek = { nev, ar };
  termekek.push(ujTermek);

  // Frissítjük az eredményeket
  frissitEredmenyeket();
  // Frissítjük a táblázatot
  frissitTabla();
});

// Eredmények frissítése
function frissitEredmenyeket() {
  const legolcsobb = legolcsobbTermek(termekek);
  const atlag = atlagAr(termekek);
  const szoras = arakSzorasa(termekek);

  if (eredmenyDiv) {
    eredmenyDiv.innerHTML = `
      <p>Legolcsóbb termék: ${legolcsobb}</p>
      <p>Átlagár: ${atlag.toFixed(2)}</p>
      <p>Árak szórása: ${szoras.toFixed(2)}</p>
    `;
  } else {
    console.error("Az eredmenyDiv elem nem található.");
  }
}
// Táblázat frissítése
function frissitTabla() {
  // Töröljük a táblázat tartalmát
  tablaBody.innerHTML = "";

  // Táblázat feltöltése a termékekkel
  termekek.forEach((termek, index) => {
    const sor = tablaBody.insertRow();

    // Név cella
    const nevCella = sor.insertCell(0);
    nevCella.textContent = termek.nev;

    // Ár cella
    const arCella = sor.insertCell(1);
    arCella.textContent = termek.ar.toFixed(2);

    // Törlés gomb cella
    const torlesCella = sor.insertCell(2);
    const torlesGomb = document.createElement("button");
    torlesGomb.textContent = "Törlés";
    torlesGomb.addEventListener("click", () => torlesTermek(index));
    torlesCella.appendChild(torlesGomb);
  });
}

// Termék törlése
function torlesTermek(index: number) {
  termekek.splice(index, 1);
  frissitEredmenyeket();
  frissitTabla();
}
