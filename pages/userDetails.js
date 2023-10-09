import React,{ useState } from "react";

export default function userDetails(){
    const [userName,setUserName] = useState('');
    const [userRegNo,setUserRegNo] = useState('');
    const [userPhoneNumber,setUserPhoneNumber] = useState('');
    const [userEmail,setUserEmail] = useState('');
    
    function submitDetails() {
        const detail = [userName,userRegNo,userPhoneNumber,userEmail];
        console.log(detail);
        //   fetch('http://localhost:3000/userDetails/fillUserDetails', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     detail
    //   })
    // }).then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
    }
    return(
        <div class="container mx-auto p-4 mt-4">
        <h1 class="text-2xl font-semibold mb-4">Your Personal Details Form</h1>

        <form id="registrationForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="User Name" value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
                <p id="nameError" class="text-red-500 text-xs italic hidden">Name already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="reg_no">Registration Number</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reg_no" type="text" placeholder="Registration Number" value={userRegNo} onChange={(e)=>setUserRegNo(e.target.value)}></input>
                <p id="regNoError" class="text-red-500 text-xs italic hidden">Registration Number already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone Number</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone Number" value={userPhoneNumber} onChange={(e)=>setUserPhoneNumber(e.target.value)}></input>
                <p id="phoneError" class="text-red-500 text-xs italic hidden">Phone Number already exists.</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email ID" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}></input>
                <p id="emailError" class="text-red-500 text-xs italic hidden">Email already exists.</p>
            </div>
            <div class="flex items-center justify-between" onClick={submitDetails}>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >SUBMIT</button>
            </div>
        </form>
    </div>
    )
} 