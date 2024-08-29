"use client";
import { useRouter } from "next/navigation";
import { useSearch } from "../../../Context/SearchContext";
import { hqsService } from "../../../service/WebApiService";
import styles from "./hqhome.module.css";
import { useState, useEffect } from "react";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    banner: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}

const Page = () => {
    const [hq, setHq] = useState<HQ | null>(null); // Start with null
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const hqId = typeof window !== 'undefined' ? window.localStorage.getItem("hqId") : null;

    useEffect(() => {
        if (hqId) {
            const hqIdNumber = parseInt(hqId, 10); // Converte a string para um número
            hqsService.listarHqPorId(hqIdNumber)  
                .then((response) => {
                    console.log('Dados recebidos:', response.data);
                    setHq(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao listar HQ:', error);
                });
        }
    }, [hqId]);

    
    useEffect(() => {
        if (hq) {
            // Filtra HQs com base na consulta de pesquisa
            const filtered = [hq].filter((hq: HQ) =>
                hq.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                hq.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
                hq.generos.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredHqs(filtered);
        }
    }, [searchQuery, hq]);

    return (
        <main className={styles.main}>
            <div className={styles.body}>
                {filteredHqs.length > 0 ? (
                    <>
                        {filteredHqs.map((hq) => (
                            <div className={styles.header}
                                style={{
                                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(data:image/jpeg;base64,${hq.banner})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                key={hq.id}
                            >
                                {hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
                            </div>
                        ))}
                        {filteredHqs.map((hq) => (
                            <div className={styles.details} key={hq.id}>
                                <h1>{hq.nome}</h1>
                                <div className={styles.generoHq}>
                                    <button>{hq.generos}</button>
                                </div>
                                <p>{hq.descricao}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Nenhuma HQ encontrada.</p>
                )}

                <h1 className={styles.quantCaps}>Capítulos: </h1>
                <div className={styles.listcaps}>
                    <ul>
                        <li>Capítulo 1</li>
                        <li>Capítulo 2</li>
                        <li>Capítulo 3</li>
                        <li>Capítulo 4</li>
                        <li>Capítulo 5</li>
                        <li>Capítulo 6</li>
                        <li>Capítulo 7</li>
                        <li>Capítulo 8</li>
                        <li>Capítulo 9</li>
                        <li>Capítulo 10</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Page;
