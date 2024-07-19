import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://localhost:7162/Api/Usuarios"
})

export class UsuarioService{
    listarUsuarios(){
        return axiosInstance.get('/ListarUsuarios');
    }
}