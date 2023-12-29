import React from "react";
import styles from '@/styles/globe.module.css';
import Image from "next/image";
import earth from "@/assests/earth.svg";

export default function GlobeAnimation(){
    return(
        <Image src={earth} className={styles.globe} />
    )
}