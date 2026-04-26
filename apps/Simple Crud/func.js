const Price = document.querySelector("#price"),
      Taxes = document.querySelector("#taxes"),
      ADS = document.querySelector("#ads"),
      Count = document.querySelector("#count"),
      Discount = document.querySelector("#discount"),
      Title = document.querySelector("#title"),
      Category = document.querySelector("#category"),
      Total = document.querySelector("#total"),
      submit = document.querySelector("#submit"),
      tbody = document.querySelector("#tbody"),
      Search = document.querySelector("#search"),
      Sound = document.querySelector("audio"),
      validate = /[0-9]/;

let Mood = "create",
    temp,
    searchMood = "title";

window.onload = function() {
    printDataOnPage();
};


function checkInputs(price = "empty", taxes, ads, discount = 0) {

    if(!validate.test(price)) {
        return "Invalid Price" + price;
    }
    if(!validate.test(taxes)) {
        return "Invalid Tax " + taxes;
    }
    if(!validate.test(ads)) {
        return "Invalid ADS " + ads;
    }
    if(!validate.test(discount)) {
        return "Invalid Discount " + discount;
    }
    if(Price.value == "" || Price.value == null) {
        return "Price Field Is Empty";
    }
    return true;

}

Price.addEventListener("keydown", () => {
       getCount();
});
Taxes.addEventListener("keydown", () => {
    getCount();
});
ADS.addEventListener("keydown", () => {
    getCount();
});
Discount.addEventListener("keydown", () => {
    getCount();
});

function getCount(){

        if(checkInputs(Price.value, Taxes.value, ADS.value, Discount.value) !== true) {
           Sound.play();
           showAlert(checkInputs(Price.value, Taxes.value, ADS.value, Discount.value));
        } else {
            var Result = (+Price.value + +Taxes.value + +ADS.value) - +Discount.value;
            Total.value = Result;
        }
}

var AllData = [];

if (localStorage.product != null) {
    try {
        const parsedData = JSON.parse(localStorage.product);
        if (Array.isArray(parsedData)) {
            AllData = parsedData;
            printDataOnPage();
        } else {
            AllData = [];
        }
    } catch (e) {
        AllData = [];
    }
}


submit.onclick = function() {
    
    if(checkInputs(Price.value, Taxes.value, ADS.value, Discount.value)) {
        let Data = {
            price: Price.value.toLowerCase(),
            title: Title.value,
            taxes: Taxes.value,
            category: Category.value.toLowerCase(),
            ads: ADS.value,
            discount: Discount.value,
            total: Total.value
        }

        if(Mood === "create"){
            if(Count.value > 1) {
                for(var j = 0; j < +Count.value; j++) {
                    AllData.push(Data);
                }
            } else {
                AllData.push(Data);
            }
        } else if(Mood === "update") {
            AllData[temp] = Data;
            Mood = "create";
            submit.innerHTML = "Create";
        }
    localStorage.setItem("product", JSON.stringify(AllData));
            getCount();
            printDataOnPage();
            clearInputs();
} else {
    Sound.play();
    showAlert("Invalid Data\n" + checkInputs(Price.value, Taxes.value, ADS.value, Discount.value));
}

};

function clearInputs() {
    Price.value = "";
    Taxes.value = "";
    ADS.value = "";
    Discount.value = "";
    Total.value = "";
    Category.value = "";
};

function printDataOnPage() {

   tbody.innerHTML = "";
if(AllData.length != 0){
        for(var i=0; i < AllData.length; i++) {
            
            if(AllData[i].category == "") AllData[i].category = "None";

            tbody.innerHTML += `
            
            <tr>
            
            <td>${i}</td>
                <td>${AllData[i].title}</td>
                <td>${AllData[i].price}</td>
                <td>${AllData[i].taxes}</td>
                <td>${AllData[i].ads}</td>
                <td>${AllData[i].discount}</td>
                <td>${AllData[i].total}</td>
                <td>${AllData[i].category}</td>
                <td>

                    <button id='update-btn' onclick='updateItem( ${i} )'>Update</button>
                    <button id='delete-btn' onclick='deleteItem( ${i} )'>Delete</button>

                </td>
            </tr>
        `;
        };
} else {
    tbody.innerHTML += `<tr><td colspan='9'>No Items !</td></tr>`;
}};

function deleteItem(id) {

    var check = confirm("Do You Want Delete This Item" + AllData[id].title + " ?");

    if(check) {
        var item = AllData[id].title;
        AllData.splice(id, 1);
        localStorage.setItem("product", JSON.stringify(AllData));
        printDataOnPage();
        showAlert(item + " Was Deleted Secceusfully");
    } else {
        showAlert("Canceled!");
    }
}



// Testing Function

// function deleteAllItem() {

//     var check = confirm("Do You Want Delete All Items?");

//     if(check) {
//         AllData.splice(0);
//         localStorage.setItem("product", JSON.stringify(AllData));
//         printDataOnPage();
//         showAlert("All Items Was Deleted!");
//     } else {
//         showAlert("Canceled!");
//     }
// }

function updateItem(id) {
    Title.value = AllData[id].title;
    Price.value = AllData[id].price;
    Taxes.value = AllData[id].taxes;
    Category.value = AllData[id].category;
    ADS.value = AllData[id].ads;
    getCount();
    submit.innerHTML = "Update";
    printDataOnPage();
    Count.classList.add("disable")
    Count.setAttribute("disabled","disabled");
    Mood = "update";
    temp = id;

    window.scroll({
        top: 0,
        behavior: "smooth"
    });

    showAlert("Enable Update Mode");
}
function getSearchMood(mood) {
    
    if(mood == "cat") {
        searchMood = "cat";
    } else if(mood == "title") {
        searchMood = "title";
    }
    Search.placeholder = "Search By " + mood;
    Search.focus();
    Search.value = "";
    printDataOnPage();

}
function searchData(data) {
  
    if(searchMood == "title") {
        tbody.innerHTML = '';
        for(let k = 0; k < AllData.length; k++) {
            if(AllData[k].category == "") AllData[k].category = "None";
            if(AllData[k].title.includes(data.toLowerCase())){
            tbody.innerHTML += `
                 
        <tr>
        
        <td>${k}</td>
            <td>${AllData[k].title}</td>
            <td>${AllData[k].price}</td>
            <td>${AllData[k].taxes}</td>
            <td>${AllData[k].ads}</td>
            <td>${AllData[k].discount}</td>
            <td>${AllData[k].total}</td>
            <td>${AllData[k].category}</td>
            <td>

                <button id='update-btn' onclick='updateItem( ${k} )'>Update</button>
                <button id='delete-btn' onclick='deleteItem( ${k} )'>Delete</button>

            </td>
        </tr>
            `;
        }
    }
    } else if(searchMood == "cat") {
        tbody.innerHTML = '';
        for(let k = 0; k < AllData.length; k++) {
            if(AllData[k].category == "") AllData[k].category = "None";

            if(AllData[k].category.includes(data.toLowerCase())){

            tbody.innerHTML += `   
        <tr>
        <td>${k}</td>
            <td>${AllData[k].title}</td>
            <td>${AllData[k].price}</td>
            <td>${AllData[k].taxes}</td>
            <td>${AllData[k].ads}</td>
            <td>${AllData[k].discount}</td>
            <td>${AllData[k].total}</td>
            <td>${AllData[k].category}</td>
            <td>

                <button id='update-btn' onclick='updateItem( ${k} )'>Update</button>
                <button id='delete-btn' onclick='deleteItem( ${k} )'>Delete</button>

            </td>
        </tr>
            `;
        }
    }
    }};

function showAlert(message) {

    let boxAlert = document.querySelector(".alert-box"); 
    boxAlert.classList.add("alert");
    boxAlert.innerHTML = message;

    setTimeout(function(){
        boxAlert.classList.remove("alert");
    }, 5500);

    return message;
}