import { useState } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const Game = () => {
  const defaultContent = "asdfaf";

  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([
    {
      id: 0,
      isSelected: false,
      title: "This is heading",
      description: "This is description",
    },
    {
      id: 1,
      isSelected: false,
      title: "This is heading",
      description: "This is description",
    },
    {
      id: 2,
      isSelected: false,
      title: "This is heading",
      description: "This is description",
    },
  ]);
  const handleClick = (id, alreadySelected) => {
    let totalSelected = 0;
    data.map((item) => {
      if (item.isSelected) {
        totalSelected++;
      }
    });
    setSelected(totalSelected);
    if(totalSelected === 2 && !alreadySelected){
      toast.error("You can only select 2 options");
      return;
    }
    setData(
      data.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };
  const accordianItems = data.map((item) => (
    <AccordionItem
      className="border border-black"
      key={item.key}
      checked={item.isSelected}
      title={
        <div class="flex items-center mb-4">
          <input
            checked={item.isSelected}
            onClick={() => {
              handleClick(item.id, item.isSelected);
            }}
            id={item.id}
            type="radio"
            name={item.id}
            class="w-4 h-4 focus:ring-blue-500 focus:ring-2"
          ></input>
          <label
            for={item.id}
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {item.title}
          </label>
        </div>
      }
    >
      {item.description}
    </AccordionItem>
  ));
  return (
    <main className="min-h-screen bg-red-500">
      <Navbar level="level3" />
      <Accordion variant="splitted">{accordianItems}</Accordion>
      <Toaster />
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
    </main>
  );
};

export default Game;
