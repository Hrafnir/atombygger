/* Version: #12 */

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

// Seksjoner (Visninger)
const sectionBuild = document.getElementById('build-section');
const sectionPeriodic = document.getElementById('periodic-section');

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
const infoCharge = document.getElementById('info-charge');
const infoState = document.getElementById('info-state');

// Byggeflate elementer
const nucleusContainer = document.getElementById('nucleus-container');
const shellsContainer = document.getElementById('shells-container');

// Periodesystem elementer
const periodicGrid = document.getElementById('periodic-table-grid');

// === SEKSJON: Fane-navigasjon ===
function switchTab(tabName) {
    console.log(`[Navigasjon] Forsøker å bytte til fane: ${tabName}`);
    
    if (tabName === 'build') {
        tabBuild.classList.add('active');
        tabPeriodic.classList.remove('active');
        
        sectionBuild.classList.remove('hidden');
        sectionPeriodic.classList.add('hidden');
        console.log('[Navigasjon] Viser Byggeflate, skjuler Periodesystem.');
        
    } else if (tabName === 'periodic') {
        tabPeriodic.classList.add('active');
        tabBuild.classList.remove('active');
        
        sectionPeriodic.classList.remove('hidden');
        sectionBuild.classList.add('hidden');
        console.log('[Navigasjon] Viser Periodesystem, skjuler Byggeflate.');
    }
}

tabBuild.addEventListener('click', () => {
    switchTab('build');
});

tabPeriodic.addEventListener('click', () => {
    switchTab('periodic');
});

// === SEKSJON: Periodesystem ===
function generatePeriodicTable() {
    console.log('[Periodesystem] Genererer visuelt rutenett...');
    
    if (typeof elementsData === 'undefined') {
        console.error('[Periodesystem] FEIL: elementsData er ikke definert. Sjekk at elements.js er lastet.');
        return;
    }

    periodicGrid.innerHTML = ''; // Tømmer rutenettet først

    elementsData.forEach(element => {
        const box = document.createElement('div');
        box.className = 'element-box';
        
        const symbolEl = document.createElement('div');
        symbolEl.className = 'element-symbol';
        symbolEl.textContent = element.symbol;
        
        const numberEl = document.createElement('div');
        numberEl.className = 'element-number';
        numberEl.textContent = element.z;

        box.appendChild(numberEl);
        box.appendChild(symbolEl);

        // Lyttefunksjon for å laste atomet inn i byggeflaten
        box.addEventListener('click', () => {
            console.log(`[Periodesystem] Valgte grunnstoff: ${element.name} (Z=${element.z})`);
            
            // Sett state til et nøytralt atom av valgt grunnstoff med standard isotop
            atomState.protons = element.z;
            atomState.electrons = element.z; 
            atomState.neutrons = element.standardNeutrons;
            
            console.log(`[Periodesystem] Oppdaterer byggeflate til: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
            
            updateUI();
            switchTab('build'); // Bytt automatisk til byggeflaten
        });

        periodicGrid.appendChild(box);
    });
    
    console.log('[Periodesystem] Rutenett generert med', elementsData.length, 'grunnstoffer.');
}

// === SEKSJON: Visuell Tegning ===
function drawAtom() {
    console.log('[Tegning] Starter visuell opptegning av atomet...');
    
    // 1. Tøm det gamle atomet
    nucleusContainer.innerHTML = '';
    shellsContainer.innerHTML = '';

    // 2. Tegn atomkjernen (Protoner og Nøytroner hulter til bulter)
    const totalNucleons = atomState.protons + atomState.neutrons;
    console.log(`[Tegning] Tegner kjerne med totalt ${totalNucleons} partikler.`);
    
    const MAX_VISIBLE_NUCLEONS = 20;
    let visibleProtons = atomState.protons;
    let visibleNeutrons = atomState.neutrons;

    // Hvis vi har for mange partikler, beregn proporsjonal visning for bakgrunnen
    if (totalNucleons > MAX_VISIBLE_NUCLEONS) {
        const ratio = MAX_VISIBLE_NUCLEONS / totalNucleons;
        visibleProtons = Math.round(atomState.protons * ratio);
        visibleNeutrons = MAX_VISIBLE_NUCLEONS - visibleProtons;
    }

    // Skyens radius vokser litt med antall partikler
    const scatterRadius = 5 + ((visibleProtons + visibleNeutrons) * 0.8);

    // Hjelpefunksjon for å spre partikler i en sirkulær sky
    function createScatteredNucleon(type, symbol) {
        const el = document.createElement('div');
        el.className = `particle ${type}`;
        if (symbol) el.textContent = symbol;
        
        // Tilfeldig vinkel og radius (bruk Math.sqrt for jevn fordeling innenfor arealet)
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * scatterRadius; 
        
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        
        // CSS håndterer sentrering over (x,y) med translate(-50%, -50%)
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

    // Sett på "skiltet" med tall hvis vi overstiger grensen
    if (totalNucleons > MAX_VISIBLE_NUCLEONS) {
        const label = document.createElement('div');
        label.className = 'nucleus-label';
        label.textContent = `${atomState.protons} p⁺ | ${atomState.neutrons} n⁰`;
        nucleusContainer.appendChild(label);
        console.log('[Tegning] La til tekstskilt for stor kjerne.');
    }

    // 3. Tegn elektronskall og elektroner
    const maxPerShell = [2, 8, 8, 18, 18, 32]; 
    let remainingElectrons = atomState.electrons;
    let currentShellIndex = 0;
    
    // Vi skyver elektronene litt lenger ut hvis kjernen blir veldig stor
    const baseShellRadius = 40 + scatterRadius; 
    const shellGap = 35; 

    while(remainingElectrons > 0) {
        const capacity = maxPerShell[currentShellIndex] || 32;
        const electronsInThisShell = Math.min(remainingElectrons, capacity);
        
        console.log(`[Tegning] Skall ${currentShellIndex + 1}: Kapasitet=${capacity}, Inneholder=${electronsInThisShell} elektron(er).`);

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
    } else if (element) {
        infoElement.textContent = element.name;
        infoSymbol.textContent = element.symbol;
    } else {
        infoElement.textContent = "Ukjent (utenfor databasen)";
        infoSymbol.textContent = "?";
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
    console.log(`[Partikkel-logikk] Før endring: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    if (particleType === 'proton') {
        atomState.protons += amount;
        console.log(`[Partikkel-logikk] Endret protoner med ${amount}.`);
    } else if (particleType === 'neutron') {
        atomState.neutrons += amount;
        console.log(`[Partikkel-logikk] Endret nøytroner med ${amount}.`);
    } else if (particleType === 'electron') {
        atomState.electrons += amount;
        console.log(`[Partikkel-logikk] Endret elektroner med ${amount}.`);
    }

    if (atomState.protons < 0) atomState.protons = 0;
    if (atomState.neutrons < 0) atomState.neutrons = 0;
    if (atomState.electrons < 0) atomState.electrons = 0;

    console.log(`[Partikkel-logikk] Etter endring: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    updateUI();
}

function resetAtom() {
    console.log('[Partikkel-logikk] Tilbakestiller byggeflaten...');
    atomState.protons = 0;
    atomState.neutrons = 0;
    atomState.electrons = 0;
    updateUI();
}

// Lyttefunksjoner for Pluss-knapper
btnAddProton.addEventListener('click', () => updateParticleCount('proton', 1));
btnAddNeutron.addEventListener('click', () => updateParticleCount('neutron', 1));
btnAddElectron.addEventListener('click', () => updateParticleCount('electron', 1));

// Lyttefunksjoner for Minus-knapper
btnRemoveProton.addEventListener('click', () => updateParticleCount('proton', -1));
btnRemoveNeutron.addEventListener('click', () => updateParticleCount('neutron', -1));
btnRemoveElectron.addEventListener('click', () => updateParticleCount('electron', -1));

btnReset.addEventListener('click', resetAtom);

// Initialiser UI ved oppstart
console.log('[System] script.js er lastet inn. Initialiserer UI.');
generatePeriodicTable(); // Last inn periodesystemet
updateUI();

/* Version: #12 */
