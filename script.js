/* Version: #28 */

// === SEKSJON: Tilstand (State) ===
// Her lagrer vi de nåværende dataene for byggeflaten vår.
const atomState = {
    protons: 0,
    neutrons: 0,
    electrons: 0
};

// === SEKSJON: DOM-elementer ===
// Faner
const tabBuild = document.getElementById('tab-build');
const tabPeriodic = document.getElementById('tab-periodic');
const tabTheory = document.getElementById('tab-theory');
const tabLab = document.getElementById('tab-lab'); // Ny i Versjon 28

// Seksjoner (Visninger)
const sectionBuild = document.getElementById('build-section');
const sectionPeriodic = document.getElementById('periodic-section');
const sectionTheory = document.getElementById('theory-section');
const sectionLab = document.getElementById('lab-section'); // Ny i Versjon 28

// Knapper for partikler (Pluss)
const btnAddProton = document.getElementById('btn-add-proton');
const btnAddNeutron = document.getElementById('btn-add-neutron');
const btnAddElectron = document.getElementById('btn-add-electron');

// Knapper for partikler (Minus)
const btnRemoveProton = document.getElementById('btn-remove-proton');
const btnRemoveNeutron = document.getElementById('btn-remove-neutron');
const btnRemoveElectron = document.getElementById('btn-remove-electron');

const btnReset = document.getElementById('btn-reset');

// Analyse-panel elementer
const infoElement = document.getElementById('info-element');
const infoSymbol = document.getElementById('info-symbol');
const infoAtomicNumber = document.getElementById('info-atomic-number');
const infoMass = document.getElementById('info-mass');
const infoAtomicWeight = document.getElementById('info-atomic-weight');
const infoCharge = document.getElementById('info-charge');
const infoState = document.getElementById('info-state');
const infoTrivia = document.getElementById('info-trivia');

// Byggeflate elementer
const nucleusContainer = document.getElementById('nucleus-container');
const shellsContainer = document.getElementById('shells-container');

// Periodesystem elementer
const periodicGrid = document.getElementById('periodic-table-grid');

// === SEKSJON: Fane-navigasjon ===
function switchTab(tabName) {
    console.log(`[Navigasjon] Forsøker å bytte til fane: ${tabName}`);
    
    // Nullstill alle faner
    tabBuild.classList.remove('active');
    tabPeriodic.classList.remove('active');
    tabTheory.classList.remove('active');
    tabLab.classList.remove('active');
    
    sectionBuild.classList.add('hidden');
    sectionPeriodic.classList.add('hidden');
    sectionTheory.classList.add('hidden');
    sectionLab.classList.add('hidden');

    // Aktiver valgt fane
    if (tabName === 'build') {
        tabBuild.classList.add('active');
        sectionBuild.classList.remove('hidden');
        console.log('[Navigasjon] Viser Byggeflate.');
    } else if (tabName === 'periodic') {
        tabPeriodic.classList.add('active');
        sectionPeriodic.classList.remove('hidden');
        console.log('[Navigasjon] Viser Periodesystem.');
    } else if (tabName === 'theory') {
        tabTheory.classList.add('active');
        sectionTheory.classList.remove('hidden');
        console.log('[Navigasjon] Viser Teori.');
    } else if (tabName === 'lab') {
        tabLab.classList.add('active');
        sectionLab.classList.remove('hidden');
        console.log('[Navigasjon] Viser Kjemilab.');
    }
}

tabBuild.addEventListener('click', () => switchTab('build'));
tabPeriodic.addEventListener('click', () => switchTab('periodic'));
tabTheory.addEventListener('click', () => switchTab('theory'));
tabLab.addEventListener('click', () => switchTab('lab'));

// === SEKSJON: Periodesystem ===
function generatePeriodicTable() {
    console.log('[Periodesystem] Genererer visuelt rutenett...');
    
    if (typeof elementsData === 'undefined') {
        console.error('[Periodesystem] FEIL: elementsData er ikke definert. Sjekk at elements.js er lastet.');
        return;
    }

    periodicGrid.innerHTML = '';

    // 1. Generer Gruppenummer (1-18) øverst
    for (let i = 1; i <= 18; i++) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-number';
        groupHeader.style.gridColumn = i;
        groupHeader.style.gridRow = 1;
        groupHeader.textContent = i;
        periodicGrid.appendChild(groupHeader);
    }

    // 2. Generer Grunnstoffene
    elementsData.forEach(element => {
        const box = document.createElement('div');
        box.className = 'element-box';
        
        if (element.category) {
            box.classList.add(element.category);
        }

        if (element.x && element.y) {
            box.style.gridColumn = element.x;
            box.style.gridRow = element.y + 1; 
        }
        
        const numberEl = document.createElement('div');
        numberEl.className = 'element-number';
        numberEl.textContent = element.z;

        const symbolEl = document.createElement('div');
        symbolEl.className = 'element-symbol';
        symbolEl.textContent = element.symbol;
        
        const weightEl = document.createElement('div');
        weightEl.className = 'element-weight';
        weightEl.textContent = element.atomicWeight;

        box.appendChild(numberEl);
        box.appendChild(symbolEl);
        box.appendChild(weightEl);

        box.addEventListener('click', () => {
            console.log(`[Periodesystem] Valgte grunnstoff: ${element.name} (Z=${element.z})`);
            
            atomState.protons = element.z;
            atomState.electrons = element.z; 
            atomState.neutrons = element.standardNeutrons;
            
            updateUI();
            switchTab('build');
        });

        periodicGrid.appendChild(box);
    });
}

// === SEKSJON: Visuell Tegning (Atombygger) ===
function drawAtom() {
    nucleusContainer.innerHTML = '';
    shellsContainer.innerHTML = '';

    const totalNucleons = atomState.protons + atomState.neutrons;
    
    const MAX_VISIBLE_NUCLEONS = 20;
    let visibleProtons = atomState.protons;
    let visibleNeutrons = atomState.neutrons;

    if (totalNucleons > MAX_VISIBLE_NUCLEONS) {
        const ratio = MAX_VISIBLE_NUCLEONS / totalNucleons;
        visibleProtons = Math.round(atomState.protons * ratio);
        visibleNeutrons = MAX_VISIBLE_NUCLEONS - visibleProtons;
    }

    const scatterRadius = 5 + ((visibleProtons + visibleNeutrons) * 0.8);

    function createScatteredNucleon(type, symbol) {
        const el = document.createElement('div');
        el.className = `particle ${type}`;
        if (symbol) el.textContent = symbol;
        
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * scatterRadius; 
        
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        
        return el;
    }
    
    for(let i = 0; i < visibleProtons; i++) {
        nucleusContainer.appendChild(createScatteredNucleon('proton', '+'));
    }
    
    for(let i = 0; i < visibleNeutrons; i++) {
        nucleusContainer.appendChild(createScatteredNucleon('neutron', ''));
    }

    if (totalNucleons > MAX_VISIBLE_NUCLEONS) {
        const label = document.createElement('div');
        label.className = 'nucleus-label';
        label.textContent = `${atomState.protons} p⁺ | ${atomState.neutrons} n⁰`;
        nucleusContainer.appendChild(label);
    }

    const maxPerShell = [2, 8, 8, 18, 18, 32, 32]; 
    let remainingElectrons = atomState.electrons;
    
    let tempElectrons = remainingElectrons;
    let totalShells = 0;
    for (let cap of maxPerShell) {
        if (tempElectrons > 0) {
            totalShells++;
            tempElectrons -= cap;
        } else break;
    }

    let baseShellRadius = 40 + scatterRadius; 
    let shellGap = 35; 

    const maxAllowedRadius = 180; 
    const estimatedMaxRadius = baseShellRadius + (totalShells > 0 ? (totalShells - 1) * shellGap : 0);

    if (estimatedMaxRadius > maxAllowedRadius) {
        const scaleFactor = maxAllowedRadius / estimatedMaxRadius;
        baseShellRadius *= scaleFactor;
        shellGap *= scaleFactor;
    }

    let currentShellIndex = 0;
    while(remainingElectrons > 0) {
        const capacity = maxPerShell[currentShellIndex] || 32;
        const electronsInThisShell = Math.min(remainingElectrons, capacity);
        
        const radius = baseShellRadius + (currentShellIndex * shellGap);
        const diameter = radius * 2;
        
        const shellEl = document.createElement('div');
        shellEl.className = 'shell';
        shellEl.style.width = `${diameter}px`;
        shellEl.style.height = `${diameter}px`;
        shellsContainer.appendChild(shellEl);

        for(let i = 0; i < electronsInThisShell; i++) {
            const e = document.createElement('div');
            e.className = 'particle electron';
            e.textContent = '-';
            
            const angle = (i / electronsInThisShell) * 2 * Math.PI;
            
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);
            
            e.style.left = `${x}px`;
            e.style.top = `${y}px`;
            e.style.transform = 'translate(-50%, -50%)';
            
            shellEl.appendChild(e);
        }

        remainingElectrons -= electronsInThisShell;
        currentShellIndex++;
        
        if (currentShellIndex > 7) break;
    }
}

// === SEKSJON: Analyse og UI Oppdatering ===
function updateUI() {
    analyzeAtom();
    drawAtom();
}

function analyzeAtom() {
    const z = atomState.protons;
    const n = atomState.neutrons;
    const e = atomState.electrons;
    
    const element = typeof elementsData !== 'undefined' ? elementsData.find(el => el.z === z) : null;
    
    if (z === 0) {
        infoElement.textContent = "Ingen";
        infoSymbol.textContent = "-";
        infoAtomicWeight.textContent = "0";
        infoTrivia.textContent = "Bygg et atom eller velg fra periodesystemet for å lære mer!";
    } else if (element) {
        infoElement.textContent = element.name;
        infoSymbol.textContent = element.symbol;
        infoAtomicWeight.textContent = element.atomicWeight;
        infoTrivia.textContent = `Visste du at ${element.name} har atomnummer ${element.z} og befinner seg i gruppe ${element.group}? Sjekk "Teori"-fanen for å lære hva dette betyr!`;
    } else {
        infoElement.textContent = "Ukjent (utenfor databasen)";
        infoSymbol.textContent = "?";
        infoAtomicWeight.textContent = "?";
        infoTrivia.textContent = "Denne partikkelkombinasjonen eksisterer ikke som et kjent grunnstoff i naturen.";
    }

    const mass = z + n;
    infoAtomicNumber.textContent = z;
    infoMass.textContent = mass;

    const charge = z - e;
    let chargeStr = "0";
    if (charge > 0) chargeStr = "+" + charge;
    else if (charge < 0) chargeStr = charge.toString();
    
    infoCharge.textContent = chargeStr;

    let stateStr = "Tomt";
    if (z === 0 && (n > 0 || e > 0)) {
        stateStr = "Løse partikler";
    } else if (z > 0) {
        const isIon = charge !== 0;
        let isIsotope = false;
        if (element) isIsotope = n !== element.standardNeutrons;

        if (isIon && isIsotope) stateStr = "Ion og Isotop";
        else if (isIon) stateStr = "Ion";
        else if (isIsotope) stateStr = "Isotop";
        else stateStr = "Nøytralt atom";
    }
    infoState.textContent = stateStr;
}

// === SEKSJON: Partikkel-logikk ===
function updateParticleCount(particleType, amount) {
    if (particleType === 'proton') atomState.protons += amount;
    else if (particleType === 'neutron') atomState.neutrons += amount;
    else if (particleType === 'electron') atomState.electrons += amount;

    if (atomState.protons < 0) atomState.protons = 0;
    if (atomState.neutrons < 0) atomState.neutrons = 0;
    if (atomState.electrons < 0) atomState.electrons = 0;

    updateUI();
}

function resetAtom() {
    atomState.protons = 0;
    atomState.neutrons = 0;
    atomState.electrons = 0;
    updateUI();
}

btnAddProton.addEventListener('click', () => updateParticleCount('proton', 1));
btnAddNeutron.addEventListener('click', () => updateParticleCount('neutron', 1));
btnAddElectron.addEventListener('click', () => updateParticleCount('electron', 1));

btnRemoveProton.addEventListener('click', () => updateParticleCount('proton', -1));
btnRemoveNeutron.addEventListener('click', () => updateParticleCount('neutron', -1));
btnRemoveElectron.addEventListener('click', () => updateParticleCount('electron', -1));

btnReset.addEventListener('click', resetAtom);

// === SEKSJON: Kjemilab (Molekyler & Salter) ===
let labMode = 'covalent'; // 'covalent' (Molekyl) eller 'ionic' (Salt)
let labSelectedElements = []; // Holder oversikt over valgte atomer, f.eks ['H', 'H', 'O']

const btnBondCovalent = document.getElementById('btn-bond-covalent');
const btnBondIonic = document.getElementById('btn-bond-ionic');
const labElementTray = document.getElementById('lab-element-tray');
const labSelectedText = document.getElementById('lab-selected-text');
const btnLabSynthesize = document.getElementById('btn-lab-synthesize');
const btnLabClear = document.getElementById('btn-lab-clear');
const labVisualCanvas = document.getElementById('lab-visual-canvas');
const labResultFormula = document.getElementById('lab-result-formula');
const labResultName = document.getElementById('lab-result-name');
const labResultType = document.getElementById('lab-result-type');
const labResultStatus = document.getElementById('lab-result-status');

// Oppskriftsbok over kjente stoffer (Fasit)
const labRecipes = [
    { formula: 'H₂O', name: 'Vann', type: 'covalent', atoms: ['H', 'H', 'O'] },
    { formula: 'CO₂', name: 'Karbondioksid', type: 'covalent', atoms: ['C', 'O', 'O'] },
    { formula: 'O₂', name: 'Oksygengass', type: 'covalent', atoms: ['O', 'O'] },
    { formula: 'N₂', name: 'Nitrogengass', type: 'covalent', atoms: ['N', 'N'] },
    { formula: 'CH₄', name: 'Metan', type: 'covalent', atoms: ['C', 'H', 'H', 'H', 'H'] },
    { formula: 'NaCl', name: 'Natriumklorid (Koksalt)', type: 'ionic', atoms: ['Cl', 'Na'] }, // Alfabetisk rekkefølge for sjekk
    { formula: 'FeO', name: 'Jern(II)oksid (Rust)', type: 'ionic', atoms: ['Fe', 'O'] },
    { formula: 'MgCl₂', name: 'Magnesiumklorid', type: 'ionic', atoms: ['Cl', 'Cl', 'Mg'] }
];

// Fargekoder for pedagogisk visning i laben
const atomColors = {
    'H': '#ecf0f1', 'C': '#34495e', 'O': '#e74c3c', 'N': '#3498db',
    'Na': '#9b59b6', 'Cl': '#2ecc71', 'Mg': '#f1c40f', 'Fe': '#e67e22'
};

// Forenklede ladninger for visualisering i saltgitteret
const atomCharges = {
    'Na': '+', 'Cl': '-', 'Mg': '2+', 'Fe': '2+', 'O': '2-'
};

// Bygger knapperaden eleven kan plukke fra
function initLabTray() {
    const trayElements = ['H', 'C', 'N', 'O', 'Na', 'Mg', 'Cl', 'Fe'];
    labElementTray.innerHTML = '';
    trayElements.forEach(sym => {
        const btn = document.createElement('button');
        btn.className = 'tray-btn';
        btn.textContent = sym;
        btn.style.borderColor = atomColors[sym] || '#bdc3c7';
        
        btn.addEventListener('click', () => {
            labSelectedElements.push(sym);
            updateLabUI();
        });
        labElementTray.appendChild(btn);
    });
}

function updateLabUI() {
    if (labSelectedElements.length === 0) {
        labSelectedText.textContent = 'Ingenting';
    } else {
        labSelectedText.textContent = labSelectedElements.join(' + ');
    }
}

// Brytere for bindingstype
btnBondCovalent.addEventListener('click', () => {
    labMode = 'covalent';
    btnBondCovalent.classList.add('active');
    btnBondIonic.classList.remove('active');
});

btnBondIonic.addEventListener('click', () => {
    labMode = 'ionic';
    btnBondIonic.classList.add('active');
    btnBondCovalent.classList.remove('active');
});

// Tøm reaktoren
btnLabClear.addEventListener('click', () => {
    labSelectedElements = [];
    labVisualCanvas.innerHTML = '<div id="lab-placeholder-text">Tilsett atomer og trykk "Koble sammen!"</div>';
    labResultFormula.textContent = '-';
    labResultName.textContent = '-';
    labResultType.textContent = '-';
    labResultStatus.textContent = 'Venter på syntese...';
    labResultStatus.style.color = 'inherit';
    updateLabUI();
});

// Hovedfunksjon: Forsøk å bygge stoffet!
btnLabSynthesize.addEventListener('click', () => {
    if (labSelectedElements.length === 0) return;

    // Sorterer valgte atomer alfabetisk for å enkelt kunne sammenligne med fasiten
    const sortedSelected = [...labSelectedElements].sort().join('');
    
    let foundRecipe = null;
    for (let r of labRecipes) {
        if ([...r.atoms].sort().join('') === sortedSelected) {
            foundRecipe = r;
            break;
        }
    }

    if (!foundRecipe) {
        labResultStatus.textContent = 'Feil: Ukjent stoff eller ustabil kombinasjon. Prøv en klassisk oppskrift (f.eks. H + H + O).';
        labResultStatus.style.color = '#e74c3c'; // Rød feilfarge
        return;
    }

    // Vi har funnet et stoff, men har eleven valgt riktig bindingstype?
    if (foundRecipe.type !== labMode) {
        if (foundRecipe.type === 'ionic') {
            labResultStatus.textContent = `Feil binding! Metaller og ikke-metaller danner ionebindinger (salter). Bytt til "Ionebinding" og prøv igjen.`;
        } else {
            labResultStatus.textContent = `Feil binding! Ikke-metaller deler elektroner for å oppfylle oktettregelen. Bytt til "Elektronparbinding (Molekyl)" og prøv igjen.`;
        }
        labResultStatus.style.color = '#e67e22'; // Oransje advarsel
        return;
    }

    // Alt er riktig! Syntesen er vellykket.
    labResultFormula.textContent = foundRecipe.formula;
    labResultName.textContent = foundRecipe.name;
    labResultType.textContent = foundRecipe.type === 'covalent' ? 'Elektronparbinding (Molekyl)' : 'Ionebinding (Salt)';
    labResultStatus.textContent = 'Vellykket syntese!';
    labResultStatus.style.color = '#27ae60'; // Grønn suksess

    drawLabResult(foundRecipe);
});

// Visuell opptegning av det ferdige stoffet
function drawLabResult(recipe) {
    labVisualCanvas.innerHTML = '';
    
    if (recipe.type === 'covalent') {
        const container = document.createElement('div');
        container.className = 'molecule-container';
        
        recipe.atoms.forEach(sym => {
            const atomDiv = document.createElement('div');
            atomDiv.className = 'lab-atom';
            atomDiv.textContent = sym;
            atomDiv.style.backgroundColor = atomColors[sym] || '#ccc';
            if (sym === 'C' || sym === 'N' || sym === 'Fe') atomDiv.style.color = 'white'; // Kontrast
            
            container.appendChild(atomDiv);
        });
        labVisualCanvas.appendChild(container);
        
    } else {
        const container = document.createElement('div');
        container.className = 'salt-lattice';
        
        recipe.atoms.forEach(sym => {
            const atomDiv = document.createElement('div');
            atomDiv.className = 'lab-atom';
            atomDiv.textContent = sym;
            atomDiv.style.backgroundColor = atomColors[sym] || '#ccc';
            if (sym === 'C' || sym === 'N' || sym === 'Fe') atomDiv.style.color = 'white';
            
            // Ioner får visuell ladning (pluss eller minus)
            const chargeDiv = document.createElement('div');
            chargeDiv.className = 'ion-charge';
            chargeDiv.textContent = atomCharges[sym] || '';
            if (chargeDiv.textContent) atomDiv.appendChild(chargeDiv);

            container.appendChild(atomDiv);
        });
        labVisualCanvas.appendChild(container);
    }
}

// Initialiser oppstart
console.log('[System] script.js er lastet inn. Initialiserer UI.');
generatePeriodicTable();
initLabTray(); // Setter opp knappene for Kjemilaben
updateUI();

/* Version: #28 */
