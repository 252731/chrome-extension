// Log out "Button clicked!" when the user clicks the "SAVE INPUT" button
let myLeads = []

const saveBtn = document.getElementById("save-btn")
const inputEL = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// a)   localStorage.setItem("myLead", "www.barandyk.com")

// b)   console.log(localStorage.getItem("myLeads"))
//      or console.log("myLead")

// c)   localStorage.clear()

// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
// Log out the variable

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function() {
    
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
})

function render(leads) {
    let listItems = " "
    for (let i=0; i < leads.length; i++) {
    //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>" //another way of writing this in the following:
    // const li= document.createElement("li")
    // li.innerHTML=myLeads[i]
    // ulEl.append(li)
    listItems += 
    ` <li> 
        <a target='_blank =' href ='${ leads[i]}'>  ${ leads[i]} </a>
        </li> `
    
}

ulEl.innerHTML=listItems
}


deleteBtn.addEventListener("dblclick", function() {
localStorage.clear()
myLeads=[]
render(myLeads)
})

saveBtn.addEventListener("click", function() {
   myLeads.push(inputEL.value)
   inputEL.value= " " // to clear input box after clicking the save button
   
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   console.log(localStorage.getItem("myLeads"))

 
   render(myLeads)
})


