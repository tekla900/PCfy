const token = 'ca421d1579a320984bc855b2200566e7';

// GETTING ID
const url = window.location.href;
const id = url.substring(url.lastIndexOf('?') + 1);

const main = document.getElementById('laptop');

fetch(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${token}`)
    .then(res => res.json())
    .then(async res => {
        let teamName = await getInfo(res.data.user.team_id, 'teams');
        let positionName = await getInfo(res.data.user.position_id, 'positions');
        let brandsName = await getInfo(res.data.laptop.brand_id, 'brands');
        let laptopState = res.data.laptop.state == 'new' ? 'ახალი' : 'მეორადი';
        let inputDate = res.data.laptop.purchase_date;
        let convertedDate = convertDateFormat(inputDate);
        
        main.innerHTML = `
        <div class='row first'>
            <img class="main-img" src="https://pcfy.redberryinternship.ge/${res.data.laptop.image}" alt="image of laptop">

            <div class="user info">
                <div class="keys">
                    <p class="small bold">სახელი:</p>
                    <p class="small bold">თიმი:</p>
                    <p class="small bold">პოზიცია:</p>
                    <p class="small bold">მეილი:</p>
                    <p class="small bold">ტელ. ნომერი:</p>
                </div>
        
                <div class="values">
                    <p class="small">${res.data.user.name + " " + res.data.user.surname}</p>
                    <p class="small">${teamName}</p>
                    <p class="small">${positionName}</p>
                    <p class="small">${res.data.user.email}</p>
                    <p class="small">${res.data.user.phone_number}</p>
                </div>
            </div>
        </div>

        <hr>

        <div class="lap info">
        <div>
            <div class="keys">
                <p class="small bold">ლეპტოპის სახელი:</p>
                <p class="small bold">ლეპტოპის ბრენდი:</p>
                <p class="small bold">RAM:</p>
                <p class="small bold">მეხსიერების ტიპი:</p>
            </div>

            <div class="values">
                <p class="small">${res.data.laptop.name}</p>
                <p class="small">${brandsName}</p>
                <p class="small">${res.data.laptop.ram}</p>
                <p class="small">${res.data.laptop.hard_drive_type}</p>
            </div>
            </div>
            <div>
            <div class="keys">
                <p class="small bold">CPU:</p>
                <p class="small bold">CPU-ს ბირთვი:</p>
                <p class="small bold">CPU-ს ნაკადი:</p>
            </div>

            <div class="values">
                <p class="small">${res.data.laptop.cpu.name}</p>
                <p class="small">${res.data.laptop.cpu.cores}</p>
                <p class="small">${res.data.laptop.cpu.threads}</p>
            </div>
            </div>
        </div>

        <hr>

        <div class="lap info sec">
            <div class="keys">
                <p class="small bold">მდგომარეობა:</p>
                <p class="small bold">ლეპტოპის ფასი:</p>               
            </div>

            <div class="values">
                <p class="small">${laptopState}</p>
                <p class="small">${res.data.laptop.price}</p>
            </div>

            <div class="keys">
                <p class="small bold">შეძენის რიცხვი:</p>
            </div>

            <div class="values">
                <p class="small">${convertedDate}</p>
            </div>
        </div>
        `    
    })

async function getInfo(id, info) {
    let url = `https://pcfy.redberryinternship.ge/api/${info}`;
    let res = await fetch(url);
    let json = await res.json();
    let filtered = json.data.filter(each => each.id == id);
    return filtered[0]['name'];
}

function convertDateFormat(dateStr) {
    const dateParts = dateStr.split("-");
    return `${dateParts[0]} / ${dateParts[1]} / ${dateParts[2]}`;
}  


// NAVIGATION

function goToList() {
    location.href = 'laptops.html';
}

