// Load cash data from sessionStorage or initialize if not available
let register1 = JSON.parse(sessionStorage.getItem('register1')) || {
    R200: 0, R100: 0, R50: 0, R20: 0, R10: 0, R5: 0, R2: 0, R1: 0, R0_5: 0, R0_2: 0, R0_1: 0
};
let register2 = JSON.parse(sessionStorage.getItem('register2')) || {
    R200: 0, R100: 0, R50: 0, R20: 0, R10: 0, R5: 0, R2: 0, R1: 0, R0_5: 0, R0_2: 0, R0_1: 0
};

// Store quantities in respective register objects
function calculateTotal(denomination, qtyId, totalId, register) {
    const qty = document.getElementById(qtyId).value;
    const total = denomination * qty;
    document.getElementById(totalId).innerText = total.toFixed(2);

    // Update the corresponding register
    register[denominationToKey(denomination)] = parseFloat(qty) || 0;

    // Save updated register to sessionStorage
    sessionStorage.setItem(register === register1 ? 'register1' : 'register2', JSON.stringify(register));

    // Update Grand Total
    updateGrandTotal(register);
}

// Update Grand Total for the register
function updateGrandTotal(register) {
    const grandTotal = Object.entries(register)
        .reduce((acc, [key, qty]) => acc + qty * keyToDenomination(key), 0);
    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}

// Convert denomination to object key
function denominationToKey(denomination) {
    return denomination === 0.5 ? 'R0_5' :
           denomination === 0.2 ? 'R0_2' :
           denomination === 0.1 ? 'R0_1' :
           'R' + denomination;
}

// Convert object key to denomination
function keyToDenomination(key) {
    return key === 'R0_5' ? 0.5 :
           key === 'R0_2' ? 0.2 :
           key === 'R0_1' ? 0.1 :
           parseFloat(key.substring(1));
}

// Compare registers and display differences in Rand value
function compareRegisters() {
    let differences = "";
    Object.keys(register1).forEach(key => {
        const differenceQty = register1[key] - register2[key];
        const differenceValue = differenceQty * keyToDenomination(key); // Convert to Rand value
        if (differenceValue !== 0) {
            differences += `<tr>
                                <td>${key}</td>
                                <td>${(register1[key] * keyToDenomination(key)).toFixed(2)}</td>
                                <td>${(register2[key] * keyToDenomination(key)).toFixed(2)}</td>
                                <td>${differenceValue.toFixed(2)}</td>
                            </tr>`;
        }
    });
    document.getElementById("differencesTableBody").innerHTML = differences;
}


// Navigation to switch between pages
function navigateTo(page) {
    window.location.href = `${page}.html`;
}
