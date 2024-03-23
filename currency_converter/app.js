const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelectorAll(".from select")[0];
const tocurr=document.querySelectorAll(".from select")[1];
const mssg=document.querySelector(".mssg");

const getExchangeData = async ()=>{
  let amount=document.querySelector(".amount input");
  let amountVal=amount.value;
  if(amountVal==="" || amountVal<1){
    amountVal=1;
    amount.value= "1";
  }
  const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  let response=await fetch(URL);
  let data= await response.json();
  let f=fromcurr.value.toLowerCase();
  let rate=data[f][tocurr.value.toLowerCase()];
  let result=(rate*amountVal).toFixed(2);
  let finalmssg=`${amountVal} ${fromcurr.value} = <b>${result}</b> ${tocurr.value}`; 
  mssg.innerHTML=finalmssg;
};

for(let select of dropdown){
  for(code in countryList){
    let newoption=document.createElement("option");
    newoption.value=code;
    newoption.innerText=code;
    if(select.name==="from" && code==="USD"){
      newoption.selected="selected";
    }else if(select.name==="to" && code==="INR"){
      newoption.selected="selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag=(element)=>{
  let currcode=element.value;
  let code=countryList[currcode];
  let newsrc=`https://flagsapi.com/${code}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;
};

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  getExchangeData();
});

window.addEventListener("load", () => {
  getExchangeData();
});

