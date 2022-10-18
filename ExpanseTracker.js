// step1    // get data and show in local storage

let historyTable = document.getElementById('historyTable');
let storedData = JSON.parse(localStorage.getItem('localtask'));

// if data is available in localstorage then show it on history table
if (storedData == null || storedData == []) {

    localStorage.setItem("localtask", JSON.stringify([]));

} else {


    for (let trans of storedData) {

        let row = document.createElement('tr');
        row.innerHTML = `<td>${trans.item}</td><td id="transAmountItem">${trans.amount}</td><td>${trans.date}</td><td>${trans.type}</td>`

        historyTable.appendChild(row);

    }



}


const show =()=>{

    let balance = document.getElementById("balance");
    let Income = document.getElementById("totalIncome");
    let Expense = document.getElementById("totalExpense");
    let totalIncome =0;
     let totalExpense =0;
     let currentbalance=0
    let localdata = JSON.parse(localStorage.getItem("localtask"))
    for(let tran of localdata ){
        let getamount=  parseInt(tran.amount)
        if(tran.type=="income"){
            totalIncome+= getamount;
            currentbalance+=getamount
        }
        else if(tran.type=="expense"){
            totalExpense += getamount
            currentbalance -= getamount
        }
        else{
            console.log(`transaction type is not defined.`);
        }
    }
    console.log(currentbalance);
    Income.innerHTML=totalIncome;
    balance.innerHTML= currentbalance;
    Expense.innerHTML=totalExpense

}
show()


// step  3: add transaction into history table list and also store it in 
// localstorage on clicking add button
let transactionBtn = document.getElementById("transactionBtn")
transactionBtn.addEventListener("click", async ()=>{
    let transactionItem=document.getElementById("transactionItem")
    let transactionAmount=document.getElementById("transactionAmount")
    let transactionDate=document.getElementById("transactionDate")
    let transactionType=document.getElementById("transactionType")

    let addtransaction = JSON.parse(localStorage.getItem("localtask"))
    let transactionObject = {
        item : transactionItem.value,
        amount:transactionAmount.value,
        date: transactionDate.value,
        type:transactionType.value 
    }
    console.log(transactionObject);
    addtransaction.push(transactionObject);
    

    await localStorage.setItem("localtask", JSON.stringify(addtransaction))
    let row = document.createElement('tr');
    row.innerHTML = `<td>${transactionItem.value}</td><td>${transactionAmount.value}</td><td>${transactionDate.value}</td><td>${transactionType.value}</td>`

    historyTable.appendChild(row);

    await show();


})