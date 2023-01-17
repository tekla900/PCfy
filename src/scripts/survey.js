const selectTeam = document.getElementById('team');
const selectPosition = document.getElementById('position');
const form = document.querySelector('form');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const header = document.querySelector('.position-div');
const tabs = document.querySelectorAll('tab');

const selectBrand = document.getElementById('brands');
const selectCPU = document.getElementById('cpus');

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
    currentTab = 0; 

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
    validate();
})

function validate() {
    validateNames('name');
    validateNames('lastName');
    validateSelects(selectTeam);
    validateSelects(selectPosition);
    validateEmail();
    validateNumber();
}

function validateNames(name) {
    const input = document.getElementById(name);
    const label = document.querySelector(`label[for="${name}"]`);
    const span = document.querySelector(`#${name} + .info-span`);

    const regex = /^[\u10A0-\u10FF]{2,}$/;

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        span.classList.add('error');
    }    
}

function validateSelects(select) {
    if (select.value === '') {
        select.classList.add('error');
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
    }
}

function validateNumber() {
    const number = document.querySelector('#number');
    const numberLabel = document.querySelector('label[for="number"]');
    const numberInfo = document.querySelector('#number + .info-span');

    const numberRegex = /^(\+?995)?\d{9}$/;

    if (!numberRegex.test(number.value)) {
        number.classList.add('error');
        numberLabel.classList.add('error');
        numberInfo.classList.add('error');
    }
}