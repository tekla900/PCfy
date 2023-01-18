const selectTeam = document.getElementById('team');
const selectPosition = document.getElementById('position');
const form = document.querySelector('form');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const header = document.querySelector('.position-div');
const tabs = document.querySelectorAll('.tab');

const selectBrand = document.getElementById('brands');
const selectCPU = document.getElementById('cpus');

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



function changeTabs() {

    if (currentTab == 1) {
        header.innerHTML = `
            <h3>ლეპტოპის მახასიათებლები</h3>
            <span id='position-span'>2/2</span>
        `;

        tabs[0].style.display = 'none';
        tabs[1].style.display = 'flex';

        prevBtn.style.visibility = 'visible';
        nextBtn.textContent = 'დამახსოვრება'
    }
}


// validation

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateFirstTab()) {
        currentTab = 1;
        changeTabs();
    }
})

function validateFirstTab() {
    if(validateNames('name')) {

        if(validateNames('lastName')) {
            if(validateSelects(selectTeam)) {
                if(validateSelects(selectPosition)) {
                    if(validateEmail()) {
                        if(validateNumber()) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function validateNames(id) {
    const input = document.getElementById(id);
    const label = document.querySelector(`label[for="${id}"]`);
    const span = document.querySelector(`#${id} + .info-span`);

    const regex = /^[\u10A0-\u10FF]{2,}$/;

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        span.classList.add('error');

        return false;
    } else {
        return true;
    }
}

function validateSelects(select) {
    if (select.value === '') {
        select.classList.add('error');

        return false;
    } else {
        return true;
    }
}

function validateEmail() {
    const email = document.querySelector('#email');
    const emailLabel = document.querySelector('label[for="email"]');
    const emailInfo = document.querySelector('#email + .info-span');
    
    const emailRegex = /^[^@]+@redberry.ge$/;

    if (!emailRegex.test(email.value)) {
        email.classList.add('error');
        emailLabel.classList.add('error');
        emailInfo.classList.add('error');

        return false;
    } else {
        return true;
    }   
}

function validateNumber() {
    const number = document.querySelector('#number');
    const numberLabel = document.querySelector('label[for="number"]');
    const numberInfo = document.querySelector('#number + .info-span');

    // const numberRegex = /^(+?995)?\s*\d{9}$/;
    const numberRegex = /^\d{9}$/;
    if (!numberRegex.test(number.value)) {
        number.classList.add('error');
        numberLabel.classList.add('error');
        numberInfo.classList.add('error');

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