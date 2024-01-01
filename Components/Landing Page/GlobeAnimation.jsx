import React from "react";
import styles from '@/styles/globe.module.css';
import Image from "next/image";
import earth from "@/assests/earth.svg";
import { motion } from "framer-motion";

export default function GlobeAnimation(){
    return(
        <motion.div
        initial={
            {
            height:"34vh",
            width:"34vw",
            top:"-20%",
            right:"0%",
            scale:1
        }
        }
        animate={{scale:3,top:"100%",right:"40%",rotateZ:"50deg"}}
        transition={{duration:10}}
        style={{
            position:"absolute",
            zIndex:"-5",
        }}
        >
            <Image src={earth} alt="Globo" className={styles.globe} />
        </motion.div>
    )
}