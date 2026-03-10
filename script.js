/* Version: #6 */

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

// Knapper for partikler
const btnAddProton = document.getElementById('btn-add-proton');
const btnAddNeutron = document.getElementById('btn-add-neutron');
const btnAddElectron = document.getElementById('btn-add-electron');
const btnReset = document.getElementById('btn-reset');

// Analyse-panel elementer
const infoElement = document.getElementById('info-element');
const infoSymbol = document.getElementById('info-symbol');
const infoAtomicNumber = document.getElementById('info-atomic-number');
const infoMass = document.getElementById('info-mass');
const infoCharge = document.getElementById('info-charge');
const infoState = document.getElementById('info-state');

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

// === SEKSJON: Analyse og UI Oppdatering ===
function updateUI() {
    console.log('[UI] Oppdaterer grensesnittet...');
    analyzeAtom();
    // Her vil vi senere kalle drawAtom() for å tegne partiklene
}

function analyzeAtom() {
    const z = atomState.protons;
    const n = atomState.neutrons;
    const e = atomState.electrons;
    
    console.log(`[Analyse] Kjører analyse for: Z=${z}, N=${n}, E=${e}`);
    
    // 1. Finn grunnstoffet i databasen basert på antall protoner (Z)
    // Forutsetter at elements.js er lastet inn før denne filen
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

    // 2. Beregn Nukleontall (A = protoner + nøytroner)
    const mass = z + n;
    infoAtomicNumber.textContent = z;
    infoMass.textContent = mass;

    // 3. Beregn Netto Ladning (protoner - elektroner)
    const charge = z - e;
    let chargeStr = "0";
    if (charge > 0) chargeStr = "+" + charge;
    else if (charge < 0) chargeStr = charge.toString(); // Beholder minus-tegnet
    
    infoCharge.textContent = chargeStr;

    // 4. Bestem tilstand (Atom, Ion, Isotop)
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
        console.log(`[Partikkel-logikk] La til ${amount} proton(er).`);
    } else if (particleType === 'neutron') {
        atomState.neutrons += amount;
        console.log(`[Partikkel-logikk] La til ${amount} nøytron(er).`);
    } else if (particleType === 'electron') {
        atomState.electrons += amount;
        console.log(`[Partikkel-logikk] La til ${amount} elektron(er).`);
    }

    // Hindre negative verdier
    if (atomState.protons < 0) atomState.protons = 0;
    if (atomState.neutrons < 0) atomState.neutrons = 0;
    if (atomState.electrons < 0) atomState.electrons = 0;

    console.log(`[Partikkel-logikk] Etter endring: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    // Oppdater UI etter endring
    updateUI();
}

function resetAtom() {
    console.log('[Partikkel-logikk] Tilbakestiller byggeflaten...');
    atomState.protons = 0;
    atomState.neutrons = 0;
    atomState.electrons = 0;
    console.log(`[Partikkel-logikk] Status etter tilbakestilling: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    // Oppdater UI etter nullstilling
    updateUI();
}

// Lyttefunksjoner for knapper
btnAddProton.addEventListener('click', () => {
    updateParticleCount('proton', 1);
});

btnAddNeutron.addEventListener('click', () => {
    updateParticleCount('neutron', 1);
});

btnAddElectron.addEventListener('click', () => {
    updateParticleCount('electron', 1);
});

btnReset.addEventListener('click', () => {
    resetAtom();
});

// Initialiser UI ved oppstart
console.log('[System] script.js er lastet inn. Initialiserer UI.');
updateUI();

/* Version: #6 */
