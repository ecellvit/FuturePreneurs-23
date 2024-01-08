import Image from "next/image";
import Link from "next/link";
import bg from "public/assets/landingPage/bg.svg";
import image from "public/assets/landingPage/moonAstronaut.svg";

const Cutom404 = () => {
  return (
    <main>
      <div className="h-[100vh] relative flex flex-col text-neutral-100 items-center justify-center">
        <Image alt='bg' src={bg} fill className="object-cover z-[-10]" />
        <h1 className="text-4xl my-2 font-semibold">Far Out!!</h1>
        <h1 className="my-2">404 Page Not Found</h1>
        <div className="h-60 relative my-3">
          <Image alt='img' src={image} className="h-full" />
        </div>
        <div className="text-center text-lg">
          <div>We are not sure how you got here...</div>
          <div>But you may be lost in cyberspace</div>
        </div>
          <Link className="hover:underline  " href="/">
            <button className="border border-neutral-100 p-1 m-2 rounded">Go to our Home Page</button>
          </Link>
      </div>
    </main>
  );
};

export default Cutom404;
