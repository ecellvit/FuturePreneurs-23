import React from "react";
import { ReactDOM } from "react";

export default function Modal(props,{popUpForDelete}){
    return(
        <div className="fixed inset-0 z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div
              onClick={props.popup}
              className="fixed inset-0 bg-black opacity-50 cursor-pointer"
            ></div>

            <div className="flex flex-col items-center bg-white p-6 rounded w-2/5 h-5/6 z-20">
            <h2 className="text-4xl font-extrabold dark:text-white">Are you sure !!</h2>
            <p className="my-4 text-lg text-gray-500">You want to {props.popUpForDelete?'Delete your Team':'Remove this member from team'}</p>
              {/* <p className="text-xl m-4">Are you Sure {props.popUpForDelete?'Hii':'Bye'}.</p> */}
              <div className="flex justify-evenly w-full">
              <button
                onClick={()=>{
                  props.popup();
                  props.callFunction();
                  // props.popUpForDelete?props.setStateDelete():props.setStateRemove()
                }}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                YES
              </button>
              <button
                onClick={()=>{
                //   togglePopUpForDelete();
                props.popup();
                }}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                NO
              </button></div>
            </div>
          </div>
          </div>
    )
}