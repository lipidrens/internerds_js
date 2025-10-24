// Test script voor vancomycine dosering calculator

function roundToNearest250(value) {
    return Math.round(value / 250) * 250;
}

function calculateDoses(weight, timing) {
    let loadingDose, maintenanceDose;

    if (timing === 'na') {
        // Na dialyse
        loadingDose = Math.min(25 * weight, 2000);
        maintenanceDose = Math.min(7.5 * weight, 750);
    } else if (timing === 'tijdens') {
        // Tijdens dialyse
        loadingDose = Math.min(35 * weight, 2500);
        maintenanceDose = Math.min(10 * weight, 1000);
    }

    // Afronden op dichtstbijzijnde 250
    loadingDose = roundToNearest250(loadingDose);
    maintenanceDose = roundToNearest250(maintenanceDose);

    return {
        loadingDose,
        maintenanceDose
    };
}

console.log('=== Test Scenario\'s ===\n');

// Test 1: 70kg patient, na dialyse
console.log('Test 1: 70kg, na dialyse');
let result = calculateDoses(70, 'na');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*70 = 1750, afgerond = 1750)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*70 = 525, afgerond = 500)`);
console.log();

// Test 2: 70kg patient, tijdens dialyse
console.log('Test 2: 70kg, tijdens dialyse');
result = calculateDoses(70, 'tijdens');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*70 = 2450, afgerond = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 10*70 = 700, afgerond = 750)`);
console.log();

// Test 3: 100kg patient, na dialyse (max limiet check)
console.log('Test 3: 100kg, na dialyse (max limiet)');
result = calculateDoses(100, 'na');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(2500, 2000) = 2000)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(750, 750) = 750)`);
console.log();

// Test 4: 100kg patient, tijdens dialyse (max limiet check)
console.log('Test 4: 100kg, tijdens dialyse (max limiet)');
result = calculateDoses(100, 'tijdens');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(3500, 2500) = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(1000, 1000) = 1000)`);
console.log();

// Test 5: 50kg patient, na dialyse
console.log('Test 5: 50kg, na dialyse');
result = calculateDoses(50, 'na');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*50 = 1250)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*50 = 375, afgerond = 500)`);
console.log();

// Test 6: 85kg patient, tijdens dialyse
console.log('Test 6: 85kg, tijdens dialyse');
result = calculateDoses(85, 'tijdens');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*85 = 2975, > max 2500 = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 10*85 = 850, afgerond = 750)`);
console.log();

// Test 7: Afronding test - 60kg, na dialyse
console.log('Test 7: 60kg, na dialyse (afronding test)');
result = calculateDoses(60, 'na');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*60 = 1500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*60 = 450, afgerond = 500)`);
console.log();

console.log('=== Alle tests voltooid ===');
