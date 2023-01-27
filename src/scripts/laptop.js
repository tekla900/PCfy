const token = 'ca421d1579a320984bc855b2200566e7';

let url = window.location.href;

console.log(url);
let id = url.substring(url.lastIndexOf('?') + 1);
const img = document.getElementById('laptop-img');
const backBtn = document.querySelector('.back-button');