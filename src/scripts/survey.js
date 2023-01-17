const selectTeam = document.getElementById('team');
const selectPosition = document.getElementById('position');
const form = document.querySelector("form");

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



// validation

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry\.ge$/;
//     if (!emailRegex.test(email)) {
//         alert("Please enter a valid gmail address");
//     } else {
//         //submit form
//     }
// });

// function error(element) {

// }