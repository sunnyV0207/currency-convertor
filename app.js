// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown = document.querySelectorAll(".select-box select");
let btn = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

for(select of dropdown){
    for (code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if(select.name==="from" && code==="INR"){
            option.selected = "selected";
        }else if(select.name==="to" && code==="USD"){
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let code = element.value;
    let currCode = countryList[code];
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("#inp");
    let amtVal = amount.value;
    if(amtVal===0 || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(amtVal);
    
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // let data = response.json();
    // console.log(data);

    const url = `https://v6.exchangerate-api.com/v6/7952fd9e1d05b1c21e113bcc/latest/${fromCurr.value}`;

    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    let targetCurr = toCurr.value;
    // console.log(targetCurr);
    // console.log(data.conversion_rates[targetCurr]);

    let conRate = data.conversion_rates[targetCurr];
    let finalVal = amtVal*conRate;
    // console.log(finalVal);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
})