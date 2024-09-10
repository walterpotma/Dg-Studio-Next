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
interface Caps {
    id: number;
    hq: string;
    capitulo: number;
}

const Page = () => {
    const [hq, setHq] = useState<HQ | null>(null); // Start with null
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allCaps, setAllCaps] = useState<Caps[]>([]);
    const [nomeHq, setNomeHq] = useState('');
    const router = useRouter();

    const hqId = typeof window !== 'undefined' ? window.localStorage.getItem("hqId") : null;

    useEffect(() => {
        if (hqId) {
            const hqIdNumber = parseInt(hqId, 10); // Converte a string para um número
            hqsService.listarHqPorId(hqIdNumber)  
                .then((response) => {
                    console.log('Dados recebidos:', response.data);
                    setHq(response.data);
                    setNomeHq(response.data.nome);
                })
                .catch((error) => {
                    console.error('Erro ao listar HQ:', error);
                });
        }
    }, [hqId]);
    useEffect(() => {
        if (nomeHq) {  // Aguarda até nomeHq ser definido
            hqsService.listarTodosCapitulos(nomeHq)
                .then((response) => {
                    console.log(response.data);
                    setAllCaps(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao listar todos os caps:', error);
                });
        }
    }, [nomeHq]);

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

    const handleViewHqPage = (capId: string | number) => {
        localStorage.setItem('capId', capId.toString());
        router.push('/capitulo');
    }

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
                
                <h1 className={styles.quantCaps}>Capítulos: {allCaps.length} </h1>
                {allCaps.map((caps) =>
                    <button className={styles.listcaps} onClick={() => handleViewHqPage(caps.id)} key={caps.id}>
                        <ul>
                            <li>Capitulo: {caps.capitulo}</li>
                        </ul>
                    </button>
                )}                
            </div>
        </main>
    );
};

export default Page;
