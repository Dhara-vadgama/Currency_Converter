
const base_url = "https://latest.currency-api.pages.dev/v1/currencies";




const dropdown=document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".fromsel");
const tocurr=document.querySelector(".tosel");

const msg=document.querySelector(".msg")
 const btn=document.querySelector("form button");



for (let select of dropdown){
  for (let currCode in countryList) {
     let newOption=document.createElement("option");
     newOption.innerText=currCode;
     newOption.value=currCode;
     if(select.name==="from"&& currCode==="USD") {
      newOption.selected="selected";
     }else if(select.name==="to"&& currCode==="INR") {
      newOption.selected="selected";
     }
     select.append(newOption);

     
   
  }

  select.addEventListener("change",(evt)=>{
    updateFlage(evt.target);
})
}


const updateFlage=(element)=>{
     let currCode = element.value;
     let countycode= countryList[currCode];
     let newsrc=`https://flagsapi.com/${countycode}/shiny/64.png`
     let img=element.parentElement.querySelector("img");
     img.src=newsrc;
}



let rate; // Declare rate variable

async function upadtedrate() {
  let amount = document.querySelector("input").value;
  const fromcurr = document.querySelector(".fromsel").value.toLowerCase();  // Get the value from the "from" select
  const tocurr = document.querySelector(".tosel").value.toLowerCase();      // Get the value from the "to" select

  const URL = `${base_url}/${fromcurr}.json`;  // Update the URL to use the correct currency codes

  try {
    const response = await fetch(URL);
    const data = await response.json();
    
    // Ensure you're getting the correct exchange rate
    rate = data[fromcurr][tocurr];
    const finalAmount = (amount * rate).toFixed(2);  // Calculate the final amount with two decimal places

    // Display the result
    document.querySelector(".msg").innerText = `${amount} ${fromcurr.toUpperCase()} = ${finalAmount} ${tocurr.toUpperCase()}`;
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".msg").innerText = "Something went wrong. Please try again.";
  }
}

window.addEventListener("load",()=>{
  upadtedrate();
})

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  upadtedrate();
})

