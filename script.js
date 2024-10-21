
document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    showPage(currentPage);

    const denominationValues = {
        200: 200,
        100: 100,
        // Add other denominations here
        "10c": 0.10
    };

    function showPage(pageNumber) {
        document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
        document.querySelector(`#page${pageNumber}`).classList.add("active");
    }

    function calculateTotal(formId, qtyPrefix, totalPrefix, grandTotalId) {
        let grandTotal = 0;
        Object.keys(denominationValues).forEach(denomination => {
            const qty = parseFloat(document.querySelector(`#${qtyPrefix}${denomination}`).value) || 0;
            const total = qty * denominationValues[denomination];
            document.querySelector(`#${totalPrefix}${denomination}`).innerText = total.toFixed(2);
            grandTotal += total;
        });
        document.querySelector(`#${grandTotalId}`).innerText = grandTotal.toFixed(2);
    }

    function calculateDifference() {
        Object.keys(denominationValues).forEach(denomination => {
            const total1 = parseFloat(document.querySelector(`#total${denomination}_1`).innerText) || 0;
            const total2 = parseFloat(document.querySelector(`#total${denomination}_2`).innerText) || 0;
            const difference = total2 - total1;
            document.querySelector(`#diff${denomination}`).innerText = difference.toFixed(2);
        });

        const grandTotal1 = parseFloat(document.querySelector("#grandTotal1").innerText) || 0;
        const grandTotal2 = parseFloat(document.querySelector("#grandTotal2").innerText) || 0;
        const totalDifference = grandTotal2 - grandTotal1;
        document.querySelector("#totalDifference").innerText = totalDifference.toFixed(2);
    }

    window.navigateToPage = function(page) {
        if (page === 2) {
            calculateTotal("form1", "qty", "total", "grandTotal1");
        } else if (page === 3) {
            calculateTotal("form2", "qty", "total", "grandTotal2");
            calculateDifference();
        }
        showPage(page);
    };
});
