/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const token = 'ca421d1579a320984bc855b2200566e7';
const wrap = document.getElementById('laptops');


// FETCHING DATA
fetch(`https://pcfy.redberryinternship.ge/api/laptops?token=${token}`)
    .then(res => res.json())
    .then(res => {
        let html = '';
        res.data.forEach(el => {
            html += `
            <div class="laptop">
                <div>
                    <img class="laptop-img" src="https://pcfy.redberryinternship.ge/${el.laptop.image}" alt="image of laptop">
                </div>
                <div>
                    <p class="small">${el.user.name + ' ' + el.user.surname}</p>
                    <p class="medium">${el.laptop.name}</p>
                    <a href="./laptop.html?${el.laptop.id}" class="small">მეტის ნახვა</a>
                </div>
            </div>
            `;
        });
        wrap.innerHTML = html;
    })
    .catch(error => console.log(error));

// NAVIGATION

function goToSurvey() {
    location.href = 'survey.html';
}