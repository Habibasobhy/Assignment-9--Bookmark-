// & declare Global Variables
var siteName = document.querySelector("#bookMarkName");
var siteUrl = document.querySelector("#bookMarkUrl");
var Submit = document.querySelector("#Submit");
var closeBtn = document.querySelector("#closeBtn");

var bUrl = "";
var bName = "";

// & declare Global Array
var siteList = [];


// ^ Onclick Event
Submit.addEventListener("click",addBookmarkSite);
closeBtn.addEventListener("click",closeLightBox)

//& LocalStorage
if(localStorage.getItem("siteList")!=null){
    siteList=JSON.parse(localStorage.getItem("siteList"));
    displaySite(siteList);
}


//&  Declare addBookmarkSite Function
function addBookmarkSite(){

    var bookmark = {
        name : siteName.value,
        url : siteUrl.value
    };

    var item = true;

    if(validateName(bName) == true && isValidUrl(bUrl) == true){

        //* To check the site Name Duplicated or not
        for(var i = 0; i < siteList.length; i++){ 
            // console.log("bookmark = ",bookmark.name);
            // console.log("siteList = ",siteList[i].name);
            console.log(bookmark.name);
            if(bookmark.name == siteList[i].name){
                item = false;
                break;
            }
        }
        // console.log("item = ",item);

        if(item == true){
    
            siteList.push(bookmark);
            console.log(siteList);
    
            localStorage.setItem("siteList",JSON.stringify(siteList));
            displaySite(siteList);
            clearForm();
        }
        else{
            // alert("The  Website name you entered exists, please enter another SiteName");
            document.getElementById("lightBoxContainer").classList.replace("d-none","d-flex");
        }
    }  
    else{
        document.getElementById("lightBoxContainer").classList.replace("d-none","d-flex");
    } 
}

// ^ ==============================================================


//&  Declare displaySite function
function displaySite(list){
    var cartona = "";
for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td>
                        <button onclick="OpenSiteWithOnClick(${i})" class="btn btn-visit text-white" type = "button">
                            <i class="fa-solid fa-eye pe-1"></i>
                            Visit
                        </button>
                    </td>
                    <td>
                        <button onclick = "deleteBookmark(${i})" class="btn btn-delete text-white" id="deleteBtn">
                            <i class="fa-solid fa-trash-can pe-1"></i>
                             Delete
                        </button>
                    </td>
                </tr>`
}
document.getElementById("tbody").innerHTML = cartona;
}

// ^ ==============================================================


//&  Declare deleteBookmark Function
function deleteBookmark(index) {
    siteList.splice(index,1);
    localStorage.setItem("siteList",JSON.stringify(siteList));
    displaySite(siteList);
}

// ^ ==============================================================


//&  Declare ClearForm Function
function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

// ^ ==============================================================


//&  Declare OpenSiteWithOnClick function

function OpenSiteWithOnClick(index) {
    window.open(siteList[index].url)
}


// ^ ==============================================================


// ~ Oninput Event of (Name)
siteName.addEventListener("input",function(){
    bName = siteName.value;
    validateName(bName);
})

//&  Declare validateName function
function validateName(bName) {
    var regex = /^\w{3,}$/;

    if (regex.test(bName) == true) {
        siteName.classList.replace('is-invalid','is-valid');
        siteName.style.borderColor = "#198754";
        siteName.style.boxShadow = "0 0 0 0.25rem rgba(25,135,84,.25)";
        return true
    }
    else {
        siteName.classList.add('is-invalid');
        siteName.style.borderColor = "#dc3545";
        siteName.style.boxShadow = "0 0 0 0.25rem rgba(220,53,69,.25)";
        return false;
    }
}


// ^ ==============================================================


// ~ Oninput Event of (URL)
siteUrl.addEventListener("input",function(){

    bUrl = siteUrl.value;

    isValidUrl(bUrl);
})

//&  Declare validateUrl Function using Constructor
function isValidUrl(url) {
    try {
        new URL(url);
        siteUrl.classList.replace('is-invalid','is-valid');
        siteUrl.style.borderColor = "#198754";
        siteUrl.style.boxShadow = "0 0 0 0.25rem rgba(25,135,84,.25)";
        return true;
    }
    catch (err) {
        siteUrl.classList.add('is-invalid');
        siteUrl.style.borderColor = "#dc3545";
        siteUrl.style.boxShadow = "0 0 0 0.25rem rgba(220,53,69,.25)";
        return false;
    }
}

// ^ ==============================================================

//&  Declare closeLightBox Function
function closeLightBox(){
    document.getElementById("lightBoxContainer").classList.replace("d-flex","d-none");
}