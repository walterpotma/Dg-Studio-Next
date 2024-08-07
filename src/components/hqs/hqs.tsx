"use client"
import { useState , useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./hqs.module.css"
import { UsuarioService, CacheService, hqsService } from "../../../service/WebApiService";
import {useRouter} from "next/navigation";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string[]; // Array of genres
}

const HQs = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [router, useRouter] = useState([]);

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

    return(
        <main className={styles.bodyHQs}>
            <nav className={styles.navigation}>
                <button>Ação</button>
                <button>Apocalipse</button>
                <button>Aventura</button>
                <button>Comédia</button>
                <button>Fantasia</button>
                <button>Ficção</button>
                <button>Guerra</button>
                <button>Romance</button>
                <button>Super-Heróis</button>
                <button>Suspense</button>
            </nav>
            <div className={styles.section}>
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
            </div>
        </main>
    );
}
export default HQs;