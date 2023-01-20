const selectTeam = document.getElementById('team');
const selectPosition = document.getElementById('position');
const form = document.querySelector('form');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const header = document.querySelector('.position-div');
const tabs = document.querySelectorAll('.tab');

const selectBrand = document.getElementById('brands');
const selectCPU = document.getElementById('cpus');

const fileInput = document.getElementById("file-input");
const formElements = form.elements;

let currentTab = 0; 

// adding options to team and position select inputs
fetch("https://pcfy.redberryinternship.ge/api/teams")
    .then(res => res.json())
    .then(res => {
        res.data.forEach(el => {
            const option = document.createElement('option');
            option.value = el.id;
            option.text = el.name;
            selectTeam.appendChild(option);
        });
    })
    .catch(error => console.log(error));

// enabling position choosing after team is chosen
selectTeam.addEventListener('change', () => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
    .then(response => response.json())
    .then(res => {
        // Filter out the positions that match the selected team
        const positions = res.data.filter(position => position.team_id == selectTeam.value);
        // Clear the options in the selectPosition element
        selectPosition.innerHTML = "";

        // Add the filtered positions as options in the selectPosition element
        positions.forEach(position => {
            const option = document.createElement("option");
            option.value = position.id;
            option.innerHTML = position.name;
            selectPosition.appendChild(option);
        });
        selectPosition.disabled = false;
    });
});

// adding options to brand and cpu select inputs
fetch("https://pcfy.redberryinternship.ge/api/brands")
    .then(res => res.json())
    .then(res => {
        res.data.forEach(el => {
            const option = document.createElement('option');
            option.value = el.id;
            option.text = el.name;
            selectBrand.appendChild(option);
        });
    })
    .catch(error => console.log(error));

fetch("https://pcfy.redberryinternship.ge/api/cpus")
.then(res => res.json())
.then(res => {
    res.data.forEach(el => {
        const option = document.createElement('option');
        option.value = el.id;
        option.text = el.name;
        selectCPU.appendChild(option);
    });
})
.catch(error => console.log(error));


const employeeHeader = document.getElementById('employee-header');
const laptopHeader = document.getElementById('laptop-header');
const posSpan = document.getElementById('position-span');
const posDiv = document.querySelector('.position-div');

function showTabs() {
    let flexDir = window.getComputedStyle(posDiv).flexDirection;
    if(currentTab === 0) {
        if (flexDir === "row") {
            employeeHeader.style.display = 'block';
            laptopHeader.style.display = 'block';

            employeeHeader.style.borderBottom = '2px solid #000';
            laptopHeader.style.borderBottom = 'none'

            // console.log('eventamde');
            // laptopHeader.addEventListener('click', () => {
            //     console.log('eventshi');
            //     e.preventDefault();
            //     // if (validateFirstTab()) {
            //         if(currentTab === 0) {
            //             currentTab = 1;
            //             showTabs();
            //         } else if(currentTab === 1) {
            //             currentTab = 2;
            //             showTabs();
            //         }
            //     // }
            // })
        } else if (flexDir === "column") {
            employeeHeader.style.display = 'block';
            laptopHeader.style.display = 'none';
        }
        
        posSpan.textContent = '1/2';

        tabs[0].style.display = 'flex';
        tabs[1].style.display = 'none';

        prevBtn.style.visibility = 'hidden';
        nextBtn.textContent = 'შემდეგი';

    } else if(currentTab === 1) {

        if (flexDir === "row") {
            employeeHeader.style.display = 'block';
            laptopHeader.style.display = 'block';

            employeeHeader.style.borderBottom = 'none';
            laptopHeader.style.borderBottom = '2px solid #000';

            laptopHeader.addEventListener('click', () => {
                currentTab = 0; 
                showTabs();
            })
        } else if (flexDir === "column") {
            employeeHeader.style.display = 'none';
            laptopHeader.style.display = 'block';
        }
        

        posSpan.textContent = '2/2';

        tabs[0].style.display = 'none';
        tabs[1].style.display = 'flex';

        prevBtn.style.visibility = 'visible';
        nextBtn.textContent = 'დამახსოვრება';

        
        
        nextBtn.type = "submit";
    } else if(currentTab === 2) {
        nextBtn.type = "submit";
    }
}


// validation

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // if (validateFirstTab()) {
        if(currentTab === 0) {
            currentTab = 1;
            showTabs();
        } else if(currentTab === 1) {
            currentTab = 2;
            showTabs();
        }
    // }
})

prevBtn.addEventListener('click', () => {
    currentTab = 0; 
    showTabs();
})

function validateSelects(select) {
    if (select.value === '') {
        select.classList.add('error');

        return false;
    } else {
        return true;
    }
}


function validateLaptopName() {
    const input = document.getElementById('laptopName');
    const label = document.querySelector(`label[for="${'laptopName'}"]`);
    const span = document.querySelector(`#${'laptopName'} + .info-span`);

    const regex = /[a-zA-Z0-9!@#$%^&*()_+=]+/;

    if(!regex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        span.classList.add('error');

        return false;
    } else {
        return true;
    }
}

function validateDigits(id) {
    const input = document.getElementById(id);
    const label = document.querySelector(`label[for="${id}"]`);
    const span = document.querySelector(`#${id} + .info-span`);

    const regex = /^[0-9]*$/;

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        span.classList.add('error');

        return false;
    } else {
        return true;
    }
}

function validateInputs(id, regex) {
    const input = document.getElementById(id);
    const label = document.querySelector(`label[for="${id}"]`);
    const span = document.querySelector(`#${id} + .info-span`);

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        span.classList.add('error');

        return false;
    } else {
        return true;
    }
}

function validateFirstTab() {
    if (!validateInputs('name', /^[\u10A0-\u10FF]{2,}$/)) return false;
    if (!validateInputs('lastName', /^[\u10A0-\u10FF]{2,}$/)) return false;
    if (!validateSelects(selectTeam)) return false;
    if (!validateSelects(selectPosition)) return false;
    if (!validateInputs('email', /^[^@]+@redberry.ge$/)) return false;
    if (!validateInputs('number', /^\d{9}$/)) return false;
    return true;
}


fileInput.addEventListener("change", function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function() {
            document.querySelector(".upload-btn").style.backgroundImage = "url(" + reader.result + ")";
            document.querySelector(".upload-btn").style.backgroundSize = "contain";
            document.querySelector('.file-div').style.display = 'none';
        };
        reader.readAsDataURL(file);
        console.log("Uploaded file name: " + file.name);
        console.log("Uploaded file size: " + file.size + " bytes");
    }
});


// formData.append('laptop_image', fileInput.files[0], "img.jpeg");


form.onsubmit = () => console.log('yay');


var radios = document.querySelectorAll('input[name=condition]');
var icons = document.querySelectorAll('#radio-check');
for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
        // for (var j = 0; j < icons.length; j++) {
        //     icons[j].style.display = 'none';
        // }
        this.parentNode.querySelector('i').style.display = 'block';
    });
}

for (let i = 0; i < formElements.length; i++) {
    let element = formElements[i];
    if (element.name) {
      element.addEventListener("input", function() {
        localStorage.setItem("formData", JSON.stringify(getFormData()));
      });
    }
}

// Retrieve form data from local storage and populate the form fields when the page is loaded
window.addEventListener("load", function() {
    let formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      populateForm(formData);
    }
});


// Helper function to get the form data as an object

function getFormData() {
    let formData = {};
    for (let i = 0; i < formElements.length; i++) {
      let element = formElements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    return formData;
}
    
  
// Helper function to populate the form fields with data
function populateForm(formData) {
    for (let key in formData) {
      let element = document.getElementsByName(key)[0];
      element.value = formData[key];
    }
}

function goToLandingPage() {
    location.href = "index.html";
}