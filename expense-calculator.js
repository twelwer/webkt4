document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalAmountElement = document.getElementById('totalAmount');
    let expenses = [];
    function updateTotalAmount() {
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountElement.textContent = totalAmount;
    }
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: ${expense.amount} <button onclick="removeExpense(${expense.id})">Удалить</button>`;
            expenseList.appendChild(li);
        });
        updateTotalAmount();
    }
    function addExpense() {
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        if (expenseName && !isNaN(expenseAmount)) {
            const newExpense = {
                id: Date.now(),
                name: expenseName,
                amount: expenseAmount
            };
            expenses.push(newExpense);
            renderExpenses();
            document.getElementById('expenseName').value = '';
            document.getElementById('expenseAmount').value = '';
        }
    }
    window.addExpense = addExpense;
    window.removeExpense = function (expenseId) {
        expenses = expenses.filter(expense => expense.id !== expenseId);
        renderExpenses();
    };
    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault(); 
        addExpense();
    });
});
