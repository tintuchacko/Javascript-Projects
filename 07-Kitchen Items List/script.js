let kitchenInput = document.getElementById('kitchen-input');
let addBtn = document.getElementById('add-btn');
let kitchenItemsList = document.getElementById('kitchen-items-list');
let kitchenInputData;
let kitchenInputDataArray = [];
function buildUI(){
    //kitchenItemsList.textContent="";



    let tempArray = kitchenItemsList.querySelectorAll('li');
       let tempArray1 = [];
       tempArray.forEach((li)=>{
        tempArray1.push(li.innerText);
       })
       console.log(tempArray1);



    kitchenInputDataArray.forEach((item)=>{

       
    if(!tempArray1.includes(item)){
          // Create DOM elements now
          let li = document.createElement('li');
          let spanEl = document.createElement('span');
          li.appendChild(spanEl);
          spanEl.innerText = item;
          li.style.cssText="animation-name:slideIn;";
          kitchenItemsList.appendChild(li);
          kitchenInput.value = "";
          kitchenInput.focus();
  
          //create trash btn
          let trashBtn = document.createElement('i');
          trashBtn.classList.add('fas','fa-trash');
          li.appendChild(trashBtn);
  
          //create edit btn
          let editBtn = document.createElement('i');
          editBtn.classList.add('fas','fa-edit');
          li.appendChild(editBtn);
    }
      

    })
    
}
function setLocalStorage(){
    localStorage.setItem("kitchenInput", JSON.stringify(kitchenInputDataArray));
}
function getLocalStorage(){
    if(localStorage.getItem("kitchenInput")){
        kitchenInputDataArray = JSON.parse(localStorage.getItem("kitchenInput"));
        buildUI();
    }
}
function addKitchenItems(){
    kitchenInputData = kitchenInput.value;
    if(kitchenInputDataArray.includes(kitchenInputData)){
        alert('Sorry! Data already exists');
        kitchenInput.focus();
    }
    else{
        kitchenInputDataArray.push(kitchenInputData);

        // set to local storage
        setLocalStorage();
        //localStorage.setItem('kitchenInput',kitchenInputData);

        //get from local storage
        getLocalStorage();
        //kitchenInputData = localStorage.getItem('kitchenInput');
    }
    

}
function deleteKitchenItem(event){
    if(event.target.classList[1]==='fa-trash'){
        let item = event.target.parentElement;
        item.classList.add('slideOut');
        item.addEventListener('transitionend',function(){
            item.remove();
        })
       
        let spanEl = item.querySelector('span');
        let val = spanEl.innerText;
        let index = kitchenInputDataArray.indexOf(val);

        kitchenInputDataArray.splice(index, 1);
        setLocalStorage();
        buildUI();



    }

}
function editKitchenItem(event){
    if(event.target.classList[1]==='fa-edit'){
        let editedValue = prompt('Please add new text');
        let item = event.target.parentElement;
        let spanEl = item.querySelector('span');
        let val = spanEl.innerText;
        let index = kitchenInputDataArray.indexOf(val);
        console.log(kitchenInputDataArray);
        kitchenInputDataArray[index] = editedValue;
        console.log(kitchenInputDataArray);
        setLocalStorage();
        spanEl.innerText = editedValue;
    }
}


addBtn.addEventListener('click',addKitchenItems);
kitchenItemsList.addEventListener('click', deleteKitchenItem);
kitchenItemsList.addEventListener('click', editKitchenItem);
getLocalStorage();