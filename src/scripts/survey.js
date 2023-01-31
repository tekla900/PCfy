/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const selectTeam = document.getElementById('team');
const selectPosition = document.getElementById('position');
const form = document.querySelector('form');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const tabs = document.querySelectorAll('.tab');

const employeeHeader = document.getElementById('employee-header');
const laptopHeader = document.getElementById('laptop-header');
const posSpan = document.getElementById('position-span');
const posDiv = document.querySelector('.position-div');

const selectBrand = document.getElementById('brands');
const selectCPU = document.getElementById('cpus');

const fileInput = document.getElementById('file-input');
const formElements = form.elements;

let currentTab = 0; 

// FETCHING DATA & STORING TO LOCAL STORAGE

window.onload = function() {
    fetch('https://pcfy.redberryinternship.ge/api/teams')
        .then(res => res.json())
        .then(res => {
            res.data.forEach(el => {
                const option = document.createElement('option');
                option.value = el.id;
                option.text = el.name;
                selectTeam.appendChild(option);
            });

            // check if there's a selected team in local storage
            const selectedTeam = localStorage.getItem('selectedTeam');
            if (selectedTeam) {
                selectTeam.value = selectedTeam;
                console.log(selectTeam.value);
                fetch('https://pcfy.redberryinternship.ge/api/positions')
                    .then(response => response.json())
                    .then(res => {
                        // Filter out the positions that match the selected team
                        const positions = res.data.filter(position => position.team_id == selectTeam.value);
                        // Clear the options in the selectPosition element
                        selectPosition.innerHTML = '';
                
                        positions.forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.innerHTML = position.name;
                            selectPosition.appendChild(option);
                        });
                
                        const selectedPosition = localStorage.getItem('selectedPosition');
                        if (selectedPosition) {
                            selectPosition.value = selectedPosition;
                        }

                        selectPosition.disabled = false;
                    })
                    .catch(error => console.log(error));
            }
        });

    // add an event listener to update local storage when the selected team changes
    selectTeam.addEventListener('change', e => {
        localStorage.setItem('selectedTeam', e.target.value);
    });

    selectPosition.addEventListener('change', e => {
        localStorage.setItem('selectedPosition', e.target.value);
    });

    fetch('https://pcfy.redberryinternship.ge/api/brands')
        .then(res => res.json())
        .then(res => {
            res.data.forEach(el => {
                const option = document.createElement('option');
                option.value = el.id;
                option.text = el.name;
                selectBrand.appendChild(option);
            });

            // check if there's a selected team in local storage
            const selectedBrand = localStorage.getItem('selectedBrand');
            if (selectedBrand) {
                selectBrand.value = selectedBrand;
            }
        })
        .catch(error => console.log(error));

    // add an event listener to update local storage when the selected team changes
    selectBrand.addEventListener('change', e => {
        localStorage.setItem('selectedBrand', e.target.value);
    });

    fetch('https://pcfy.redberryinternship.ge/api/cpus')
        .then(res => res.json())
        .then(res => {
            res.data.forEach(el => {
                const option = document.createElement('option');
                option.value = el.name;
                option.text = el.name;
                selectCPU.appendChild(option);
            });

            // check if there's a selected team in local storage
            const selectedCPU = localStorage.getItem('selectedCPU');
            if (selectedCPU) {
                selectCPU.value = selectedCPU;
            }
        })
        .catch(error => console.log(error));

    // add an event listener to update local storage when the selected team changes
    selectCPU.addEventListener('change', e => {
        localStorage.setItem('selectedCPU', e.target.value);
    });

};

selectTeam.addEventListener('change', () => {
    fetch('https://pcfy.redberryinternship.ge/api/positions')
        .then(response => response.json())
        .then(res => {
            // Filter out the positions that match the selected team
            const positions = res.data.filter(position => position.team_id == selectTeam.value);
            // Clear the options in the selectPosition element
            selectPosition.innerHTML = '';

            positions.forEach(position => {
                const option = document.createElement('ption');
                option.value = position.id;
                option.innerHTML = position.name;
                selectPosition.appendChild(option);
            });

            selectPosition.disabled = false;
        })
        .catch(error => console.log(error));
});

// NAVIGATION

// Tab display functions
function displayTab1() {  
    posSpan.textContent = '1/2';

    tabs[0].style.display = 'flex';
    tabs[1].style.display = 'none';

    prevBtn.style.visibility = 'hidden';
    nextBtn.textContent = 'შემდეგი';
}

function displayTab2() {
    posSpan.textContent = '2/2';

    tabs[0].style.display = 'none';
    tabs[1].style.display = 'flex';

    prevBtn.style.visibility = 'visible';
    nextBtn.textContent = 'დამახსოვრება';
    nextBtn.type = 'submit';
}

// Header display functions
function displayHeadersRow() {
    employeeHeader.style.display = 'block';
    laptopHeader.style.display = 'block';

    if (currentTab === 0) { 
        employeeHeader.style.borderBottom = '2px solid #000';
        laptopHeader.style.borderBottom = 'none';
    } else if (currentTab === 1) {
        employeeHeader.style.borderBottom = 'none';
        laptopHeader.style.borderBottom = '2px solid #000';
    }
}

function displayHeadersColumn() {
    if (currentTab === 0) {
        employeeHeader.style.display = 'block';
        laptopHeader.style.display = 'none';
    } else if (currentTab === 1) {
        employeeHeader.style.display = 'none';
        laptopHeader.style.display = 'block';
    }
}

// Main function to show tabs
function showTabs() {
    let flexDir = window.getComputedStyle(posDiv).flexDirection;

    if (flexDir === 'row') {
        displayHeadersRow();
    } else if (flexDir === 'column') {
        displayHeadersColumn();
    }

    if (currentTab === 0) {
        displayTab1();
    } else if (currentTab === 1) {
        displayTab2();
    }
}

// Event listeners
nextBtn.addEventListener('click', (e) => {
    console.log(currentTab);
    if (nextBtn.type != 'submit') {
        e.preventDefault();
        if (validateFirstTab()) {
            if (currentTab === 0) {
                currentTab = 1;
                showTabs();
            } else if (currentTab === 1) {
                nextBtn.type = 'submit';
            }
        }
    }  
});


laptopHeader.addEventListener('click', () => {
    console.log(currentTab);

    if (validateFirstTab()) {
        if (currentTab === 0) {
            currentTab = 1;
            showTabs();
        } 
    }
});

employeeHeader.addEventListener('click', () => {
    console.log(currentTab);

    currentTab = 0;
    showTabs();
});

prevBtn.addEventListener('click', () => {
    console.log(currentTab);

    currentTab = 0;
    showTabs();
});

function goToLandingPage() {
    location.href = 'index.html';
}

function seeNotes() {
    location.href = 'laptops.html';
}

// VALIDATION

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
    if (!validateInputs('number', /^(\+?995)?\d{9}$/)) return false;
    return true;
}


// FILE UPLOAD

fileInput.addEventListener('change', function() {
    let file = this.files[0];
    if (file && file['type'].split('/')[0] === 'image') {
        let reader = new FileReader();
        reader.onload = function() {
            document.querySelector('.upload-btn').style.backgroundImage = 'url(" + reader.result + ")';
            document.querySelector('.upload-btn').style.backgroundSize = 'cover';
            document.querySelector('.file-div').style.display = 'none';
        };
        reader.readAsDataURL(file);

        const div = document.querySelector('.suc-upload');

        const spans = div.querySelectorAll('span');

        spans[0].textContent = file.name + ', ';
        spans[1].textContent = file.size + ' mb';

        div.style.display = 'flex';
    } else {
        const uploadBtn = document.querySelector('.upload-btn');
        const icon = document.querySelector('.fa-solid.fa-triangle-exclamation');

        icon.style.display = 'block';
        document.querySelector('.file-div .blue').style.color = '#E52F2F';
        document.getElementById('camera').style.display = 'none';
        uploadBtn.style.borderColor = '#E52F2F';

        uploadBtn.style.background = '#FFF1F1';
    }
});

// REUPLOAD
document.getElementById('reupload').addEventListener('click', function() {
    document.querySelector('.suc-upload').style.display = 'none';
    document.getElementById('file-input').value = '';
    document.querySelector('.upload-btn').style.backgroundImage = 'none';
    document.querySelector('.file-div').style.display = 'flex';
});


// STORING INPUT DATA IN LOCALSTORAGE

for (let i = 0; i < formElements.length; i++) {
    let element = formElements[i];
    if (element.name) {
        element.addEventListener('input', function() {
            localStorage.setItem('formData', JSON.stringify(getFormData()));
        });
    }
}


// Retrieve form data from local storage and populate the form fields when the page is loaded
window.addEventListener('load', function() {
    let formData = JSON.parse(localStorage.getItem('formData'));
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
        if(!(element.tagName === 'INPUT' && element.type === 'file')) {
            if(!(element.tagName === 'SELECT')) {
                element.value = Number(formData[key]);
            }
            element.value = formData[key];
        }
    }
}

// SAVE RADIO BUTTON VALUES
const typeButtons = document.querySelectorAll('input[name="laptop_hard_drive_type"]');
const stateButtons = document.querySelectorAll('input[name="laptop_state"]');

typeButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        localStorage.setItem('selectedHardDriveType', radioButton.value);
    });
});

stateButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        localStorage.setItem('selectedState', radioButton.value);
    });
});

// Retrieve selected radio button value from local storage on page load and set the corresponding radio button as checked
const selectedHardDriveType = localStorage.getItem('selectedHardDriveType');
const selectedState = localStorage.getItem('selectedState');

if (selectedHardDriveType) {
    const selectedRadioButton = document.querySelector(`input[name="laptop_hard_drive_type"][value="${selectedHardDriveType}"]`);
    selectedRadioButton.checked = true;
}

if (selectedState) {
    const selectedRadioButton = document.querySelector(`input[name="laptop_state"][value="${selectedState}"]`);
    selectedRadioButton.checked = true;
}


// SUBMIT

async function handleFormSubmit(event) {
    event.preventDefault();

    const url = form.action;
    const formData = new FormData(form);
    formData.append('token', 'ca421d1579a320984bc855b2200566e7');

    // check if file input is not empty
    if (fileInput.files.length > 0) {
        // convert file to binary string
        const reader = new FileReader();
        reader.onload = function() {
            const binaryString = reader.result;
            let file = new File([binaryString], 'img.jpeg', {type: 'image/jpeg'});
            formData.append('laptop_image', file);
        };
        reader.readAsBinaryString(fileInput.files[0]);
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        } else {
            popUpPage();
        }
    } catch (error) {
        console.error(error);
    }
}


form.addEventListener('submit', handleFormSubmit);

function popUpPage() {
    document.querySelectorAll('.success, main, body')
        .forEach(elem => 
            elem.style.backgroundColor = '#4A4A4A'
        );
    document.querySelector('.success').style.display = 'flex';
    document.querySelector('.success').style.backgroundColor = 'white';
    form.style.display = 'none';
    document.getElementById('survey-header').style.display = 'none';
}

// date validation 
// const today = new Date().toISOString().split("T")[0];
// document.querySelector("#date").setAttribute("max", today);