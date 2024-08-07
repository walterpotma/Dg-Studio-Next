import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://localhost:7162/Api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export class UsuarioService{
	static Login(email: string, senha: string) {
		return axiosInstance.post('/Usuarios/Login', {
            email: email,
            senha: senha
        });
	}
    static BuscarPorTokenJWT(token: string){
        return axiosInstance.get(`/Usuarios/BuscarPorTokenJWT/${token}`);
    }
    static listarUsuarios(){
        return axiosInstance.get('/Usuarios/ListarUsuarios');
    }
    static Registro(nomeRegistro: string, emailRegistro: string, senhaRegistro: string, categoriaRegistro:string) {
		return axiosInstance.post('/Usuarios/AddUsuarios', {
            nome: nomeRegistro,
            email: emailRegistro,
            senha: senhaRegistro,
            categoria: categoriaRegistro
        });
    }
}

export class CacheService{
    static listarCache(userId: string){
        return axiosInstance.get(`/Cache/ListarPorId/${userId}`);
    }
}

export class hqsService{
	static listarHqs(){
        return axiosInstance.get('/Hqs/ListarHqs');
    }
	static listarCapitulos(){
        return axiosInstance.get('/Capitulos/ListarCapitulos');
    }
}