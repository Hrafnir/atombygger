/* Version: #4 */

// === SEKSJON: Grunnstoff-database ===
// Inneholder data for de første 20 grunnstoffene i periodesystemet.
// z: Atomnummer (antall protoner)
// symbol: Kjemisk symbol
// name: Norsk navn på grunnstoffet
// standardNeutrons: Antall nøytroner i den vanligste isotopen (brukes for å sjekke om vi har en vanlig isotop)

const elementsData = [
    { z: 1, symbol: 'H', name: 'Hydrogen', standardNeutrons: 0 },
    { z: 2, symbol: 'He', name: 'Helium', standardNeutrons: 2 },
    { z: 3, symbol: 'Li', name: 'Litium', standardNeutrons: 4 },
    { z: 4, symbol: 'Be', name: 'Beryllium', standardNeutrons: 5 },
    { z: 5, symbol: 'B', name: 'Bor', standardNeutrons: 6 },
    { z: 6, symbol: 'C', name: 'Karbon', standardNeutrons: 6 },
    { z: 7, symbol: 'N', name: 'Nitrogen', standardNeutrons: 7 },
    { z: 8, symbol: 'O', name: 'Oksygen', standardNeutrons: 8 },
    { z: 9, symbol: 'F', name: 'Fluor', standardNeutrons: 10 },
    { z: 10, symbol: 'Ne', name: 'Neon', standardNeutrons: 10 },
    { z: 11, symbol: 'Na', name: 'Natrium', standardNeutrons: 12 },
    { z: 12, symbol: 'Mg', name: 'Magnesium', standardNeutrons: 12 },
    { z: 13, symbol: 'Al', name: 'Aluminium', standardNeutrons: 14 },
    { z: 14, symbol: 'Si', name: 'Silisium', standardNeutrons: 14 },
    { z: 15, symbol: 'P', name: 'Fosfor', standardNeutrons: 16 },
    { z: 16, symbol: 'S', name: 'Svovel', standardNeutrons: 16 },
    { z: 17, symbol: 'Cl', name: 'Klor', standardNeutrons: 18 },
    { z: 18, symbol: 'Ar', name: 'Argon', standardNeutrons: 22 },
    { z: 19, symbol: 'K', name: 'Kalium', standardNeutrons: 20 },
    { z: 20, symbol: 'Ca', name: 'Kalsium', standardNeutrons: 20 }
];

console.log(`[System] elements.js er lastet inn med ${elementsData.length} grunnstoffer.`);

/* Version: #4 */
