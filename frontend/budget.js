let expenses = [];

function addExpense() {
    let income = parseFloat(document.getElementById("income").value);
    let category = document.getElementById("category").value;
    let amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!income || !amount) {
        alert("Please enter income and expense amount.");
        return;
    }

    expenses.push({ category, amount });
    updateExpenseList(income);
}

function updateExpenseList(income) {
    let expenseList = document.getElementById("expenseList");
    let result = document.getElementById("result");
    expenseList.innerHTML = "";

    let totalExpenses = 0;
    let categoryTotals = {};

    expenses.forEach(exp => {
        totalExpenses += exp.amount;
        if (!categoryTotals[exp.category]) {
            categoryTotals[exp.category] = 0;
        }
        categoryTotals[exp.category] += exp.amount;

        let li = document.createElement("li");
        li.innerText = `${exp.category}: ₹${exp.amount}`;
        expenseList.appendChild(li);
    });

    result.innerHTML = `<p>Total Expenses: ₹${totalExpenses}</p>`;

    Object.keys(categoryTotals).forEach(category => {
        let percentage = (categoryTotals[category] / income) * 100;
        if (percentage > 30) {
            result.innerHTML += `<p style="color: red;">⚠️ You are spending too much on ${category} (${percentage.toFixed(2)}% of income)!</p>`;
        }
    });
}