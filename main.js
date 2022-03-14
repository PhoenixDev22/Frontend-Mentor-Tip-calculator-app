const theAmountOfMmoney = document.getElementById("cost");
const theTipPercentage = document.getElementById("tip-percentage");
const theNumberOfPeople = document.getElementById("number__of-people");
const tipAmountPerPerson = document.getElementById("tip-amount");
const totalAmountPaidPerPerson = document.getElementById("total");
const resetBtn = document.getElementById("reset");
let myListOfBtns = [...document.querySelectorAll(".btn")];
let customTip =  document.getElementById("tip-percentage");
let valid__num = false;
let valid__amount = false;

// calculates the custom tip function 
customTip.oninput = function(){
    removeTheActiveClass(); 
    let mytip = parseInt (getTheValues(customTip)) / 100;
    calculateTip(mytip);
    theNumberOfPeople.oninput = function(){
        calculateTip(mytip)
    }
}
//  add event listener on the buttons 
myListOfBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        removeTheActiveClass();
        e.currentTarget.classList.add("active");  
        let mytip = (e.currentTarget.dataset.tip) / 100;
        calculateTip(mytip);
        theNumberOfPeople.oninput = function(){
            calculateTip(mytip)
        }
    })
})

// main function to calculate the tip 
function calculateTip(mytip){
    let theAmount = parseInt(getTheValues(theAmountOfMmoney));
    let thenumpeople = getTheValues(theNumberOfPeople);
    if( thenumpeople != "" && thenumpeople != 0 && theAmount !== 0 && theAmount != "" ){
        let thenumberpeople = parseInt(thenumpeople);
        let thetipamount = ((theAmount * mytip) / thenumberpeople).toFixed(2) ;
        tipAmountPerPerson.innerHTML = `$ ${thetipamount}`;
        let total = ((theAmount / thenumberpeople) + parseInt(thetipamount)).toFixed(2);
        totalAmountPaidPerPerson.innerHTML = `$ ${total}`;
        if (valid__amount || valid__num  ){
            removeThrowMsg(); 
        } 
    }else{
        if(theAmount == 0){
            if (!valid__amount){
                throwErrorAmount()
            }
        }else{
            removeThrowMsg(); 
        }
        if(thenumpeople == 0 || thenumpeople == 0  ){
            if( !valid__num  ){
                throwError();
            }
        }else{
            removeThrowMsg(); 
        }
    }
}
// throw message when the amount of money Bill  is zero or empty (create a span and append it)
function throwErrorAmount(){
    let msgSpan = document.createElement("span");
    let elementTitle = document.getElementById("title");
    let msgText = document.createTextNode("Bill can't be zero or less");
    msgSpan.setAttribute("class", "error__msg");
    msgSpan.id = "valid__msg";
    msgSpan.appendChild(msgText);
    elementTitle.appendChild(msgSpan);
    valid__amount = true;
}
// fuction to remove the active class from the buttons
function removeTheActiveClass(){
    myListOfBtns.forEach(btn => {
        btn.classList.remove("active")
    })
}
// function to get the value of the input 
function getTheValues(ele){
    return ele.value;  
}

// throw message when the number of people is zero or empty (create a span and append it)
function throwError(){
    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("Number can't be zero or less");
    let element = document.getElementById("label__msg");
    msgSpan.setAttribute("class", "error__msg");
    msgSpan.id = "error-msg";
    msgSpan.appendChild(msgText);
    element.appendChild(msgSpan);
    valid__num = true;
}
// remove the thrown message when unvalid values
function removeThrowMsg(){
    let myMsg = document.getElementById("error-msg");
    let myMessage = document.getElementById("valid__msg");
    if(myMsg ){
        myMsg.remove();
        valid__num = false;
    }
    if(myMessage ){
        myMessage.remove();
        valid__amount = false
    }
}

// reset button function 
resetBtn.addEventListener("click", function(){
    theAmountOfMmoney.value = "0.00";
    theNumberOfPeople.value = "";
    tipAmountPerPerson.innerHTML = `$ 0.00`;
    totalAmountPaidPerPerson.innerHTML = `$ 0.00`;
    removeThrowMsg();
    customTip.value = "";
})
// clear the value on the focus on the amount of money input 
theAmountOfMmoney.onfocus = function(){
    theAmountOfMmoney.value = "";
}
// clear the value on the focus on the number of people
theNumberOfPeople.onfocus = function(){
    theNumberOfPeople.value = "";
}
