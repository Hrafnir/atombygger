/* Version: #25 */

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

// Seksjoner (Visninger)
const sectionBuild = document.getElementById('build-section');
const sectionPeriodic = document.getElementById('periodic-section');
const sectionTheory = document.getElementById('theory-section');

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
    
    sectionBuild.classList.add('hidden');
    sectionPeriodic.classList.add('hidden');
    sectionTheory.classList.add('hidden');

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
    }
}

tabBuild.addEventListener('click', () => switchTab('build'));
tabPeriodic.addEventListener('click', () => switchTab('periodic'));
tabTheory.addEventListener('click', () => switchTab('theory'));

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
            
            console.log(`[Periodesystem] Oppdaterer byggeflate til: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
            
            updateUI();
            switchTab('build');
        });

        periodicGrid.appendChild(box);
    });
    
    console.log('[Periodesystem] Rutenett generert med gruppenummer og atomvekt.');
}

// === SEKSJON: Visuell Tegning ===
function drawAtom() {
    console.log('[Tegning] Starter visuell opptegning av atomet...');
    
    // 1. Tøm det gamle atomet
    nucleusContainer.innerHTML = '';
    shellsContainer.innerHTML = '';

    // 2. Tegn atomkjernen
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

    // 3. Tegn elektronskall og elektroner med DYNAMISK SKALERING (Nytt i Versjon 25)
    const maxPerShell = [2, 8, 8, 18, 18, 32, 32]; 
    let remainingElectrons = atomState.electrons;
    
    // 3.1 Finn ut hvor mange skall som kreves
    let tempElectrons = remainingElectrons;
    let totalShells = 0;
    for (let cap of maxPerShell) {
        if (tempElectrons > 0) {
            totalShells++;
            tempElectrons -= cap;
        } else break;
    }

    // 3.2 Sett standardmål for radier og avstander
    let baseShellRadius = 40 + scatterRadius; 
    let shellGap = 35; 

    // 3.3 Skaler ned hvis atomet blir for stort for boksen
    const maxAllowedRadius = 180; // Trygg radius-grense innenfor de 400 pikslene i byggeflaten
    const estimatedMaxRadius = baseShellRadius + (totalShells > 0 ? (totalShells - 1) * shellGap : 0);

    if (estimatedMaxRadius > maxAllowedRadius) {
        const scaleFactor = maxAllowedRadius / estimatedMaxRadius;
        baseShellRadius *= scaleFactor;
        shellGap *= scaleFactor;
        console.log(`[Tegning] Stort atom! Skalerte skallene med faktor ${scaleFactor.toFixed(2)} for å få plass.`);
    }

    // 3.4 Tegn opp de ferdig kalkulerte skallene
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
    console.log('[Tegning] Visuell opptegning fullført.');
}

// === SEKSJON: Analyse og UI Oppdatering ===
function updateUI() {
    console.log('[UI] Oppdaterer grensesnittet...');
    analyzeAtom();
    drawAtom();
}

function analyzeAtom() {
    const z = atomState.protons;
    const n = atomState.neutrons;
    const e = atomState.electrons;
    
    console.log(`[Analyse] Kjører analyse for: Z=${z}, N=${n}, E=${e}`);
    
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
        
        if (element) {
            isIsotope = n !== element.standardNeutrons;
        }

        if (isIon && isIsotope) {
            stateStr = "Ion og Isotop";
        } else if (isIon) {
            stateStr = "Ion";
        } else if (isIsotope) {
            stateStr = "Isotop";
        } else {
            stateStr = "Nøytralt atom";
        }
    }
    
    infoState.textContent = stateStr;
    console.log(`[Analyse] Ferdig. Grunnstoff: ${element ? element.name : 'N/A'}, Masse: ${mass}, Ladning: ${chargeStr}, Tilstand: ${stateStr}`);
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

console.log('[System] script.js er lastet inn. Initialiserer UI.');
generatePeriodicTable();
updateUI();

/* Version: #25 */
