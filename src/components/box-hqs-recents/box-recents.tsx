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
    const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

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
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHqs.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className={styles.bodyRecents}>
            <h1>HQs Recentes</h1>
            {currentItems.map((hq) => (
                <div key={hq.id} className={styles.linhaHq}>
                    {hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
                    <div className={styles.descricaoHq}>
                        <p className={styles.nomeHq}>{hq.nome}</p>
                        <div className={styles.generoHq}>
                            <button>{hq.generos}</button>
                        </div>
                        <p className={styles.sinopseHq}>{hq.descricao}</p>
                    </div>
                </div>
            ))}
            <div className={styles.paginateHq}>
                {Array.from(Array(Math.ceil(hqs.length / itemsPerPage)).keys()).map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`${styles.pageButton} ${currentPage === number + 1 ? styles.active : ''}`}
                    >
                        {number + 1}
                    </button>
                ))}
			</div>
        </main>
    );
}

export default BoxRecents;
