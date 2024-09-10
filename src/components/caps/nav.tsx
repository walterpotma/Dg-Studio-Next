"use client";
import { useRouter } from "next/navigation";
import styles from "./caps.module.css";
import { MoveLeft, MoveRight, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { hqsService } from "../../../service/WebApiService";

interface Caps {
    id: number;
    hq: string;
    capitulo: number;
}

const Page = () => {
    const [cap, setCap] = useState<Caps | null>(null);
    const router = useRouter();

    // Recupera o ID do capítulo do localStorage e converte para número
    const capId = typeof window !== 'undefined' ? Number(window.localStorage.getItem("capId")) : null;

    useEffect(() => {
        if (capId !== null) {
            hqsService.listarCapId(capId.toString())
                .then((response) => {
                    console.log(response.data);
                    setCap(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao retornar o capítulo:', error);
                });
        }
    }, [capId]);

    const NavigationPageHq = () => {
        router.push('/pagehq');
    };

    const NavigationNextCap = (currentCapId: number | null) => {
        if (currentCapId !== null) {
            const next = currentCapId + 1; // Incrementa para o próximo capítulo
            console.log(`Próximo capítulo: ${next}`);
            localStorage.setItem('capId', next.toString());
            router.refresh();
        }
    };

    const NavigationLastCap = (currentCapId: number | null) => {
        if (currentCapId !== null && currentCapId > 1) {
            const last = currentCapId - 1; // Decrementa para o capítulo anterior
            console.log(`Capítulo anterior: ${last}`);
            localStorage.setItem('capId', last.toString());
            router.refresh();
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.body}>
                <nav className={styles.nav}>
                    <button onClick={() => NavigationLastCap(capId)}><MoveLeft /></button>
                    <button onClick={NavigationPageHq}><ListFilter /></button>
                    <button onClick={() => NavigationNextCap(capId)}><MoveRight /></button>
                </nav>
            </div>
        </main>
    );
};
export default Page;
