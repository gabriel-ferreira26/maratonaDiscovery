const Modal = {
    open() {
        //Abri modal
        //Adicionar a classe active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },

    close() {
        //fechar modal
        //Retira a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transaction = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '31/01/2021'
    },
    {
        id: 2,
        description: 'Salario',
        amount: +200000,
        date: '31/01/2021'
    },
    {
        id: 3,
        description: 'internet',
        amount: -5000,
        date: '31/01/2021'
    }
]

const Transaction = {
    all: transaction,
    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        
        return income;
        //somar as entradas
    },
    expenses() {
        let expenses = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
             expenses += transaction.amount;
            }
        })
        
        return expenses;
        //somar as saidas
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
        //entradas - saidas 
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

        console.log(tr)
    },

    innerHTMLTransaction(transaction) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = ` 
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="remover trasaction" >
            </td>
        `
        return html;
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());

        console.log(document.getElementById('totalDisplay'))

    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

transaction.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance();