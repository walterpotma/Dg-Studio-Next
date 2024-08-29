"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header/header";
import { CacheService, UsuarioService } from "../../../service/WebApiService";
import CardUser from "../../components/profile/cardUser";

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
    
    if(!userData){
        return;
    }
    if(userData.categoria == 'master'){
        router.push('/controle');
    }

    return(
        <main>
            <Header/>
            <CardUser/>
        </main>
    );
}
export default Page;