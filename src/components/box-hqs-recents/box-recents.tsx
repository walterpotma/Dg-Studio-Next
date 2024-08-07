"use client"
import { useEffect, useState } from "react";
import styles from "./box-hqs.module.css";
import { UsuarioService, CacheService, hqsService } from "../../../service/WebApiService";
import {useRouter} from "next/navigation";
import { useSearch } from "../../../Context/SearchContext";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string[]; // Array of genres
}

const boxRecents = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [router, useRouter] = useState([]);
    const { searchQuery } = useSearch();

    useEffect(() => {
        hqsService.listarHqs()  
            .then((response) => {
                console.log(response.data);
                setHqs(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar hq:', error);
            });
    }, [hqs]);

    const filteredHqs = hqs.filter(hq =>
        hq.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className={styles.bodyRecents}>

            <h1>HQs Recentes</h1>
            {filteredHqs.map((hq) => (
                <div key={hq.id} className={styles.linhaHq}>
                    {hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
                    <div className={styles.descricaoHq}>
                        <p>{hq.nome}</p>
                        <div className={styles.generoHq}>
                            <button>{hq.generos}</button>
                        </div>
                        <p>{hq.descricao}</p>
                    </div>
                </div>
            ))}
        </main>
    );
}
export default boxRecents;