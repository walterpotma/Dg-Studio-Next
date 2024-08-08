"use client";

import { useEffect, useState } from "react";
import styles from "./box-hqs.module.css";
import { hqsService } from "../../../service/WebApiService"; // Atualize se necessário
import { useRouter } from "next/navigation";
import { useSearch } from "../../../Context/SearchContext";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}

const BoxRecents = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const router = useRouter();
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
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
    }, []);
    useEffect(() => {
        // Filtra HQs com base na consulta de pesquisa
        const filtered = hqs.filter(hq => 
            hq.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.generos.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredHqs(filtered);
    }, [searchQuery, hqs]);
    
    return (
        <main className={styles.bodyRecents}>
            <h1>HQs Recentes</h1>
            {hqs.map((hq) => (
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

export default BoxRecents;
