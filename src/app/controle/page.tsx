"use client"
import Header from "@/components/header/header";
import Master from "@/components/master/page";
import router from "next/router";
import { useState, useEffect } from "react";
import { CacheService, UsuarioService } from "../../../service/WebApiService";

const Page = () => {

    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null;
    console.log(userId);

    const [cache, setCache] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    console.log(response.data);
                    setCache(response.data);
                    // Aqui você define o token usando o valor do cache
                    setToken(response.data.valor);
                    router.push('/controle');
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
                    console.log(response.data);
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao recuperar dados do usuário:', error);
                });
        }
    }, [token]);
    console.log(cache);
    console.log(token);
    console.log(userData);

    return(
        <main>
            <Header/>
            <Master/>
        </main>
    );
}
export default Page;