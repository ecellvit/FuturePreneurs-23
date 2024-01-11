'use client';

import Navbar from '@/Components/Navbar';
import bg from '@/public/assets/bg/spceBg.svg';
import FP_Logo from '@/public/assets/logos/FP LOGO 5.svg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//Imports for toast.
import toast, { Toaster } from 'react-hot-toast';

export default function UserDetails() {
  const [first, setFirstName] = useState('');
  const [last, setLastName] = useState('');
  const [userRegNo, setUserRegNo] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [regError, setRegError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const allowedDomain = 'vitstudent.ac.in';
  const [isLoading, setIsLoading] = useState();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        //Checks if session is not ready and redirects to root.
        
        router.push('/');
      } else if (status === 'authenticated') {
        
        // toast.success("Logged In");
        getData();
        localStorage.setItem('asdf', 'asdf');
      }
    }
  }, [status, router]);

  const getData = () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        const user = data.user;
        if (user.hasFilledDetails == true) {
          if (user.teamId !== null) {
            const redirect =
              user.teamRole == '1'
                ? '/memberDashboard'
                : '/leaderDashboard';
            router.push(redirect);
            setIsLoading(true);
          } else {
            router.push('/makeTeam');
            setIsLoading(true);
          }
        }
        
        setIsLoading(true);
      });
  };

  const [toastID, settoastID] = useState(null);

  useEffect(() => {
    if (userEmail !== '' && userPhoneNumber !== '') {
      validatePhoneNumber();
      validateEmail();
    }
  }, [userPhoneNumber, userEmail]);

  const handleFirstnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ''); // Allow only alphabets
    setFirstName(inputValue);
  };

  const handleLastnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ''); // Allow only alphabets
    setLastName(inputValue);
  };

  function validateEmail() {
    // A basic email regex (not foolproof, but covers most cases)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is from the allowed domain
    const emailCheck =
      emailRegex.test(userEmail) &&
      userEmail.endsWith(`@${allowedDomain}`);
    setIsValidEmail(emailCheck);
    if (!emailCheck) {
      setEmailError(
        'Invalid email address or not from the allowed domain'
      );
    } else {
      setEmailError('');
    }
  }

  const handlePhoneNumber = (e) => {
    const input = e.target.value;

    // Check if the input matches the desired phone number pattern
    const isValidInput = /^(\+91-?)?[0-9]{10}$/.test(input);

    if (isValidInput || input === '') {
      setUserPhoneNumber(input);
      setPhoneError(''); // Reset error state
    } else {
      setPhoneError('Invalid Phone Number'); // Set error state
    }
  };
  const handleInputChange = (e) => {
    const input = e.target.value;
    

    // Check if the input matches the desired pattern
    const isValidInput = /^[1-9][0-9][a-zA-Z]{3}[0-9]{4}$/.test(
      input
    );

    if (isValidInput) {
      setUserRegNo(input);
      
      setRegError('');
    } else {
      // Display an error or provide feedback for invalid input
      setRegError('Invalid registration number format');
    }
  };

  function submitDetails() {
    
    if (first !== '' && last !== '') {
      if (phoneError === '' && userPhoneNumber !== '') {
        if (regError === '' && userRegNo !== '') {
          if (phoneError !== '') {
            // <Alert name="Please fill the form correctly" />;
            
          } else {
            if (userPhoneNumber.length === 10 && isNaN(+userPhoneNumber) === false) {

            const detail = [first, userRegNo, userPhoneNumber, last];

            // <Alert name="submitted " />;
            
            fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/fillUserDetails`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + session.accessTokenBackend,
              },
              body: JSON.stringify({
                firstName: first,
                lastName: last,
                regNo: userRegNo,
                mobno: userPhoneNumber,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                

                if (data.status === "success") {
                  router.push("/makeTeam");
                  
                  toast.success("Resigtered successfully.");
                } else {

                }
              })
              .catch(err=>{
                toast.error("Something went wrong");

              });
            // pratyush.kongalla2021@vitstudent.ac.in
            } else {
              toast.error('Phone number digits are not 10');
            }
          }
        } else {
          
          toast.error('Fill Registration number Correctly');
        }
      } else {
        
        
        toast.error('Fill Phone Number Correctly');
      }
    } else {
      
      
      toast.error('Fill Name Correctly');

      // <Alert name="Please fill all the details first" />;
    }
  }
  return (
    <main className="min-w-[100vw] min-h-[100vh] flex justify-center items-center">
      {/* {isLoading && <LoadingScreen/>} */}
      <Navbar />
      <Image
        src={bg}
        alt="bg-Image"
        fill
        className="object-cover z-[-10]"
      />
      <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[90vh] justify-evenly items-center">
        <div
          className="hidden md:w-100 h-5/6 md:flex flex-col justify-center px-4 pb-5 pt-3 rounded-3xl"
          style={{ backgroundColor: '#141B2B' }}>
          <Image
            src={FP_Logo}
            alt="fp-Logo"
            className="h-2/3 w-2/3 self-center"
          />
          <div className="text-white text-6xl font-bold flex flex-col items-center">
            FuturePreneurs
            <h1 className="text-7xl font-bold">9.0</h1>
          </div>
        </div>

        <div
          className="w-4/5 md:w-1/2 h-5/6 flex flex-col justify-evenly md:justify-around items-start rounded-3xl px-4"
          style={{ backgroundColor: '#141B2B' }}>
          <div className="flex justify-start items-center">
            <h1 className="text-3xl text-white font-bold">
              Enter Your Information
            </h1>
          </div>

          <form
            id="registrationForm"
            className="shadow-md rounded w-full">
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold font-poppins"
                htmlFor="name">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="First Name"
                value={first}
                onChange={handleFirstnameChange}></input>
              <p
                id="nameError"
                className="text-red-500 text-xs italic hidden">
                Name already exists.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold  font-poppins"
                htmlFor="name">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Last Name"
                value={last}
                onChange={handleLastnameChange}></input>
              <p
                id="nameError"
                className="text-red-500 text-xs italic hidden">
                Name already exists.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold "
                htmlFor="reg_no">
                Registration Number
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reg_no"
                type="text"
                placeholder="Registration Number"
                value={userRegNo}
                onChange={(e) => {
                  handleInputChange(e);
                  setUserRegNo(e.target.value);
                }}></input>
              {/* {regError && <div className="text-red-600">{regError}</div>} */}
              <p
                id="regNoError"
                className="text-red-500 text-xs italic hidden">
                Registration Number already exists.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold "
                htmlFor="phone">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={userPhoneNumber}
                onChange={(e) => {
                  handlePhoneNumber;
                  setUserPhoneNumber(e.target.value);
                }}></input>
              {phoneError && (
                <div className="text-red-600">{phoneError}</div>
              )}
              <p
                id="phoneError"
                className="text-red-500 text-xs italic hidden">
                Phone Number already exists.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  submitDetails();
                }}
                className="text-white bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-800 dark:focus:ring-cyan-300 font-medium rounded-3xl text-lg px-5 py-2 text-center me-2 mb-2">
                Register
              </button>
              <Toaster />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
