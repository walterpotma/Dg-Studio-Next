"use client"
import Header from "@/components/header/header";
import Master from "@/components/master/page";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CacheService, UsuarioService } from "../../../service/WebApiService";

interface UserData {
    id: number;
    nome: string;
    email: string;
    senha: string;
    categoria: string;
}

const Page = () => {
    const router = useRouter();
    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null;
    const [cache, setCache] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    console.log(response.data);
                    setCache(response.data);
                    // Aqui você define o token usando o valor do cache
                    setToken(response.data.valor);
                })
                .catch((error) => {
                    console.error('Erro ao recuperar cache:', error);
                });
        }
    }, [userId]);
    
    useEffect(() => {
        if (token !== '') {  // Verifique se o token não está vazio
            UsuarioService.BuscarPorTokenJWT(token)
                .then((response) => {
                    //console.log(response.data);
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
    if(userData.categoria !== 'master'){
        router.push('/profile');
    }

    return(
        <main>
            <Header/>
            <Master/>
        </main>
    );
}
export default Page;