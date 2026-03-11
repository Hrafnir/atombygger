/* Version: #13 */

// === SEKSJON: Grunnstoff-database ===
// Inneholder data for alle 118 grunnstoffene i periodesystemet.
// z: Atomnummer (antall protoner)
// symbol: Kjemisk symbol
// name: Norsk navn på grunnstoffet
// standardNeutrons: Antall nøytroner i den vanligste isotopen
// group: Kjemisk gruppe (1-18, eller "-" for lantanider/aktinider)
// period: Kjemisk periode (1-7)
// x, y: Koordinater for CSS Grid visning (inkluderer gapet og blokkene i bunnen)
// category: Kategori for fargekoding (ikke-metall, edelgass, alkalimetall, etc.)
// trivia: Klar for utfylling

const elementsData = [
    { z: 1, symbol: 'H', name: 'Hydrogen', standardNeutrons: 0, group: 1, period: 1, x: 1, y: 1, category: 'ikke-metall', trivia: '' },
    { z: 2, symbol: 'He', name: 'Helium', standardNeutrons: 2, group: 18, period: 1, x: 18, y: 1, category: 'edelgass', trivia: '' },
    { z: 3, symbol: 'Li', name: 'Litium', standardNeutrons: 4, group: 1, period: 2, x: 1, y: 2, category: 'alkalimetall', trivia: '' },
    { z: 4, symbol: 'Be', name: 'Beryllium', standardNeutrons: 5, group: 2, period: 2, x: 2, y: 2, category: 'jordalkalimetall', trivia: '' },
    { z: 5, symbol: 'B', name: 'Bor', standardNeutrons: 6, group: 13, period: 2, x: 13, y: 2, category: 'halvmetall', trivia: '' },
    { z: 6, symbol: 'C', name: 'Karbon', standardNeutrons: 6, group: 14, period: 2, x: 14, y: 2, category: 'ikke-metall', trivia: '' },
    { z: 7, symbol: 'N', name: 'Nitrogen', standardNeutrons: 7, group: 15, period: 2, x: 15, y: 2, category: 'ikke-metall', trivia: '' },
    { z: 8, symbol: 'O', name: 'Oksygen', standardNeutrons: 8, group: 16, period: 2, x: 16, y: 2, category: 'ikke-metall', trivia: '' },
    { z: 9, symbol: 'F', name: 'Fluor', standardNeutrons: 10, group: 17, period: 2, x: 17, y: 2, category: 'halogen', trivia: '' },
    { z: 10, symbol: 'Ne', name: 'Neon', standardNeutrons: 10, group: 18, period: 2, x: 18, y: 2, category: 'edelgass', trivia: '' },
    { z: 11, symbol: 'Na', name: 'Natrium', standardNeutrons: 12, group: 1, period: 3, x: 1, y: 3, category: 'alkalimetall', trivia: '' },
    { z: 12, symbol: 'Mg', name: 'Magnesium', standardNeutrons: 12, group: 2, period: 3, x: 2, y: 3, category: 'jordalkalimetall', trivia: '' },
    { z: 13, symbol: 'Al', name: 'Aluminium', standardNeutrons: 14, group: 13, period: 3, x: 13, y: 3, category: 'post-innskuddsmetall', trivia: '' },
    { z: 14, symbol: 'Si', name: 'Silisium', standardNeutrons: 14, group: 14, period: 3, x: 14, y: 3, category: 'halvmetall', trivia: '' },
    { z: 15, symbol: 'P', name: 'Fosfor', standardNeutrons: 16, group: 15, period: 3, x: 15, y: 3, category: 'ikke-metall', trivia: '' },
    { z: 16, symbol: 'S', name: 'Svovel', standardNeutrons: 16, group: 16, period: 3, x: 16, y: 3, category: 'ikke-metall', trivia: '' },
    { z: 17, symbol: 'Cl', name: 'Klor', standardNeutrons: 18, group: 17, period: 3, x: 17, y: 3, category: 'halogen', trivia: '' },
    { z: 18, symbol: 'Ar', name: 'Argon', standardNeutrons: 22, group: 18, period: 3, x: 18, y: 3, category: 'edelgass', trivia: '' },
    { z: 19, symbol: 'K', name: 'Kalium', standardNeutrons: 20, group: 1, period: 4, x: 1, y: 4, category: 'alkalimetall', trivia: '' },
    { z: 20, symbol: 'Ca', name: 'Kalsium', standardNeutrons: 20, group: 2, period: 4, x: 2, y: 4, category: 'jordalkalimetall', trivia: '' },
    { z: 21, symbol: 'Sc', name: 'Scandium', standardNeutrons: 24, group: 3, period: 4, x: 3, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 22, symbol: 'Ti', name: 'Titan', standardNeutrons: 26, group: 4, period: 4, x: 4, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 23, symbol: 'V', name: 'Vanadium', standardNeutrons: 28, group: 5, period: 4, x: 5, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 24, symbol: 'Cr', name: 'Krom', standardNeutrons: 28, group: 6, period: 4, x: 6, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 25, symbol: 'Mn', name: 'Mangan', standardNeutrons: 30, group: 7, period: 4, x: 7, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 26, symbol: 'Fe', name: 'Jern', standardNeutrons: 30, group: 8, period: 4, x: 8, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 27, symbol: 'Co', name: 'Kobolt', standardNeutrons: 32, group: 9, period: 4, x: 9, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 28, symbol: 'Ni', name: 'Nikkel', standardNeutrons: 31, group: 10, period: 4, x: 10, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 29, symbol: 'Cu', name: 'Kobber', standardNeutrons: 35, group: 11, period: 4, x: 11, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 30, symbol: 'Zn', name: 'Sink', standardNeutrons: 35, group: 12, period: 4, x: 12, y: 4, category: 'innskuddsmetall', trivia: '' },
    { z: 31, symbol: 'Ga', name: 'Gallium', standardNeutrons: 39, group: 13, period: 4, x: 13, y: 4, category: 'post-innskuddsmetall', trivia: '' },
    { z: 32, symbol: 'Ge', name: 'Germanium', standardNeutrons: 41, group: 14, period: 4, x: 14, y: 4, category: 'halvmetall', trivia: '' },
    { z: 33, symbol: 'As', name: 'Arsen', standardNeutrons: 42, group: 15, period: 4, x: 15, y: 4, category: 'halvmetall', trivia: '' },
    { z: 34, symbol: 'Se', name: 'Selen', standardNeutrons: 45, group: 16, period: 4, x: 16, y: 4, category: 'ikke-metall', trivia: '' },
    { z: 35, symbol: 'Br', name: 'Brom', standardNeutrons: 45, group: 17, period: 4, x: 17, y: 4, category: 'halogen', trivia: '' },
    { z: 36, symbol: 'Kr', name: 'Krypton', standardNeutrons: 48, group: 18, period: 4, x: 18, y: 4, category: 'edelgass', trivia: '' },
    { z: 37, symbol: 'Rb', name: 'Rubidium', standardNeutrons: 48, group: 1, period: 5, x: 1, y: 5, category: 'alkalimetall', trivia: '' },
    { z: 38, symbol: 'Sr', name: 'Strontium', standardNeutrons: 50, group: 2, period: 5, x: 2, y: 5, category: 'jordalkalimetall', trivia: '' },
    { z: 39, symbol: 'Y', name: 'Yttrium', standardNeutrons: 50, group: 3, period: 5, x: 3, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 40, symbol: 'Zr', name: 'Zirkonium', standardNeutrons: 51, group: 4, period: 5, x: 4, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 41, symbol: 'Nb', name: 'Niob', standardNeutrons: 52, group: 5, period: 5, x: 5, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 42, symbol: 'Mo', name: 'Molybden', standardNeutrons: 54, group: 6, period: 5, x: 6, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 43, symbol: 'Tc', name: 'Technetium', standardNeutrons: 55, group: 7, period: 5, x: 7, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 44, symbol: 'Ru', name: 'Ruthenium', standardNeutrons: 57, group: 8, period: 5, x: 8, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 45, symbol: 'Rh', name: 'Rhodium', standardNeutrons: 58, group: 9, period: 5, x: 9, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 46, symbol: 'Pd', name: 'Palladium', standardNeutrons: 60, group: 10, period: 5, x: 10, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 47, symbol: 'Ag', name: 'Sølv', standardNeutrons: 61, group: 11, period: 5, x: 11, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 48, symbol: 'Cd', name: 'Kadmium', standardNeutrons: 64, group: 12, period: 5, x: 12, y: 5, category: 'innskuddsmetall', trivia: '' },
    { z: 49, symbol: 'In', name: 'Indium', standardNeutrons: 66, group: 13, period: 5, x: 13, y: 5, category: 'post-innskuddsmetall', trivia: '' },
    { z: 50, symbol: 'Sn', name: 'Tinn', standardNeutrons: 69, group: 14, period: 5, x: 14, y: 5, category: 'post-innskuddsmetall', trivia: '' },
    { z: 51, symbol: 'Sb', name: 'Antimon', standardNeutrons: 71, group: 15, period: 5, x: 15, y: 5, category: 'halvmetall', trivia: '' },
    { z: 52, symbol: 'Te', name: 'Tellur', standardNeutrons: 76, group: 16, period: 5, x: 16, y: 5, category: 'halvmetall', trivia: '' },
    { z: 53, symbol: 'I', name: 'Jod', standardNeutrons: 74, group: 17, period: 5, x: 17, y: 5, category: 'halogen', trivia: '' },
    { z: 54, symbol: 'Xe', name: 'Xenon', standardNeutrons: 77, group: 18, period: 5, x: 18, y: 5, category: 'edelgass', trivia: '' },
    { z: 55, symbol: 'Cs', name: 'Cesium', standardNeutrons: 78, group: 1, period: 6, x: 1, y: 6, category: 'alkalimetall', trivia: '' },
    { z: 56, symbol: 'Ba', name: 'Barium', standardNeutrons: 81, group: 2, period: 6, x: 2, y: 6, category: 'jordalkalimetall', trivia: '' },
    
    // Lantanider (f-blokk rad 1) - x-koordinater plasserer dem under rutenettet
    { z: 57, symbol: 'La', name: 'Lantan', standardNeutrons: 82, group: '-', period: 6, x: 4, y: 9, category: 'lantanoid', trivia: '' },
    { z: 58, symbol: 'Ce', name: 'Cerium', standardNeutrons: 82, group: '-', period: 6, x: 5, y: 9, category: 'lantanoid', trivia: '' },
    { z: 59, symbol: 'Pr', name: 'Praseodym', standardNeutrons: 82, group: '-', period: 6, x: 6, y: 9, category: 'lantanoid', trivia: '' },
    { z: 60, symbol: 'Nd', name: 'Neodym', standardNeutrons: 84, group: '-', period: 6, x: 7, y: 9, category: 'lantanoid', trivia: '' },
    { z: 61, symbol: 'Pm', name: 'Promethium', standardNeutrons: 84, group: '-', period: 6, x: 8, y: 9, category: 'lantanoid', trivia: '' },
    { z: 62, symbol: 'Sm', name: 'Samarium', standardNeutrons: 88, group: '-', period: 6, x: 9, y: 9, category: 'lantanoid', trivia: '' },
    { z: 63, symbol: 'Eu', name: 'Europium', standardNeutrons: 89, group: '-', period: 6, x: 10, y: 9, category: 'lantanoid', trivia: '' },
    { z: 64, symbol: 'Gd', name: 'Gadolinium', standardNeutrons: 93, group: '-', period: 6, x: 11, y: 9, category: 'lantanoid', trivia: '' },
    { z: 65, symbol: 'Tb', name: 'Terbium', standardNeutrons: 94, group: '-', period: 6, x: 12, y: 9, category: 'lantanoid', trivia: '' },
    { z: 66, symbol: 'Dy', name: 'Dysprosium', standardNeutrons: 96, group: '-', period: 6, x: 13, y: 9, category: 'lantanoid', trivia: '' },
    { z: 67, symbol: 'Ho', name: 'Holmium', standardNeutrons: 98, group: '-', period: 6, x: 14, y: 9, category: 'lantanoid', trivia: '' },
    { z: 68, symbol: 'Er', name: 'Erbium', standardNeutrons: 99, group: '-', period: 6, x: 15, y: 9, category: 'lantanoid', trivia: '' },
    { z: 69, symbol: 'Tm', name: 'Tulium', standardNeutrons: 100, group: '-', period: 6, x: 16, y: 9, category: 'lantanoid', trivia: '' },
    { z: 70, symbol: 'Yb', name: 'Ytterbium', standardNeutrons: 103, group: '-', period: 6, x: 17, y: 9, category: 'lantanoid', trivia: '' },
    { z: 71, symbol: 'Lu', name: 'Lutetium', standardNeutrons: 104, group: '-', period: 6, x: 18, y: 9, category: 'lantanoid', trivia: '' },
    
    // Tilbake til hovedtabellen periode 6
    { z: 72, symbol: 'Hf', name: 'Hafnium', standardNeutrons: 106, group: 4, period: 6, x: 4, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 73, symbol: 'Ta', name: 'Tantal', standardNeutrons: 108, group: 5, period: 6, x: 5, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 74, symbol: 'W', name: 'Wolfram', standardNeutrons: 110, group: 6, period: 6, x: 6, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 75, symbol: 'Re', name: 'Rhenium', standardNeutrons: 111, group: 7, period: 6, x: 7, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 76, symbol: 'Os', name: 'Osmium', standardNeutrons: 114, group: 8, period: 6, x: 8, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 77, symbol: 'Ir', name: 'Iridium', standardNeutrons: 115, group: 9, period: 6, x: 9, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 78, symbol: 'Pt', name: 'Platina', standardNeutrons: 117, group: 10, period: 6, x: 10, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 79, symbol: 'Au', name: 'Gull', standardNeutrons: 118, group: 11, period: 6, x: 11, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 80, symbol: 'Hg', name: 'Kvikksølv', standardNeutrons: 121, group: 12, period: 6, x: 12, y: 6, category: 'innskuddsmetall', trivia: '' },
    { z: 81, symbol: 'Tl', name: 'Thallium', standardNeutrons: 123, group: 13, period: 6, x: 13, y: 6, category: 'post-innskuddsmetall', trivia: '' },
    { z: 82, symbol: 'Pb', name: 'Bly', standardNeutrons: 125, group: 14, period: 6, x: 14, y: 6, category: 'post-innskuddsmetall', trivia: '' },
    { z: 83, symbol: 'Bi', name: 'Vismut', standardNeutrons: 126, group: 15, period: 6, x: 15, y: 6, category: 'post-innskuddsmetall', trivia: '' },
    { z: 84, symbol: 'Po', name: 'Polonium', standardNeutrons: 125, group: 16, period: 6, x: 16, y: 6, category: 'halvmetall', trivia: '' },
    { z: 85, symbol: 'At', name: 'Astat', standardNeutrons: 125, group: 17, period: 6, x: 17, y: 6, category: 'halogen', trivia: '' },
    { z: 86, symbol: 'Rn', name: 'Radon', standardNeutrons: 136, group: 18, period: 6, x: 18, y: 6, category: 'edelgass', trivia: '' },
    { z: 87, symbol: 'Fr', name: 'Francium', standardNeutrons: 136, group: 1, period: 7, x: 1, y: 7, category: 'alkalimetall', trivia: '' },
    { z: 88, symbol: 'Ra', name: 'Radium', standardNeutrons: 138, group: 2, period: 7, x: 2, y: 7, category: 'jordalkalimetall', trivia: '' },
    
    // Aktinider (f-blokk rad 2)
    { z: 89, symbol: 'Ac', name: 'Actinium', standardNeutrons: 138, group: '-', period: 7, x: 4, y: 10, category: 'aktinoid', trivia: '' },
    { z: 90, symbol: 'Th', name: 'Thorium', standardNeutrons: 142, group: '-', period: 7, x: 5, y: 10, category: 'aktinoid', trivia: '' },
    { z: 91, symbol: 'Pa', name: 'Protactinium', standardNeutrons: 140, group: '-', period: 7, x: 6, y: 10, category: 'aktinoid', trivia: '' },
    { z: 92, symbol: 'U', name: 'Uran', standardNeutrons: 146, group: '-', period: 7, x: 7, y: 10, category: 'aktinoid', trivia: '' },
    { z: 93, symbol: 'Np', name: 'Neptunium', standardNeutrons: 144, group: '-', period: 7, x: 8, y: 10, category: 'aktinoid', trivia: '' },
    { z: 94, symbol: 'Pu', name: 'Plutonium', standardNeutrons: 150, group: '-', period: 7, x: 9, y: 10, category: 'aktinoid', trivia: '' },
    { z: 95, symbol: 'Am', name: 'Americium', standardNeutrons: 148, group: '-', period: 7, x: 10, y: 10, category: 'aktinoid', trivia: '' },
    { z: 96, symbol: 'Cm', name: 'Curium', standardNeutrons: 151, group: '-', period: 7, x: 11, y: 10, category: 'aktinoid', trivia: '' },
    { z: 97, symbol: 'Bk', name: 'Berkelium', standardNeutrons: 150, group: '-', period: 7, x: 12, y: 10, category: 'aktinoid', trivia: '' },
    { z: 98, symbol: 'Cf', name: 'Californium', standardNeutrons: 153, group: '-', period: 7, x: 13, y: 10, category: 'aktinoid', trivia: '' },
    { z: 99, symbol: 'Es', name: 'Einsteinium', standardNeutrons: 153, group: '-', period: 7, x: 14, y: 10, category: 'aktinoid', trivia: '' },
    { z: 100, symbol: 'Fm', name: 'Fermium', standardNeutrons: 157, group: '-', period: 7, x: 15, y: 10, category: 'aktinoid', trivia: '' },
    { z: 101, symbol: 'Md', name: 'Mendelevium', standardNeutrons: 157, group: '-', period: 7, x: 16, y: 10, category: 'aktinoid', trivia: '' },
    { z: 102, symbol: 'No', name: 'Nobelium', standardNeutrons: 157, group: '-', period: 7, x: 17, y: 10, category: 'aktinoid', trivia: '' },
    { z: 103, symbol: 'Lr', name: 'Lawrencium', standardNeutrons: 159, group: '-', period: 7, x: 18, y: 10, category: 'aktinoid', trivia: '' },

    // Tilbake til hovedtabellen periode 7
    { z: 104, symbol: 'Rf', name: 'Rutherfordium', standardNeutrons: 163, group: 4, period: 7, x: 4, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 105, symbol: 'Db', name: 'Dubnium', standardNeutrons: 163, group: 5, period: 7, x: 5, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 106, symbol: 'Sg', name: 'Seaborgium', standardNeutrons: 165, group: 6, period: 7, x: 6, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 107, symbol: 'Bh', name: 'Bohrium', standardNeutrons: 165, group: 7, period: 7, x: 7, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 108, symbol: 'Hs', name: 'Hassium', standardNeutrons: 162, group: 8, period: 7, x: 8, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 109, symbol: 'Mt', name: 'Meitnerium', standardNeutrons: 167, group: 9, period: 7, x: 9, y: 7, category: 'ukjent', trivia: '' },
    { z: 110, symbol: 'Ds', name: 'Darmstadtium', standardNeutrons: 171, group: 10, period: 7, x: 10, y: 7, category: 'ukjent', trivia: '' },
    { z: 111, symbol: 'Rg', name: 'Røntgenium', standardNeutrons: 169, group: 11, period: 7, x: 11, y: 7, category: 'ukjent', trivia: '' },
    { z: 112, symbol: 'Cn', name: 'Copernicium', standardNeutrons: 173, group: 12, period: 7, x: 12, y: 7, category: 'innskuddsmetall', trivia: '' },
    { z: 113, symbol: 'Nh', name: 'Nihonium', standardNeutrons: 171, group: 13, period: 7, x: 13, y: 7, category: 'ukjent', trivia: '' },
    { z: 114, symbol: 'Fl', name: 'Flerovium', standardNeutrons: 175, group: 14, period: 7, x: 14, y: 7, category: 'ukjent', trivia: '' },
    { z: 115, symbol: 'Mc', name: 'Moscovium', standardNeutrons: 173, group: 15, period: 7, x: 15, y: 7, category: 'ukjent', trivia: '' },
    { z: 116, symbol: 'Lv', name: 'Livermorium', standardNeutrons: 177, group: 16, period: 7, x: 16, y: 7, category: 'ukjent', trivia: '' },
    { z: 117, symbol: 'Ts', name: 'Tenness', standardNeutrons: 177, group: 17, period: 7, x: 17, y: 7, category: 'ukjent', trivia: '' },
    { z: 118, symbol: 'Og', name: 'Oganesson', standardNeutrons: 176, group: 18, period: 7, x: 18, y: 7, category: 'ukjent', trivia: '' }
];

console.log(`[System] elements.js oppdatert med ${elementsData.length} grunnstoffer og grid-koordinater.`);

/* Version: #13 */
