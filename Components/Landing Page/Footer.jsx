import Image from "next/image";
import Link from "next/link";

//Images import
import bg from "public/assets/landingPage/bg.svg";
import mail from "public/assets/landingPage/footer/contact/mail.svg"
import phone from "public/assets/landingPage/footer/contact/phone.svg"
import fb from "public/assets/landingPage/footer/socialMedia/fb.svg"
import insta from "public/assets/landingPage/footer/socialMedia/insta.svg"
import linkedin from "public/assets/landingPage/footer/socialMedia/linkedin.svg"
import x from "public/assets/landingPage/footer/socialMedia/x.svg"

const Footer = () => {
  return (
    <footer className="relative h-fit flex flex-col sm:flex-row sm:px-14 items-center py-10 gap-5 sm:gap-0" id="contact">
        <Image alt="backround space image" src={bg} fill className="object-cover z-[-10]" />
        <div className="w-full sm:w-1/3 h-full flex flex-col gap-5 sm:gap-10">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-6xl font-bold">E-CELL</h1>
                <h1>We Breed Business</h1>
            </div>
            <div className="flex flex-col items-center text-sm gap-2">
                <div className="flex items-center"><Image src={phone} alt="tel" className="h-4"/><Link href={"tel:+91 6306311799"}>+91 6306311799</Link></div>
                <div className="flex items-center"><Image src={mail} alt="mail" className="h-3"/><Link href={"mailto:helloecellvit@gmail.com"}>helloecellvit@gmail.com</Link></div>
            </div>
        </div>
        <div className="w-full px-8">
            <div className="h-[1px] bg-[#4B4949]"></div>
            <p className=" font-light text-sm tracking-wider">Entrepreneurship Cell is a Student based Club functioning under Office of Students' Welfare, VIT Vellore which aims at fostering entrepreneurial spirit amongst young aspirants by providing them with a platform and required resources for actuating their ideas into successful business ventures. E-Cell strives to attain an entrepreneurial environment in the campus and believes in taking strides towards establishing an ever-growing, ever-improving Start-Up environment. Our sole approach is to magnify the reach and set up a diverse pool of investors, evaluators and mentors.</p>
        </div>
        <div className="w-full sm:w-[10%] h-full flex sm:flex-col gap-3 items-center justify-center">
            <Link target="blank" href={"https://www.facebook.com/ecellvit"}><Image className="h-10" src={fb} alt="facebook icon"/></Link>
            <Link target="blank" href={"https://www.instagram.com/ecell_vit"}><Image className="h-10" src={insta} alt="instagram icon"/></Link>
            <Link target="blank" href={"https://www.linkedin.com/company/ecellvitvellore"}><Image className="h-10" src={linkedin} alt="linkedin icon"/></Link>
            <Link target="blank" href={"https://twitter.com/ecell_vit"}><Image className="h-10" src={x} alt="twitter icon"/></Link>
        </div>
    </footer>
  )
}

export default Footer
