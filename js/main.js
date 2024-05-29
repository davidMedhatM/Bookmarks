var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var submitbtn = document.getElementById('submitbtn');

var productContainer;
if (localStorage.getItem('Bookmarks')==null) {
    productContainer=[]
} else {
    productContainer=JSON.parse(localStorage.getItem('Bookmarks'));
    displayProduct();
}
function addProduct(){
    var product={
        name : siteName.value,
        Url : siteURL.value
    }
    productContainer.push(product);
    localStorage.setItem('Bookmarks', JSON.stringify(productContainer))
    displayProduct();
    ClearForm();
}

function ClearForm(){
    siteName.value=null;
    siteURL.value=null;
}








function displayProduct(){
    var content='';
    for (let i = 0; i < productContainer.length; i++) {
        content +=`
        <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td><a href="${productContainer[i].Url}" target="_blank" class="btn btn-outline-info">Visit</a></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-delete-left"></i> Delete </button></td>
      </tr>`
    }
    document.getElementById('tbody').innerHTML=content;
}
function deleteProduct(i){
    productContainer.splice(i,1);
    displayProduct(productContainer);
    localStorage.setItem('Bookmarks',JSON.stringify(productContainer));
}




function validate(element) {
    // var regexName=/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    // var regexURL=/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    // var name = siteName.value;
    //  var Url = siteURL.value;
    // if (regexURL.test(Url)) {
    // } else {
    // }
    console.log("here");
    var regex={
        siteURL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        siteName:/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/
    }
    if (regex[element.id].test(element.value)) {
        console.log("true");
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block','d-none');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none','d-block');

        console.log("false");
    }

    if (regex['siteURL'].test(siteURL.value) && regex['siteName'].test(siteName.value)) {
        submitbtn.classList.replace('d-none','d-block');
    } else {
        submitbtn.classList.replace('d-block','d-none');
    }
}