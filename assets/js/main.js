'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// search form
const searchForm = $('.search-form');
if (searchForm) {
    const searchButton = $('.search-form .search-btn');
    const searchInput = $('.search-form input');

    searchForm.onsubmit = function(event) {
        event.preventDefault();
    }

    const sentData = () => {
        if (input.value !== '') {
            searchForm.submit();
            input.value = '';
        }
    }

    searchInput.onkeydown = (e) => {
        if (e.keyCode === 13) {
            sentData();
        }
    }

    searchButton.onclick = sentData;
}

// register and login form
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
    const emailElement = $('.register-form input[name="email"]');
    const passwordElement = $('.register-form input[name="psw"]');
    const confirmPasswordElement = $('.register-form input[name="psw2"]');

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

const itemList= {
    "sp001":{
        "name":"Sữa Chua Vị Kiwi",
        "price":21000,
        "photo":"../images/sanpham/kiwi.jpg"
    },
    "sp002":{
        "name":"Sữa Chua Vị Xoài",
        "price":22000,
        "photo":"../images/sanpham/mango.jpg"
    },
    "sp003":{
        "name":"Sữa Chua Vị Dưa lưới",
        "price":23000,
        "photo":"../images/sanpham/cantaloupe.jpg"
    },
    "sp004":{
        "name":"Sữa Chua Vị Mâm Xôi",
        "price":24000,
        "photo":"../images/sanpham/blackberry.jpg"
    },
    "sp005":{
        "name":"Sữa Chua Vị Dâu Tây",
        "price":25000,
        "photo":"../images/sanpham/strawberry.jpg"
    },
    "sp006":{
        "name":"Sữa Chua Vị Việt Quất",
        "price":26000,
        "photo":"../images/sanpham/blueberry.jpg"
    },
    "sp007":{
        "name":"Sữa Chua Vị Bưởi",
        "price":27000,
        "photo":"../images/sanpham/grapes.jpg"
    },
    "sp008":{
        "name":"Sữa Chua Vị Táo Xanh",
        "price":28000,
        "photo":"../images/sanpham/green-apple.jpg"
    },
    "sp009":{
        "name":"Sữa Chua Vị Dứa",
        "price":29000,
        "photo":"../images/sanpham/pineapple.jpg"
    }
}

const addCart = function(code) {
    const btn = $(`.${code}-btn`);
    const inputElement = btn.closest('span').querySelector('input');
    const number = parseInt(inputElement.value);
    if (typeof localStorage[code] === 'undefined') {
        if (number) {
            windown.localStorage.setItem(code, number);
        }
    }
}