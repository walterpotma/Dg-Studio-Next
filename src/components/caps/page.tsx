"use client"
import { useEffect, useState } from "react";
import { hqsService } from "../../../service/WebApiService";
import styles from "./caps.module.css";
import Nav from "./nav";
import { useRouter } from "next/navigation";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}
interface Caps {
    id: number;
    hq: string;
    capitulo: number;
}
interface Page {
    id: number;
    capitulo_id: number;
    numero: number;
    imagem: string;
}

const Page = () => {
    const [ cap, setCap ] = useState<Caps | null>(null);
    const [ pages, setPages ] = useState<Page[]>([]);
    const capId = typeof window !== 'undefined' ? window.localStorage.getItem("capId") : null
    const [hqs, setHqs] = useState<HQ[]>([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

    useEffect(() => {
        if (capId !== null) {
            hqsService.listarCapId(capId)
                .then((response) => {
                    console.log(response.data);
                    setCap(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao retornar o capitulo:', error);
                });
        }
    }, [capId]);
    useEffect(() => {
        if (capId !== null) {
            hqsService.listarPaginasCap(capId)
                .then((response) => {
                    console.log(response.data);
                    setPages(response.data || []);
                })
                .catch((error) => {
                    console.error('Erro ao retornar Paginas do capitulo:', error);
                });
        }
    }, [capId]);


    return(
        <main className={styles.main}>
            {cap &&
                <div className={styles.body}>
                    <div className={styles.head}>
                        <h1>{cap.hq}: capitulo {cap.capitulo}</h1>
                    </div>
                    <Nav/>
                    <div className={styles.pgimg}>
                        {pages.map((page) => ( 
                            <img 
                            key={page.id}
                            src={`data:image/jpeg;base64,${page.imagem}`}
                            alt="page"
                            />
                        ))}
                    </div>
                    <Nav/>
                </div>
            }
        </main>
    );
}
export default Page;