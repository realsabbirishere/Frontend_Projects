const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurr = document.querySelector("#toCurrency");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.id === "fromCurrency" && currCode === "USD") {
            newOption.selected = true;
        }
        else if (select.id === "toCurrency" && currCode === "BDT") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
});
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal <= 0) {
        amountVal = 1;
        amount.value = "1";
    }
    const from = fromCurrency.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from][to];
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

const updateFlag = (select) => {
    let currCode = select.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
    let img = select.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
});