"use client"
import { useState , useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./hqs.module.css"
import { UsuarioService, CacheService, hqsService } from "../../../service/WebApiService";
import {useRouter} from "next/navigation";
import { useSearch } from "../../../Context/SearchContext";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}

const HQs = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [router, useRouter] = useState([]);
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(20);

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
        const filtered = hqs.filter(hq => 
            hq.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hq.generos.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredHqs(filtered);
    }, [searchQuery, hqs]);

    const handleFilterGender = (genre: string) => {
        const filtered = hqs.filter(hq =>
            hq.generos.toLowerCase().includes(genre.toLowerCase())
        );
        setFilteredHqs(filtered);
        setCurrentPage(1);
    };
    const handleResetFilter = () => {
        setFilteredHqs(hqs);
        setCurrentPage(1);
    };
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHqs.slice(indexOfFirstItem, indexOfLastItem);

    return(
        <main className={styles.bodyHQs}>
            <nav className={styles.navigation}>
                <button onClick={() => handleFilterGender("Ação")} type="button">Ação</button>
                <button onClick={() => handleFilterGender("Apocalipse")} type="button">Apocalipse</button>
                <button onClick={() => handleFilterGender("Aventura")} type="button">Aventura</button>
                <button onClick={() => handleFilterGender("Comédia")} type="button">Comédia</button>
                <button onClick={() => handleFilterGender("Fantasia")} type="button">Fantasia</button>
                <button onClick={() => handleFilterGender("Ficção")} type="button">Ficção</button>
                <button onClick={() => handleFilterGender("Guerra")} type="button">Guerra</button>
                <button onClick={() => handleFilterGender("Romance")} type="button">Romance</button>
                <button onClick={() => handleFilterGender("SuperHerois")} type="button">SuperHerois</button>
                <button onClick={() => handleFilterGender("Suspense")} type="button">Suspense</button>
                <button onClick={handleResetFilter} type="button">Mostrar Todas</button>
            </nav>

            <div className={styles.section}>
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
            </div>
        </main>
    );
}
export default HQs;