/* Version: #3 */

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

// === SEKSJON: Fane-navigasjon ===
function switchTab(tabName) {
    console.log(`[Navigasjon] Forsøker å bytte til fane: ${tabName}`);
    
    if (tabName === 'build') {
        // Oppdaterer knapper
        tabBuild.classList.add('active');
        tabPeriodic.classList.remove('active');
        
        // Oppdaterer seksjoner
        sectionBuild.classList.remove('hidden');
        sectionPeriodic.classList.add('hidden');
        console.log('[Navigasjon] Viser Byggeflate, skjuler Periodesystem.');
        
    } else if (tabName === 'periodic') {
        // Oppdaterer knapper
        tabPeriodic.classList.add('active');
        tabBuild.classList.remove('active');
        
        // Oppdaterer seksjoner
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

    // Hindre negative verdier hvis vi senere legger til fjern-knapper
    if (atomState.protons < 0) atomState.protons = 0;
    if (atomState.neutrons < 0) atomState.neutrons = 0;
    if (atomState.electrons < 0) atomState.electrons = 0;

    console.log(`[Partikkel-logikk] Etter endring: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    // Her vil vi senere kalle funksjoner for å oppdatere UI og tegne atomet
    // updateUI();
    // drawAtom();
}

function resetAtom() {
    console.log('[Partikkel-logikk] Tilbakestiller byggeflaten...');
    atomState.protons = 0;
    atomState.neutrons = 0;
    atomState.electrons = 0;
    console.log(`[Partikkel-logikk] Status etter tilbakestilling: p=${atomState.protons}, n=${atomState.neutrons}, e=${atomState.electrons}`);
    
    // Her vil vi senere kalle funksjoner for å oppdatere UI
    // updateUI();
    // drawAtom();
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

console.log('[System] script.js er lastet inn og initialisert.');
/* Version: #3 */
