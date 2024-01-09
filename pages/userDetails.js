"use client";

import Navbar from "@/Components/Navbar";
import bg from "@/public/assets/bg/spceBg.svg";
import FP_Logo from "@/public/assets/logos/FP LOGO 5.svg";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function UserDetails() {
  const [userName, setUserName] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const allowedDomain = "vitstudent.ac.in";

  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session)
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (status === "unauthenticated") {
  //       //Checks if session is not ready and redirects to root.
  //       console.log("Please Login First!");
  //       router.push("/");
  //     } else if (status === "authenticated") {
  //       console.log(`Getting data`, status);
  //       // getData();
  //     }
  //   }
  // }, [status, router]);

  
  useEffect(() => {
    if (userEmail !== "" && userPhoneNumber !== "") {
      validatePhoneNumber();
      validateEmail();
    }
  }, [userPhoneNumber, userEmail]);

  function validateEmail() {
    // A basic email regex (not foolproof, but covers most cases)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is from the allowed domain
    const emailCheck =
      emailRegex.test(userEmail) && userEmail.endsWith(`@${allowedDomain}`);
    setIsValidEmail(emailCheck);
    if (!emailCheck) {
      setEmailError("Invalid email address or not from the allowed domain");
    } else {
      setEmailError("");
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
      if (phoneError !== "" || emailError !== "") {
        // <Alert name="Please fill the form correctly" />;
        console.log("Please fill the form correctly")
      } else {
        const detail = [userName, userRegNo, userPhoneNumber, userEmail];

        // <Alert name="submitted " />;
        console.log(detail);
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/fillUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            detail,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        setUserEmail("");
        setUserName("");
        setUserPhoneNumber("");
        setUserRegNo("");
      }
    } else {
      console("Please fill all the details first")
      // <Alert name="Please fill all the details first" />;
    }
  }
  return (
    <main className="w-[100vw] h-[100vh] flex justify-evenly">
    <Image src={bg} alt="bg-Image" fill className="object-cover z-[-10]"/>
    <Navbar/>
    <div className="flex flex-row w-full justify-evenly items-center mt-6">
    <div className="w-100 h-5/6 flex flex-col justify-center px-4 pb-5 pt-3 rounded-3xl"
    style={{ backgroundColor: '#141B2B' }}
    >
  <Image src={FP_Logo} alt="fp-Logo" className="h-2/3 w-2/3 self-center"/>
  <div className="text-white text-6xl font-bold flex flex-col items-center">
  FuturePreneurs<br/>
  <h1 className="text-7xl font-bold">9.0</h1>
</div>

</div>

    <div className="w-1/2 h-5/6 flex flex-col justify-between px-4 pb-5 pt-3 rounded-3xl"
    style={{ backgroundColor: '#141B2B' }}
    >
      <div className="flex justify-start items-center pt-9">
  <h1 className="text-4xl text-white font-bold mb-8">
    Enter Your Information
  </h1>
</div>




      <form
        id="registrationForm"
        className="bg-inherit shadow-md rounded px-8 pt-0 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-2 font-poppins"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-white text-lg font-bold mb-2"
            htmlFor="reg_no"
          >
            Registration Number
          </label>
          <input
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label
            className="block text-white text-lg font-bold mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label
            className="block text-white text-lg font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email ID"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          {emailError && <div className="text-red-600">{emailError}</div>}
          <p id="emailError" className="text-red-500 text-xs italic hidden">
            Email already exists.
          </p>
        </div>
        <div
          className="flex items-center justify-between"
          onClick={()=>submitDetails()}
        >
         
          <button type="button" className="text-white bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-800 dark:focus:ring-cyan-300 font-medium rounded-3xl text-lg px-5 py-2.5 text-center me-2 mb-2">
          Register
          </button>
        </div>
      </form>
    </div>
    </div>
      
    </main>
  );
}
