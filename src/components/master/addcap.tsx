"use client"
import { useEffect, useState } from "react";
import styles from "./master.module.css"
import { CacheService, hqsService, UsuarioService } from "../../../service/WebApiService";

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string;
    autor: string;
}
interface UserData {
    id: number;
    nome: string;
    email: string;
    senha: string;
    categoria: string;
}
interface NewCapitulo {
    id: number;
    hq: string;
    capitulo: number;
}

const Page = () => {
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [router, useRouter] = useState([]);
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const [cache, setCache] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [imageFields, setImageFields] = useState<string[]>(['']);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [ nomehq, setNomehq] = useState('');
    const [ capitulo, setCapitulo] = useState(1);
    const [ newCapitulo, setNewCapitulo] = useState<NewCapitulo | null>(null);

    const userId = typeof window !== 'undefined' ? window.localStorage.getItem("userId") : null;
    useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    console.log(response.data);
                    setCache(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao recuperar cache:', error);
                });
        }
    }, [userId]);
    
    useEffect(() => {
        if(userId !== null){
            CacheService.listarToken(userId)
                .then((response) => {
                    console.log(response.data);
                    setToken(response.data.valor);
                })
                .catch((error) => {
                    console.error('erro ao localizar o token:' , error)
                })
        }
    }, [token]);
    useEffect(() => {
        console.log(token)
        if (token !== null) {  // Verifique se o token não está vazio
            UsuarioService.BuscarPorTokenJWT(token)
                .then((response) => {
                    console.log(response.data);
                    setUserData(response.data);
                    
                })
                .catch((error) => {
                    console.error('Erro ao recuperar dados do usuário:', error);
                });
        }
    }, [token]);

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
        if (userData && hqs.length > 0) {
            const autor = userData.nome;
            const filtered = hqs.filter(hq =>
                hq.autor.toLowerCase().includes(autor.toLowerCase())
            );
            setFilteredHqs(filtered);
        }
    }, [userData, hqs])

    const convertToBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error("Falha ao converter para Base64"));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
    

    const handleFileChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            try {
                const base64Page = await convertToBase64(files[0]); // Converte para Base64
                const base64PageStripped = base64Page.replace(/^data:image\/\w+;base64,/, ""); // Remove o prefixo do Base64
                
                const newSelectedFiles = [...selectedFiles];
                newSelectedFiles[index] = base64PageStripped; // Armazena a string Base64 no array
                setSelectedFiles(newSelectedFiles);

                if (index === imageFields.length - 1) {
                    // Adiciona um novo campo vazio apenas se o campo atual for o último
                    setImageFields([...imageFields, '']);
                }
            } catch (error) {
                console.error("Erro ao converter imagem para Base64:", error);
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!nomehq) {
            console.error('Nenhuma HQ selecionada');
            return;
        }
    
        try {
            // Obter o último capítulo
            let latestCapitulo = 0; // Inicialize com 0
            try {
                const response = await hqsService.lastCap(nomehq);
                latestCapitulo = response.data.capitulo || 0;
            } catch (error) {
                console.error('Erro ao obter o último capítulo:', error);
                // Se houver um erro, assume-se que não há capítulos existentes
            }
    
            const newCapituloNumber = latestCapitulo + 1; // Define o novo capítulo como o próximo número
            setCapitulo(newCapituloNumber);
            console.log(newCapituloNumber);
    
            // Adicionar o novo capítulo
            const addCapResponse = await hqsService.AddCap(nomehq, newCapituloNumber);
            const newCapituloId = addCapResponse.data.id; // Obter o ID do novo capítulo
            setNewCapitulo(addCapResponse.data);
            console.log(newCapituloId);
    
            // Adicionar as páginas
            if (newCapituloId && selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    try {
                        console.log('id cap', newCapituloId);
                        console.log('number page', i + 1);
                        const addPageResponse = await hqsService.AddPage(
                            newCapituloId,
                            i + 1,
                            selectedFiles[i]
                        );
                        console.log(addPageResponse.data, 'imagem página adicionada com sucesso', i);
                    } catch (error) {
                        console.error('Erro ao adicionar a página:', i + 1, error);
                    }
                }
            } else {
                console.error('Nenhuma página selecionada');
            }
    
        } catch (error) {
            console.error('Erro ao adicionar o capítulo:', error);
        }
    };
    

    return(
        <main className={styles.mainAddCap}>
            <div className={styles.bodyAddCap}>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <h1>Add Novo Capitulo</h1>
                    <select value={nomehq} onChange={(e) => setNomehq(e.target.value)}>
                        <option value="0">Selecione para qual HQ deseja adicionar</option>
                        {filteredHqs.map((hq) => (
                            <option key={hq.id} value={hq.nome} selected>{hq.nome}</option>
                        ))}
                    </select>
                    {imageFields.map((_, index) => (
                        <div key={index}>
                            <label htmlFor={`image-${index}`}>Adicionar Pagina</label>
                            <input
                                type="file"
                                id={`image-${index}`}
                                onChange={(e) => handleFileChange(index, e)}
                            />
                        </div>
                    ))}
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </main>
    );
}
export default Page;