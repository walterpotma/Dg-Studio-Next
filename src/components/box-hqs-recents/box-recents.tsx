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
interface Caps {
    id: number;
    hq: string;
    capitulo: number;
}

const BoxRecents = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [newCaps, setNewCaps] = useState<Caps[]>([]);
    const router = useRouter();
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

    useEffect(() => {
        hqsService.listarNovosCapitulos()  
            .then((response) => {
                console.log(response.data);
                setNewCaps(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar hq:', error);
            });
    }, []);

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

    const filterHqCap = () => {
        // Relaciona novos capítulos com suas HQs correspondentes
        return newCaps.map((cap) => {
            const hq = hqs.find(h => h.nome === cap.hq);
            return { ...cap, hq };
        }).filter(item => item.hq !== undefined); // Filtra para evitar itens sem HQ correspondente
    }

    const handleViewHqPage = (hqId: string | number) => {
        localStorage.setItem('hqId', hqId.toString());
        router.push('/capitulo');
    }

    if(newCaps.length < 1){
        return(
            <main className={styles.bodyRecents}>
            <h1>Ultimos Capitulos</h1>
            <br /><br />
            <p>Nenhum Capitulo recente</p>
            <br /><br /><br />
        </main>
        );
    }

    const combinedData = filterHqCap();
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className={styles.bodyRecents}>
            <h1>Ultimos Capitulos</h1>
            {currentItems.map(({id, capitulo, hq}) => (
                <button key={id} className={styles.linhaHq} onClick={() =>hq && handleViewHqPage(hq.id)}>
                    {hq && hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
                    <div className={styles.descricaoHq}>
                        <p className={styles.newCapHq}>Capitulo: {capitulo}</p>
                        <p className={styles.nomeHq}>{hq?.nome}</p>
                        <div className={styles.generoHq}>
                            <button>{hq?.generos}</button>
                        </div>
                        <p className={styles.sinopseHq}>{hq?.descricao}</p>
                    </div>
                </button>
            ))}
            <div className={styles.paginateHq}>
                {Array.from(Array(Math.ceil(combinedData.length / itemsPerPage)).keys()).map((number) => (
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
