/* Version: #8 */

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

// Byggeflate elementer (Lagt til i Versjon 8)
const nucleusContainer = document.getElementById('nucleus-container');
const shellsContainer = document.getElementById('shells-container');

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

// === SEKSJON: Visuell Tegning (NY) ===
function drawAtom() {
    console.log('[Tegning] Starter visuell opptegning av atomet...');
    
    // 1. Tøm det gamle atomet
    nucleusContainer.innerHTML = '';
    shellsContainer.innerHTML = '';

    // 2. Tegn atomkjernen (Protoner og Nøytroner)
    const totalNucleons = atomState.protons + atomState.neutrons;
    console.log(`[Tegning] Tegner kjerne med ${totalNucleons} partikler.`);
    
    for(let i = 0; i < atomState.protons; i++) {
        const p = document.createElement('div');
        p.className = 'particle proton';
        p.textContent = '+';
        nucleusContainer.appendChild(p);
    }
    
    for(let i = 0; i < atomState.neutrons; i++) {
        const n = document.createElement('div');
        n.className = 'particle neutron';
        nucleusContainer.appendChild(n);
    }

    // 3. Tegn elektronskall og elektroner
    // Pedagogisk forenkling for ungdomsskole: 2, 8, 8, 18...
    const maxPerShell = [2, 8, 8, 18, 18, 32]; 
    let remainingElectrons = atomState.electrons;
    let currentShellIndex = 0;
    
    const shellBaseRadius = 50; // Pixel radius for det innerste skallet
    const shellGap = 40; // Avstand i piksler mellom hvert skall

    while(remainingElectrons > 0) {
        const capacity = maxPerShell[currentShellIndex] || 32;
        const electronsInThisShell = Math.min(remainingElectrons, capacity);
        
        console.log(`[Tegning] Skall ${currentShellIndex + 1}: Kapasitet=${capacity}, Inneholder=${electronsInThisShell} elektron(er).`);

        const radius = shellBaseRadius + (currentShellIndex * shellGap);
        const diameter = radius * 2;
        
        // Opprett selve sirkelen for skallet
        const shellEl = document.createElement('div');
        shellEl.className = 'shell';
        shellEl.style.width = `${diameter}px`;
        shellEl.style.height = `${diameter}px`;
        shellsContainer.appendChild(shellEl);

        // Plasser elektronene jevnt fordelt langs dette skallet
        for(let i = 0; i < electronsInThisShell; i++) {
            const e = document.createElement('div');
            e.className = 'particle electron';
            e.textContent = '-';
            
            // Beregn vinkel i radianer for å spre dem i en sirkel
            const angle = (i / electronsInThisShell) * 2 * Math.PI;
            
            // x og y koordinater relativt til midten av skallet (som har bredde/høyde = diameter)
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);
            
            e.style.left = `${x}px`;
            e.style.top = `${y}px`;
            e.style.transform = 'translate(-50%, -50%)'; // Sentrer elektronet over linjen
            
            shellEl.appendChild(e);
        }

        remainingElectrons -= electronsInThisShell;
        currentShellIndex++;
        
        if (currentShellIndex > 7) {
            console.log('[Tegning] Advarsel: Nådd uventet høyt antall skall.');
            break; // Sikkerhetsventil
        }
    }
    console.log('[Tegning] Visuell opptegning fullført.');
}

// === SEKSJON: Analyse og UI Oppdatering ===
function updateUI() {
    console.log('[UI] Oppdaterer grensesnittet...');
    analyzeAtom();
    drawAtom(); // Nytt kall lagt til her!
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
        console.log(`[Partikkel-logikk] La til ${amount} proton(er).`);
    } else if (particleType === 'neutron') {
        atomState.neutrons += amount;
        console.log(`[Partikkel-logikk] La til ${amount} nøytron(er).`);
    } else if (particleType === 'electron') {
        atomState.electrons += amount;
        console.log(`[Partikkel-logikk] La til ${amount} elektron(er).`);
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
    console.log(`[Partikkel-logikk] Status etter tilbakestilling: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
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

/* Version: #8 */
