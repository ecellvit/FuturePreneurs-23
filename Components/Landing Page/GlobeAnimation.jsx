import React from "react";
import styles from '@/styles/globe.module.css';
import Image from "next/image";
import earth from "public/assets/landingPage/earth.svg"
import { motion,useTransform } from "framer-motion";

export default function GlobeAnimation(){
    return(
        <div>
        <motion.div
        initial={
            {
            height:"34vh",
            width:"34vw",
            top:"-20%",
            right:"0%",
            scale:1,
        }
        }
        animate={{scale:3,top:"100%",right:"40%",rotateZ:"10deg"}}
        transition={{duration:7}}
        style={{
            position:"absolute",
            zIndex:"-5"}
        }
        className="invisible sm:visible">
            <Image src={earth} alt="Globo" className={styles.globe}/>
        </motion.div>
        
        <Image src={earth} alt="Globo" className="invisible max-sm:visible absolute h-1/2 w-full top-1/4 right-[-50%] z-[-5]"/>
        </div>
    )
}