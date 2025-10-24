// Test script voor vancomycine dosering calculator

function roundToNearest250(value) {
    return Math.round(value / 250) * 250;
}

function calculateDoses(weight, timing, bridgingPeriod) {
    let loadingDose, maintenanceDose;
    let maintenancePerKg, maintenanceMax;

    if (timing === 'na') {
        // Na dialyse
        loadingDose = Math.min(25 * weight, 2000);
        maintenancePerKg = 7.5;
        maintenanceMax = 750;
    } else if (timing === 'tijdens') {
        // Tijdens dialyse
        loadingDose = Math.min(35 * weight, 2500);
        maintenancePerKg = 10;
        maintenanceMax = 1000;
    }

    // Verhoog onderhoudsdosis met 25% als overbruggingsperiode 3 dagen is
    if (bridgingPeriod === '3') {
        maintenancePerKg *= 1.25;
        maintenanceMax *= 1.25;
    }

    // Bereken onderhoudsdosis met maximum
    maintenanceDose = Math.min(maintenancePerKg * weight, maintenanceMax);

    // Afronden op dichtstbijzijnde 250
    loadingDose = roundToNearest250(loadingDose);
    maintenanceDose = roundToNearest250(maintenanceDose);

    return {
        loadingDose,
        maintenanceDose
    };
}

console.log('=== Test Scenario\'s Vancomycine Dosering Calculator ===\n');

// Test 1: 70kg patient, na dialyse, 2 dagen
console.log('Test 1: 70kg, na dialyse, 2 dagen overbrugging');
let result = calculateDoses(70, 'na', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*70 = 1750)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*70 = 525, afgerond = 500)`);
console.log();

// Test 2: 70kg patient, na dialyse, 3 dagen
console.log('Test 2: 70kg, na dialyse, 3 dagen overbrugging');
result = calculateDoses(70, 'na', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*70 = 1750)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*1.25*70 = 656.25, afgerond = 750)`);
console.log();

// Test 3: 70kg patient, tijdens dialyse, 2 dagen
console.log('Test 3: 70kg, tijdens dialyse, 2 dagen overbrugging');
result = calculateDoses(70, 'tijdens', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*70 = 2450, afgerond = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 10*70 = 700, afgerond = 750)`);
console.log();

// Test 4: 70kg patient, tijdens dialyse, 3 dagen
console.log('Test 4: 70kg, tijdens dialyse, 3 dagen overbrugging');
result = calculateDoses(70, 'tijdens', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*70 = 2450, afgerond = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 10*1.25*70 = 875, afgerond = 1000)`);
console.log();

// Test 5: 100kg patient, na dialyse, 2 dagen (max limiet check)
console.log('Test 5: 100kg, na dialyse, 2 dagen (max limiet)');
result = calculateDoses(100, 'na', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(2500, 2000) = 2000)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(750, 750) = 750)`);
console.log();

// Test 6: 100kg patient, na dialyse, 3 dagen (max limiet check)
console.log('Test 6: 100kg, na dialyse, 3 dagen (max limiet check met 25% verhoging)');
result = calculateDoses(100, 'na', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(2500, 2000) = 2000)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(9.375*100, 937.5) = 937.5, afgerond = 1000)`);
console.log();

// Test 7: 100kg patient, tijdens dialyse, 2 dagen (max limiet check)
console.log('Test 7: 100kg, tijdens dialyse, 2 dagen (max limiet)');
result = calculateDoses(100, 'tijdens', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(3500, 2500) = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(1000, 1000) = 1000)`);
console.log();

// Test 8: 100kg patient, tijdens dialyse, 3 dagen (max limiet check)
console.log('Test 8: 100kg, tijdens dialyse, 3 dagen (max limiet check met 25% verhoging)');
result = calculateDoses(100, 'tijdens', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: min(3500, 2500) = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: min(12.5*100, 1250) = 1250)`);
console.log();

// Test 9: 50kg patient, na dialyse, 2 dagen
console.log('Test 9: 50kg, na dialyse, 2 dagen');
result = calculateDoses(50, 'na', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*50 = 1250)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*50 = 375, afgerond = 500)`);
console.log();

// Test 10: 50kg patient, na dialyse, 3 dagen
console.log('Test 10: 50kg, na dialyse, 3 dagen');
result = calculateDoses(50, 'na', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*50 = 1250)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 9.375*50 = 468.75, afgerond = 500)`);
console.log();

// Test 11: 85kg patient, tijdens dialyse, 2 dagen
console.log('Test 11: 85kg, tijdens dialyse, 2 dagen');
result = calculateDoses(85, 'tijdens', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*85 = 2975, > max 2500 = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 10*85 = 850, afgerond = 750)`);
console.log();

// Test 12: 85kg patient, tijdens dialyse, 3 dagen
console.log('Test 12: 85kg, tijdens dialyse, 3 dagen');
result = calculateDoses(85, 'tijdens', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*85 = 2975, > max 2500 = 2500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 12.5*85 = 1062.5, afgerond = 1000)`);
console.log();

// Test 13: Afronding test - 60kg, na dialyse, 2 dagen
console.log('Test 13: 60kg, na dialyse, 2 dagen (afronding test)');
result = calculateDoses(60, 'na', '2');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*60 = 1500)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 7.5*60 = 450, afgerond = 500)`);
console.log();

// Test 14: Afronding test - 60kg, tijdens dialyse, 3 dagen
console.log('Test 14: 60kg, tijdens dialyse, 3 dagen (afronding test)');
result = calculateDoses(60, 'tijdens', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 35*60 = 2100, afgerond = 2000)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 12.5*60 = 750)`);
console.log();

// Test 15: Grenswaarde test - 80kg, na dialyse, 3 dagen
console.log('Test 15: 80kg, na dialyse, 3 dagen (grenswaarde test)');
result = calculateDoses(80, 'na', '3');
console.log(`  Oplaaddosis: ${result.loadingDose}mg (verwacht: 25*80 = 2000)`);
console.log(`  Onderhoudsdosis: ${result.maintenanceDose}mg (verwacht: 9.375*80 = 750)`);
console.log();

console.log('=== Alle tests voltooid ===');
