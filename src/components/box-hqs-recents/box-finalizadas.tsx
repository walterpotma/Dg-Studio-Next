"use client"
import { useRouter } from "next/navigation";
import styles from "./box-hqs.module.css";
import { useEffect, useState } from "react";
import { useSearch } from "../../../Context/SearchContext";
import { hqsService } from "../../../service/WebApiService";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}

const boxFinalizadas = () => {
    const [hqsFinalizadas, setHqsFinalizadas] = useState<HQ[]>([]);
    const router = useRouter();
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

    useEffect(() => {
        hqsService.listarHqFinalizada()  
            .then((response) => {
                console.log(response.data);
                setHqsFinalizadas(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar hq:', error);
            });
    }, []);

    useEffect(() => {
        // Filtra HQs com base na consulta de pesquisa
        const filtered = hqsFinalizadas.filter(hq => 
            hq.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.generos.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredHqs(filtered);
    }, [searchQuery, hqsFinalizadas]);

    const handleViewHqPage = (hqId: string | number) => {
        localStorage.setItem('hqId', hqId.toString());
        router.push('/pagehq');
    }

    if(hqsFinalizadas.length < 1){
        return(
            <main className={styles.bodyFinalizadas}>
            <h1>HQs Finalizadas</h1>
            <br /><br />
            <p>Nenhuma HQ Finalizada</p>
            <br /><br /><br />
        </main>
        );
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHqs.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className={styles.bodyFinalizadas}>
            <h1>HQs Finalizadas</h1>
            {currentItems.map((hq) => (
                <button key={hq.id} className={styles.linhaHq} onClick={() => handleViewHqPage(hq.id)}>
                    {hq && hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
                    <div className={styles.descricaoHq}>
                        <p className={styles.nomeHq}>{hq?.nome}</p>
                        <div className={styles.generoHq}>
                            <button>{hq?.generos}</button>
                        </div>
                        <p className={styles.sinopseHq}>{hq?.descricao}</p>
                    </div>
                </button>
            ))}
            <div className={styles.paginateHq}>
                {Array.from(Array(Math.ceil(filteredHqs.length / itemsPerPage)).keys()).map((number) => (
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
export default boxFinalizadas;