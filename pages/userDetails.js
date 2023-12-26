"use client";

import React, { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Alert from "@/components/Alert/Alert";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


export default function UserDetails() {
  const [userName, setUserName] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const allowedDomain = "vitstudent.ac.in";
  
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log('status', status)
      if (status === "unauthenticated") {
        console.log("Please Login First!")
        // router.push("/")
      } else if(status === "authenticated"){
        console.log('asdfasdfasdf')
        // getData()
      }
    }
  }, [status, router])
  console.log('clisession', session);

  useEffect(() => {
    if(userEmail!=='' && userPhoneNumber!=='')
    {validatePhoneNumber();
    validateEmail();}
  }, [userPhoneNumber,userEmail]);

  function validateEmail() {
    // A basic email regex (not foolproof, but covers most cases)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is from the allowed domain
    const  emailCheck = emailRegex.test(userEmail) && userEmail.endsWith(`@${allowedDomain}`);
    setIsValidEmail(emailCheck)
    if(!emailCheck)
    {setEmailError("Invalid email address or not from the allowed domain");}
    else{
      setEmailError('');
    }
  }

  function validatePhoneNumber() {
    const parsedPhoneNumber = parsePhoneNumberFromString(userPhoneNumber, "IN");

    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  }

  function submitDetails() {
    if (
      userName !== "" &&
      userEmail !== "" &&
      userPhoneNumber !== "" &&
      userRegNo !== ""
    ) {
      if (phoneError !== "" || emailError !=='') {
        <Alert name="Please fill the form correctly" />
      } else {
        const detail = [userName, userRegNo, userPhoneNumber, userEmail];
        
        <Alert name="submitted " />
        console.log(detail);
        //   fetch(process.env.NEXT_PUBLIC_SERVER +'/userDetails/fillUserDetails', {
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
        setUserEmail('')
        setUserName('')
        setUserPhoneNumber('')
        setUserRegNo('')
      }
    } else {
      <Alert name="Please fill all the details first" />
    }
  }
  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-semibold mb-4">Your Personal Details Form</h1>

      <form
        id="registrationForm"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <p id="nameError" className="text-red-500 text-xs italic hidden">
            Name already exists.
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="reg_no"
          >
            Registration Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reg_no"
            type="text"
            placeholder="Registration Number"
            value={userRegNo}
            onChange={(e) => setUserRegNo(e.target.value)}
          ></input>
          <p id="regNoError" className="text-red-500 text-xs italic hidden">
            Registration Number already exists.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="number"
            placeholder="Phone Number"
            value={userPhoneNumber}
            onChange={(e) => {
              setUserPhoneNumber(e.target.value);
            }}
          ></input>
          {phoneError && <div className="text-red-600">{phoneError}</div>}
          <p id="phoneError" className="text-red-500 text-xs italic hidden">
            Phone Number already exists.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email ID"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          {emailError && (
            <div className="text-red-600">
              {emailError}
            </div>
          )}
          <p id="emailError" className="text-red-500 text-xs italic hidden">
            Email already exists.
          </p>
        </div>
        <div className="flex items-center justify-between" onClick={submitDetails}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
