'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// search form
const searchForm = $('.search-form');
if (searchForm) {
    const searchButton = $('.search-form .search-btn');
    const searchInput = $('.search-form input');

    searchForm.onsubmit = (e) => {
        e.preventDefault();
    }

    const sentData = () => {
        if (searchInput.value !== '') {
            searchForm.submit();
            searchInput.value = '';
        }
    }

    searchInput.onkeydown = (e) => {
        if (e.keyCode === 13) {
            sentData();
        }
    }

    searchButton.onclick = sentData;
}

// register, login and contact form
const isEmail = (input, errorMessage) => {
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailReg.test(input.value)) {
        alert(errorMessage || 'Email không hợp lệ');
        return false;
    }
    return true;
}

const requireMinLength = (input, require, errorMessage) => { // input.value.length >= require
    if (input.value.length < require) {
        alert(errorMessage || `Vui lòng nhập ít nhất ${require} kí tự`);
        return false;
    }
    return true;
}

const registerForm = $('.register-form');
if (registerForm) {
    const emailElement = registerForm.querySelector('input[name="email"]');
    const passwordElement = registerForm.querySelector('input[name="psw"]');
    const confirmPasswordElement = registerForm.querySelector('input[name="psw1"]');

    registerForm.onsubmit = function(e) {
        e.preventDefault();
        if (
            isEmail(emailElement) && 
            requireMinLength(passwordElement, 8, 'Mặt khẩu phải chứa ít nhất 8 kí tự') && 
            requireMinLength(confirmPasswordElement, 8, 'Mặt khẩu phải chứa ít nhất 8 kí tự')
        ) {
            this.submit();
        }
    }
}

const loginForm = $('.login-form');
if (loginForm) {
    const emailElement = loginForm.querySelector('input[name="email"]');
    const passwordElement = loginForm.querySelector('input[name="psw"]');

    loginForm.onsubmit = function(e) {
        e.preventDefault();
        if (
            isEmail(emailElement) && 
            requireMinLength(passwordElement, 8, 'Mặt khẩu phải chứa ít nhất 8 kí tự')
        ) {
            this.submit();
        }
    }
}

const contactForm = $('.contact-form');
if (contactForm) {
    const nameElement = $('.contact-form input[name="name"');
    const emailElement = $('.contact-form input[name="email"');
    const contentElement = $('.contact-form textarea[name="content"');
    
    contactForm.onsubmit = function(e) {
        e.preventDefault();
        if (
            requireMinLength(nameElement, 4, 'Tên phải chứa ít nhất 4 kí tự') && 
            isEmail(emailElement) && 
            requireMinLength(contentElement, 10, 'Nội dung phải chứa ít nhất 10 kí tự')
        ) {
            this.submit();
        }
    }
}

const itemList = {
    "sp001":{
        "name":"Sữa Chua Vị Kiwi",
        "price":21000,
        "photo":"./assets/img/sanpham/kiwi.jpg"
    },
    "sp002":{
        "name":"Sữa Chua Vị Xoài",
        "price":22000,
        "photo":"./assets/img/sanpham/mango.jpg"
    },
    "sp003":{
        "name":"Sữa Chua Vị Dưa lưới",
        "price":23000,
        "photo":"./assets/img/sanpham/cantaloupe.jpg"
    },
    "sp004":{
        "name":"Sữa Chua Vị Mâm Xôi",
        "price":24000,
        "photo":"./assets/img/sanpham/blackberry.jpg"
    },
    "sp005":{
        "name":"Sữa Chua Vị Dâu Tây",
        "price":25000,
        "photo":"./assets/img/sanpham/strawberry.jpg"
    },
    "sp006":{
        "name":"Sữa Chua Vị Việt Quất",
        "price":26000,
        "photo":"./assets/img/sanpham/blueberry.jpg"
    },
    "sp007":{
        "name":"Sữa Chua Vị Bưởi",
        "price":27000,
        "photo":"./assets/img/sanpham/grapes.jpg"
    },
    "sp008":{
        "name":"Sữa Chua Vị Táo Xanh",
        "price":28000,
        "photo":"./assets/img/sanpham/green-apple.jpg"
    },
    "sp009":{
        "name":"Sữa Chua Vị Dứa",
        "price":29000,
        "photo":"./assets/img/sanpham/pineapple.jpg"
    }
}

const addCart = function(code) {
    const btn = $(`.${code}-btn`);
    const inputElement = btn.closest('span').querySelector('input');
    const number = Math.min(parseInt(inputElement.value), 100);
    if (!number) return;
    if (typeof localStorage[code] === 'undefined') {
        localStorage.setItem(code, number);
    }
    else {
        const total = number + Number(localStorage.getItem(code));
        localStorage.setItem(code, Math.min(100, total));
    }
}

// cart icon
const cartIcon = $('.nav-cart-icon');

cartIcon.onclick = () => {
    window.location.href = 'donhang.html';
}

// order page
const toVnCurrencyFormat = function(num) {
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';    
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    const result = new Intl.NumberFormat('vi-VN', config).format(num);
    return result;
}

const removeCart = function(code) {
    if (typeof localStorage[code] !== 'undefined') {
        localStorage.removeItem(code);
        showCart();
    }
}

const isBetween = function(num, min, max) {
    return (num >= min && num <= max);
}

const getDisCountRate = function() {
    const d = new Date();
    const weekday = d.getDay();
    const totalMinutes = d.getHours() * 60 + d.getMinutes();

    // discountRate = 0.1 if the day is from Monday to Wednesday and
    // from 7am to 11am or 13pm to 17pm, otherwise discountRate = 0.
    if (
        weekday >= 1 &&
        weekday <= 3 &&
        (isBetween(totalMinutes, 420, 660) || isBetween(totalMinutes, 780, 1020))
    ) {
        return 0.1;
    }
    return 0;
}

const showCart = function() {
    const tbody = $('.order-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalPreTax = 0;
    for (const key in localStorage) {
        if (!itemList.hasOwnProperty(key)) {
            continue;
        }
        const item = itemList[key];
        const { name, price, photo } = item;
        const orderNumber = localStorage.getItem(key);

        totalPreTax += price * orderNumber;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${photo}" alt="" width="100px"></td>
            <td>${name}</td>
            <td>${orderNumber}</td>
            <td>${toVnCurrencyFormat(price)}</td>
            <td>${toVnCurrencyFormat(price * orderNumber)}</td>
            <td>
                <span
                    class="clear-icon"
                    data-code=${key}
                    onclick="removeCart(this.dataset.code)">
                    <i class="fa-regular fa-trash-can"></i>
                </span>
            </td>
        `;
        tbody.appendChild(row);
    }

    const totalCostLabel = $('.order-table .total-cost');
    const discountLabel = $('.order-table .discount');
    const taxLabel = $('.order-table .tax');
    const totalOrderCostLabel = $('.order-table .total-order-cost');

    const totalCost = totalPreTax;
    const discount = getDisCountRate() * totalCost;
    const tax = 0.1 * (totalCost - discount);
    const totalOrderCost = totalCost - discount + tax;

    totalCostLabel.innerHTML = toVnCurrencyFormat(totalCost);
    discountLabel.innerHTML = toVnCurrencyFormat(discount);
    taxLabel.innerHTML = toVnCurrencyFormat(tax);
    totalOrderCostLabel.innerHTML = toVnCurrencyFormat(totalOrderCost);
}

window.onload = () => {
    showCart();
}

window.onstorage = () => {
    showCart();
}