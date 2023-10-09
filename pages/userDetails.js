"use client"
export default function userDetails()
{
    const registeredData = {
        names: new Set(),
        regNos: new Set(),
        phones: new Set(),
        emails: new Set(),
    };


    function validateRegistration() {
        console.log("error",document);
        // const nameInput = document.getElementById('name');
        // const regNoInput = document.getElementById('reg_no');
        // const phoneInput = document.getElementById('phone');
        // const emailInput = document.getElementById('email');

        // const nameError = document.getElementById('nameError');
        // const regNoError = document.getElementById('regNoError');
        // const phoneError = document.getElementById('phoneError');
        // const emailError = document.getElementById('emailError');

        // const name = nameInput.value.trim();
        // const regNo = regNoInput.value.trim();
        // const phone = phoneInput.value.trim();
        // const email = emailInput.value.trim();

        // // Validate name
        // if (name === '') {
        //     nameError.textContent = 'Name cannot be empty.';
        //     nameError.classList.remove('hidden');
        // } else if (registeredData.names.has(name)) {
        //     nameError.textContent = 'Name already exists.';
        //     nameError.classList.remove('hidden');
        // } else {
        //     nameError.classList.add('hidden');
        //     registeredData.names.add(name);
        // }

        // // Validate registration number
        // if (regNo === '') {
        //     regNoError.textContent = 'Registration Number cannot be empty.';
        //     regNoError.classList.remove('hidden');
        // } else if (registeredData.regNos.has(regNo)) {
        //     regNoError.textContent = 'Registration Number already exists.';
        //     regNoError.classList.remove('hidden');
        // } else {
        //     regNoError.classList.add('hidden');
        //     registeredData.regNos.add(regNo);
        // }

        // // Validate phone number
        // if (phone === '') {
        //     phoneError.textContent = 'Phone Number cannot be empty.';
        //     phoneError.classList.remove('hidden');
        // } else if (registeredData.phones.has(phone)) {
        //     phoneError.textContent = 'Phone Number already exists.';
        //     phoneError.classList.remove('hidden');
        // } else {
        //     phoneError.classList.add('hidden');
        //     registeredData.phones.add(phone);
        // }

        // // Validate email
        // if (email === '') {
        //     emailError.textContent = 'Email cannot be empty.';
        //     emailError.classList.remove('hidden');
        // } else if (registeredData.emails.has(email)) {
        //     emailError.textContent = 'Email already exists.';
        //     emailError.classList.remove('hidden');
        // } else {
        //     emailError.classList.add('hidden');
        //     registeredData.emails.add(email);
        // }

        // // Check if all fields are valid before proceeding with registration
        // if (!nameError.classList.contains('hidden') ||
        //     !regNoError.classList.contains('hidden') ||
        //     !phoneError.classList.contains('hidden') ||
        //     !emailError.classList.contains('hidden')) {
        //     return;
        // }

        // // Registration successful
        // alert('Registration successful!\nName: ' + name + '\nRegistration Number: ' + regNo + '\nPhone Number: ' + phone + '\nEmail: ' + email);
    }
    return(
        <div class="container mx-auto p-4 mt-4">
        <h1 class="text-2xl font-semibold mb-4">Your Personal Details Form</h1>

        <form id="registrationForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="User Name"></input>
                <p id="nameError" class="text-red-500 text-xs italic hidden">Name already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="reg_no">Registration Number</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reg_no" type="text" placeholder="Registration Number"></input>
                <p id="regNoError" class="text-red-500 text-xs italic hidden">Registration Number already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone Number</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone Number"></input>
                <p id="phoneError" class="text-red-500 text-xs italic hidden">Phone Number already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email ID"></input>
                <p id="emailError" class="text-red-500 text-xs italic hidden">Email already exists.</p>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onclick={validateRegistration()}>SUBMIT</button>
            </div>
        </form>
    </div>
    )
} 