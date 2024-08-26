"use client"
import { useEffect, useState } from "react";
import styles from "./master.module.css";
import { MoveLeft, MoveRight } from "lucide-react";
import { CacheService, hqsService, UsuarioService } from "../../../service/WebApiService";
import { useRouter } from "next/navigation";

interface UserData {
    id: number;
    nome: string;
    email: string;
    senha: string;
    categoria: string;
}

const Page = () => {
    const router = useRouter();
    const [cache, setCache] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [nomeHq, setNomeHq] = useState('');
    const [capaBase64, setCapaBase64] = useState('');
    const [bannerBase64, setBannerBase64] = useState('');
    const [autorHq, setAutorHq] = useState('');
    const [sinopseHq, setSinopseHq] = useState('');
    const [generoHq, setGeneroHq] = useState('');
    const [statusHq, setStatusHq] = useState('Andamento');

    const userId = typeof window !== 'undefined' ? window.localStorage.getItem("userId") : null;
    useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    console.log(response.data);
                    setCache(response.data);
                    // Aqui você define o token usando o valor do cache
                    router.push('/controle');
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

	const convertToBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleCapaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Usa `?.` para lidar com undefined
        if (file) {
            const base64Capa = await convertToBase64(file);
            const base64CapaStripped = (base64Capa as string).replace(/^data:image\/\w+;base64,/, ""); // Type assertion para string
            setCapaBase64(base64CapaStripped);
        }
    };
    
    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64Banner = await convertToBase64(file);
            const base64BannerStripped = (base64Banner as string).replace(/^data:image\/\w+;base64,/, "");
            setBannerBase64(base64BannerStripped);
        }
    };
    


    const handleAddHqs = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(capaBase64)
        if (!capaBase64 || !bannerBase64 || !nomeHq || !sinopseHq || !generoHq || !userData) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await hqsService.AddHqs(
                nomeHq,
                capaBase64,
                bannerBase64,
                userData.nome,  // Usa diretamente o nome do autor
                sinopseHq,
                generoHq,
                statusHq
            );
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao Adicionar a HQ:', error);
        }
    };

    return(
        <main className={styles.mainAddHq}>
            <div className={styles.bodyAddHq}>
                <form action="" method="post" onSubmit={handleAddHqs}>
                    <h1>Add Nova HQ</h1>
                    <input type="text" placeholder="Digite o Nome da HQ" value={nomeHq} onChange={(e) => setNomeHq(e.target.value)}/>
                    <label htmlFor="">Adicione a Capa da Historia em Quadrinhos</label>
                    <input type="file" placeholder="Adicione a Capa da HQ" onChange={handleCapaChange}/>
                    <label htmlFor="">Adicione o Banner da Historia em Quadrinhos</label>
                    <input type="file" placeholder="Adicione o Banner da HQ" onChange={handleBannerChange}/>
                    <input type="text" placeholder="Sinopse da HQ" value={sinopseHq} onChange={(e) => setSinopseHq(e.target.value)}/>
                    <select className={styles.inputGeneros} name="generos" id="" value={generoHq} onChange={(e) => setGeneroHq(e.target.value)}>
                        <option value="Ação">Ação</option>
                        <option value="Apocalipse">Apocalipse</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Comédia">Comédia</option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Ficção">Ficção</option>
                        <option value="Guerra">Guerra</option>
                        <option value="Romance">Romance</option>
                        <option value="SuperHerois">SuperHerois</option>
                        <option value="Suspense">Suspense</option>
                    </select>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </main>
    );
}
export default Page;