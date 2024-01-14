import Navbar from "../Navbar";
import InputBoxList from "./InputBoxList";

export default function Game() {
  return (
    <main className="min-h-screen">
      <Navbar level="level0"/>
      <div className="flex h-full">
        <div className="flex w-3/5 h-full">
          <iframe className="h-[80vh] w-full m-2 no-scrollbar" src="/assets/newspapers/Set 3.pdf#toolbar=0&navpanes=0" frameborder="0"></iframe>
        </div>
        <InputBoxList />
      </div>
    </main>
  );
}
