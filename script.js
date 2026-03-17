/* Version: #34 */

// === SEKSJON: Tilstand (State) ===
const atomState = {
    protons: 0,
    neutrons: 0,
    electrons: 0
};

// === SEKSJON: DOM-elementer ===
const tabBuild = document.getElementById('tab-build');
const tabPeriodic = document.getElementById('tab-periodic');
const tabTheory = document.getElementById('tab-theory');
const tabLab = document.getElementById('tab-lab');

const sectionBuild = document.getElementById('build-section');
const sectionPeriodic = document.getElementById('periodic-section');
const sectionTheory = document.getElementById('theory-section');
const sectionLab = document.getElementById('lab-section');

const btnAddProton = document.getElementById('btn-add-proton');
const btnAddNeutron = document.getElementById('btn-add-neutron');
const btnAddElectron = document.getElementById('btn-add-electron');
const btnRemoveProton = document.getElementById('btn-remove-proton');
const btnRemoveNeutron = document.getElementById('btn-remove-neutron');
const btnRemoveElectron = document.getElementById('btn-remove-electron');
const btnReset = document.getElementById('btn-reset');

const infoElement = document.getElementById('info-element');
const infoSymbol = document.getElementById('info-symbol');
const infoAtomicNumber = document.getElementById('info-atomic-number');
const infoMass = document.getElementById('info-mass');
const infoAtomicWeight = document.getElementById('info-atomic-weight');
const infoCharge = document.getElementById('info-charge');
const infoState = document.getElementById('info-state');
const infoTrivia = document.getElementById('info-trivia');

const nucleusContainer = document.getElementById('nucleus-container');
const shellsContainer = document.getElementById('shells-container');
const periodicGrid = document.getElementById('periodic-table-grid');

// === SEKSJON: Fane-navigasjon ===
function switchTab(tabName) {
    tabBuild.classList.remove('active');
    tabPeriodic.classList.remove('active');
    tabTheory.classList.remove('active');
    tabLab.classList.remove('active');
    
    sectionBuild.classList.add('hidden');
    sectionPeriodic.classList.add('hidden');
    sectionTheory.classList.add('hidden');
    sectionLab.classList.add('hidden');

    if (tabName === 'build') {
        tabBuild.classList.add('active');
        sectionBuild.classList.remove('hidden');
    } else if (tabName === 'periodic') {
        tabPeriodic.classList.add('active');
        sectionPeriodic.classList.remove('hidden');
    } else if (tabName === 'theory') {
        tabTheory.classList.add('active');
        sectionTheory.classList.remove('hidden');
    } else if (tabName === 'lab') {
        tabLab.classList.add('active');
        sectionLab.classList.remove('hidden');
    }
}

tabBuild.addEventListener('click', () => switchTab('build'));
tabPeriodic.addEventListener('click', () => switchTab('periodic'));
tabTheory.addEventListener('click', () => switchTab('theory'));
tabLab.addEventListener('click', () => switchTab('lab'));

// === SEKSJON: Periodesystem ===
function generatePeriodicTable() {
    if (typeof elementsData === 'undefined') return;
    periodicGrid.innerHTML = '';

    for (let i = 1; i <= 18; i++) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-number';
        groupHeader.style.gridColumn = i;
        groupHeader.style.gridRow = 1;
        groupHeader.textContent = i;
        periodicGrid.appendChild(groupHeader);
    }

    elementsData.forEach(element => {
        const box = document.createElement('div');
        box.className = 'element-box';
        
        if (element.category) box.classList.add(element.category);
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
            atomState.protons = element.z;
            atomState.electrons = element.z; 
            atomState.neutrons = element.standardNeutrons;
            updateUI();
            switchTab('build');
        });

        periodicGrid.appendChild(box);
    });
}

// === SEKSJON: Visuell Tegning (Atombyggeren) ===
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
        el.style.left = `${Math.cos(angle) * r}px`;
        el.style.top = `${Math.sin(angle) * r}px`;
        return el;
    }
    
    for(let i = 0; i < visibleProtons; i++) nucleusContainer.appendChild(createScatteredNucleon('proton', '+'));
    for(let i = 0; i < visibleNeutrons; i++) nucleusContainer.appendChild(createScatteredNucleon('neutron', ''));

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

    let baseShellRadius = Math.max(35, scatterRadius + 15); 
    let shellGap = 35; 
    const maxAllowedRadius = 160; 
    let estimatedMaxRadius = baseShellRadius + (totalShells > 1 ? (totalShells - 1) * shellGap : 0);

    if (estimatedMaxRadius > maxAllowedRadius && totalShells > 1) {
        shellGap = (maxAllowedRadius - baseShellRadius) / (totalShells - 1);
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
            e.style.left = `${radius + radius * Math.cos(angle)}px`;
            e.style.top = `${radius + radius * Math.sin(angle)}px`;
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
        
        if (element.trivia) {
            infoTrivia.textContent = element.trivia;
        } else {
            infoTrivia.textContent = `Visste du at ${element.name} har atomnummer ${element.z} og befinner seg i gruppe ${element.group}? Sjekk "Teori"-fanen for å lære hva dette betyr!`;
        }
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
    if (z === 0 && (n > 0 || e > 0)) stateStr = "Løse partikler";
    else if (z > 0) {
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

// === SEKSJON: Kjemilab (Interaktiv Sandkasse) ===
let labMode = 'share'; // 'share' (Kovalent) eller 'steal' (Ione)
let labAtoms = []; 
let atomIdCounter = 0;

const btnModeShare = document.getElementById('btn-mode-share');
const btnModeSteal = document.getElementById('btn-mode-steal');
const labUsualSuspects = document.getElementById('lab-usual-suspects');
const btnShowAllElements = document.getElementById('btn-show-all-elements');
const labAllElementsTray = document.getElementById('lab-all-elements-tray');
const btnLabClear = document.getElementById('btn-lab-clear');
const labCanvas = document.getElementById('lab-interactive-canvas');
const labBondsLayer = document.getElementById('lab-bonds-layer');
const labSystemStatus = document.getElementById('lab-system-status');
const labResultFormula = document.getElementById('lab-result-formula');
const labResultExplanation = document.getElementById('lab-result-explanation');
const labPlaceholder = document.getElementById('lab-placeholder-text');

const atomColors = {
    'H': '#ecf0f1', 'C': '#34495e', 'O': '#e74c3c', 'N': '#3498db',
    'Na': '#9b59b6', 'Cl': '#2ecc71', 'Mg': '#f1c40f', 'Fe': '#e67e22'
};

function initLabTrays() {
    const usuals = ['H', 'C', 'N', 'O', 'Na', 'Mg', 'Cl', 'Fe'];
    labUsualSuspects.innerHTML = '';
    usuals.forEach(sym => {
        const btn = document.createElement('button');
        btn.className = 'tray-btn';
        btn.textContent = sym;
        btn.style.borderColor = atomColors[sym] || '#bdc3c7';
        btn.addEventListener('click', () => addAtomToCanvas(sym));
        labUsualSuspects.appendChild(btn);
    });

    labAllElementsTray.innerHTML = '';
    elementsData.forEach(el => {
        const btn = document.createElement('button');
        btn.className = 'tray-btn';
        btn.textContent = el.symbol;
        btn.style.fontSize = '0.9rem';
        if (el.category) btn.classList.add(el.category);
        btn.addEventListener('click', () => addAtomToCanvas(el.symbol));
        labAllElementsTray.appendChild(btn);
    });
}

btnShowAllElements.addEventListener('click', () => {
    labAllElementsTray.classList.toggle('hidden');
    btnShowAllElements.textContent = labAllElementsTray.classList.contains('hidden') ? 'Vis hele periodesystemet' : 'Skjul periodesystemet';
});

btnModeShare.addEventListener('click', () => {
    labMode = 'share';
    btnModeShare.classList.add('active');
    btnModeSteal.classList.remove('active');
});

btnModeSteal.addEventListener('click', () => {
    labMode = 'steal';
    btnModeSteal.classList.add('active');
    btnModeShare.classList.remove('active');
});

btnLabClear.addEventListener('click', () => {
    labAtoms = [];
    labCanvas.querySelectorAll('.draggable-atom').forEach(e => e.remove());
    labBondsLayer.innerHTML = '';
    labPlaceholder.style.display = 'block';
    updateLabAnalysis();
});

function getValenceElectrons(group, z) {
    if (z === 2) return 2; 
    if (group === '-' || group === undefined) return 2; 
    if (group >= 13 && group <= 18) return group - 10;
    if (group >= 1 && group <= 2) return group;
    return 2; 
}

function addAtomToCanvas(symbol) {
    labPlaceholder.style.display = 'none';
    const elementData = elementsData.find(e => e.symbol === symbol);
    if (!elementData) return;

    const valenceCount = getValenceElectrons(elementData.group, elementData.z);
    
    const atomObj = {
        id: 'atom_' + atomIdCounter++,
        symbol: symbol,
        z: elementData.z,
        charge: 0, 
        electrons: [], 
        sharedBonds: [], 
        x: Math.random() * (labCanvas.clientWidth - 100) + 20, 
        y: Math.random() * (labCanvas.clientHeight - 100) + 20,
        elementRef: null
    };

    const atomEl = document.createElement('div');
    atomEl.className = 'draggable-atom';
    atomEl.id = atomObj.id;
    atomEl.style.left = `${atomObj.x}px`;
    atomEl.style.top = `${atomObj.y}px`;
    atomEl.style.backgroundColor = atomColors[symbol] || '#ecf0f1';
    atomEl.style.touchAction = 'none'; 
    if (symbol === 'C' || symbol === 'N' || symbol === 'Fe') atomEl.style.color = 'white';
    
    const symbolSpan = document.createElement('span');
    symbolSpan.className = 'symbol';
    symbolSpan.textContent = symbol;
    atomEl.appendChild(symbolSpan);

    const chargeBadge = document.createElement('div');
    chargeBadge.className = 'ion-charge-badge';
    chargeBadge.style.display = 'none';
    atomEl.appendChild(chargeBadge);

    atomObj.elementRef = atomEl;

    const radius = 45;
    for (let i = 0; i < valenceCount; i++) {
        const angle = (i / valenceCount) * 2 * Math.PI;
        const eObj = {
            id: atomObj.id + '_e' + i,
            ownerId: atomObj.id,
            isShared: false,
            sharedWithId: null,
            angle: angle,
            elementRef: null
        };
        
        const eEl = document.createElement('div');
        eEl.className = 'valence-electron';
        eEl.id = eObj.id;
        eEl.style.touchAction = 'none';
        eEl.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
        eEl.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
        
        eObj.elementRef = eEl;
        atomObj.electrons.push(eObj);
        atomEl.appendChild(eEl);
        
        makeElectronDraggable(eObj, atomObj);
    }

    makeAtomDraggable(atomObj);
    labCanvas.appendChild(atomEl);
    labAtoms.push(atomObj);
    updateLabAnalysis();
}

function makeAtomDraggable(atomObj) {
    const el = atomObj.elementRef;
    let isDragging = false;
    let startX, startY;

    function startDrag(clientX, clientY) {
        isDragging = true;
        el.classList.add('dragging');
        startX = clientX - atomObj.x;
        startY = clientY - atomObj.y;
    }

    function drag(clientX, clientY) {
        if (!isDragging) return;
        const rect = labCanvas.getBoundingClientRect();
        let newX = clientX - startX;
        let newY = clientY - startY;
        
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > rect.width - 60) newX = rect.width - 60;
        if (newY > rect.height - 60) newY = rect.height - 60;

        atomObj.x = newX;
        atomObj.y = newY;
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        drawSVGConnections(); 
    }

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            el.classList.remove('dragging');
        }
    }

    el.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('valence-electron')) return;
        startDrag(e.clientX, e.clientY);
    });
    document.addEventListener('mousemove', (e) => drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    el.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('valence-electron')) return;
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});
    
    el.addEventListener('touchmove', (e) => {
        if (isDragging) e.preventDefault();
    }, {passive: false});

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        drag(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});
    
    document.addEventListener('touchend', endDrag);
}

function makeElectronDraggable(eObj, sourceAtomObj) {
    const el = eObj.elementRef;
    let isDragging = false;

    function startDrag() {
        if (eObj.isShared) return; 
        isDragging = true;
        el.classList.add('dragging');
    }

    function drag(clientX, clientY) {
        if (!isDragging) return;
        el.style.position = 'fixed';
        el.style.left = `${clientX}px`;
        el.style.top = `${clientY}px`;
    }

    function endDrag(clientX, clientY) {
        if (!isDragging) return;
        isDragging = false;
        el.classList.remove('dragging');
        el.style.position = 'absolute'; 

        const dropTarget = getAtomAtPosition(clientX, clientY);

        if (dropTarget && dropTarget.id !== sourceAtomObj.id) {
            if (labMode === 'steal') {
                executeSteal(eObj, sourceAtomObj, dropTarget);
            } else if (labMode === 'share') {
                executeShare(eObj, sourceAtomObj, dropTarget);
            }
        } else {
            recalculateElectronAngles(sourceAtomObj);
        }
        updateLabAnalysis();
    }

    el.addEventListener('mousedown', (e) => {
        e.stopPropagation(); 
        startDrag();
    });
    document.addEventListener('mousemove', (e) => drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', (e) => endDrag(e.clientX, e.clientY));

    el.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        startDrag();
    }, {passive: false});
    
    el.addEventListener('touchmove', (e) => {
        if(isDragging) e.preventDefault(); 
    }, {passive: false});

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        drag(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});
    
    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const touch = e.changedTouches[0];
        endDrag(touch.clientX, touch.clientY);
    });
}

// Forbedret hitbox-sjekk med ekte sirkulær avstandsmåling (Euklidsk distanse)
function getAtomAtPosition(clientX, clientY) {
    let found = null;
    let minDistance = 10000;
    const canvasRect = labCanvas.getBoundingClientRect();
    const mouseX = clientX - canvasRect.left;
    const mouseY = clientY - canvasRect.top;

    labAtoms.forEach(atom => {
        const atomCenterX = atom.x + 30; // Atomet er 60px bredt
        const atomCenterY = atom.y + 30;
        
        // Pytagoras for å finne avstand fra mus til sentrum av atomet
        const dist = Math.hypot(mouseX - atomCenterX, mouseY - atomCenterY);
        
        // Hvis avstanden er mindre enn 55 piksler, regner vi det som et treff
        if (dist < 55 && dist < minDistance) {
            minDistance = dist;
            found = atom;
        }
    });
    return found;
}

function executeSteal(eObj, sourceAtom, targetAtom) {
    sourceAtom.electrons = sourceAtom.electrons.filter(e => e.id !== eObj.id);
    sourceAtom.charge += 1; 
    
    eObj.ownerId = targetAtom.id;
    targetAtom.electrons.push(eObj);
    targetAtom.charge -= 1; 

    targetAtom.elementRef.appendChild(eObj.elementRef);
    
    recalculateElectronAngles(targetAtom);
    recalculateElectronAngles(sourceAtom);
    updateChargeVisuals(sourceAtom);
    updateChargeVisuals(targetAtom);
}

function executeShare(eObjA, sourceAtom, targetAtom) {
    const eObjB = targetAtom.electrons.find(e => !e.isShared);
    if (!eObjB) {
        alert(`${targetAtom.symbol} har ingen ledige elektroner å dele akkurat nå!`);
        recalculateElectronAngles(sourceAtom);
        return;
    }
    
    eObjA.isShared = true;
    eObjA.sharedWithId = targetAtom.id;
    eObjA.elementRef.classList.add('shared');
    targetAtom.sharedBonds.push(eObjA);

    eObjB.isShared = true;
    eObjB.sharedWithId = sourceAtom.id;
    eObjB.elementRef.classList.add('shared');
    sourceAtom.sharedBonds.push(eObjB);

    drawSVGConnections();
}

function recalculateElectronAngles(atomObj) {
    const radius = 45;
    const count = atomObj.electrons.length;
    let unsharedIndex = 0;
    const unsharedCount = atomObj.electrons.filter(e => !e.isShared).length;

    atomObj.electrons.forEach((eObj) => {
        if (!eObj.isShared) {
            eObj.angle = (unsharedIndex / unsharedCount) * 2 * Math.PI;
            eObj.elementRef.style.left = `calc(50% + ${Math.cos(eObj.angle) * radius}px)`;
            eObj.elementRef.style.top = `calc(50% + ${Math.sin(eObj.angle) * radius}px)`;
            unsharedIndex++;
        }
    });
}

function updateChargeVisuals(atomObj) {
    const badge = atomObj.elementRef.querySelector('.ion-charge-badge');
    if (atomObj.charge === 0) {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'flex';
        let sign = atomObj.charge > 0 ? '+' : '-';
        let num = Math.abs(atomObj.charge);
        badge.textContent = num > 1 ? `${num}${sign}` : sign;
    }
}

function drawSVGConnections() {
    labBondsLayer.innerHTML = '';
    
    const bondGroups = {};
    labAtoms.forEach(atom => {
        atom.electrons.forEach(eObj => {
            if (eObj.isShared) {
                const bondId = atom.id < eObj.sharedWithId ? `${atom.id}-${eObj.sharedWithId}` : `${eObj.sharedWithId}-${atom.id}`;
                if(!bondGroups[bondId]) bondGroups[bondId] = [];
                bondGroups[bondId].push({ atom, eObj });
            }
        });
        recalculateElectronAngles(atom);
    });

    Object.entries(bondGroups).forEach(([bondId, electrons]) => {
        if(electrons.length === 0) return;
        const atomA = electrons[0].atom;
        const atomB = labAtoms.find(a => a.id === electrons[0].eObj.sharedWithId);
        if(!atomB) return;
        
        const ax = atomA.x + 30;
        const ay = atomA.y + 30;
        const bx = atomB.x + 30;
        const by = atomB.y + 30;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', ax);
        line.setAttribute('y1', ay);
        line.setAttribute('x2', bx);
        line.setAttribute('y2', by);
        line.setAttribute('class', 'covalent-bond-line');
        labBondsLayer.appendChild(line);

        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const length = Math.sqrt(dx*dx + dy*dy) || 1;
        const nx = -dy / length;
        const ny = dx / length;

        const directionX = dx / length;
        const directionY = dy / length;

        electrons.forEach((item, index) => {
            const pairIndex = Math.floor(index / 2); 
            const isFirstInPair = index % 2 === 0;
            
            const perpOffset = isFirstInPair ? 7 : -7;
            const parallelOffset = (pairIndex - (electrons.length/4 - 0.5)) * 14; 

            const globalX = mx + (nx * perpOffset) + (directionX * parallelOffset);
            const globalY = my + (ny * perpOffset) + (directionY * parallelOffset);

            item.eObj.elementRef.style.left = `${globalX - item.atom.x}px`;
            item.eObj.elementRef.style.top = `${globalY - item.atom.y}px`;
        });
    });
}

function updateLabAnalysis() {
    if (labAtoms.length === 0) {
        labSystemStatus.textContent = 'Tomt brett';
        labSystemStatus.style.color = 'inherit';
        labResultFormula.textContent = '-';
        labResultExplanation.textContent = 'Legg ut atomer og begynn å dra elektroner.';
        return;
    }

    let allHappy = true;

    labAtoms.forEach(atom => {
        const nativeOwned = atom.electrons.length; 
        const sharedAccess = atom.sharedBonds.length; 
        
        const effectiveValence = nativeOwned + sharedAccess;
        const targetOctet = (atom.z <= 2) ? 2 : 8; 

        if (effectiveValence !== targetOctet) {
            if (atom.charge > 0 && nativeOwned === 0) {
                // Stabil ion (tømt ytterskall betyr at underliggende er fullt)
            } else {
                allHappy = false;
            }
        }
    });

    const counts = {};
    labAtoms.forEach(a => {
        counts[a.symbol] = (counts[a.symbol] || 0) + 1;
    });
    
    let formula = '';
    Object.keys(counts).sort().forEach(sym => {
        formula += sym;
        if (counts[sym] > 1) formula += `₂`; 
    });
    labResultFormula.textContent = formula;

    if (allHappy) {
        labSystemStatus.textContent = 'Stabilt! Oktettregelen oppfylt.';
        labSystemStatus.style.color = '#27ae60';
        labResultExplanation.textContent = 'Gratulerer! Alle atomene på brettet har nå fylt sitt ytterste skall (eller tømt det helt for å bli et stabilt ion).';
    } else {
        labSystemStatus.textContent = 'Ustabilt. Atomer mangler elektroner.';
        labSystemStatus.style.color = '#e67e22';
        labResultExplanation.textContent = 'Dra elektroner mellom atomene for å dele (molekyl) eller stjele (ioner) slik at alle får 8 elektroner i ytterste skall (2 for Hydrogen).';
    }
}

console.log('[System] script.js er lastet inn. Initialiserer UI.');
generatePeriodicTable();
initLabTrays();
updateUI();

/* Version: #34 */
