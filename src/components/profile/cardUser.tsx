"use client"
import { useRouter } from "next/navigation";
import styles from ".//profile.module.css";
import { useState, useEffect } from "react";

interface UserData {
    id: number;
    nome: string;
    email: string;
    senha: string;
    categoria: string;
}

const Page = () => {
    const router = useRouter();
    return(
        <main className={styles.body}>
            <div className={styles.teste1}>

            </div>
            <div className={styles.section}>
                <div className={styles.acessUser}>

                </div>
                <div className={styles.dataUser}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={styles.teste2}>

            </div>
        </main>
    );
}
export default Page;