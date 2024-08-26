"use client"
import styles from "./paginaInicial.module.css"
import FormRegister from "../formularios/Register"
import FormLogin from "../formularios/login"
import {useState , useEffect, SetStateAction} from "react";
import axios from "axios";
import { UsuarioService, CacheService } from "../../../service/WebApiService";
import { useRouter } from "next/navigation";

const PaginaInicial = () => {
	const router = useRouter();
	const [isOpenLogin , setIsOpenLogin] = useState(true);
    const [isOpenRegister , setIsOpenRegister] = useState(false);
	const [email, setEmail] = useState('');
  	const [senha, setSenha] = useState('');
	const [userId, setUserId] = useState<string | null>(null);
	const [nomeRegistro, setNomeRegistro] = useState('');
	const [cache, setCache] = useState('');
	const [emailRegistro, setEmailRegistro] = useState('');
  	const [senhaRegistro, setSenhaRegistro] = useState('');
  	const [categoriaRegistro, setCategoriaRegistro] = useState('leitor');

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
		  	const response = await UsuarioService.Login(email, senha);
		  	//console.log(response.data);
			localStorage.setItem('userId', response.data.userId);
			setUserId(response.data.userId);
		}catch (error) {
		  	console.error('Erro ao fazer login:', error);
		}
	};
	
	
	useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    //console.log(response.data);
                    setCache(response.data);
					router.push('/controle');
                })
                .catch((error) => {
                    console.error('Erro ao recuperar cache:', error);
                });
        }
    }, [userId]);
	

	const handleRegistro = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
		  	const response = await UsuarioService.Registro(nomeRegistro, emailRegistro, senhaRegistro, categoriaRegistro);
		  	//console.log(response.data);
		}catch (error) {
		  	console.error('Erro ao fazer login:', error);
		}
	};

	{/*const usuarioService = new UsuarioService();
    const [usuario, setUsuario] = useState([]);
    useEffect(() => {
        usuarioService.listarUsuarios()
            .then((response) => {
                console.log(response.data);
				setUsuario(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);*/}
	const openLogin = () => {
		setIsOpenLogin(true);
		setIsOpenRegister(false);
	};

	const openRegister = () => {
		setIsOpenRegister(true);
		setIsOpenLogin(false);
	};

			
	return(
		<div>
			<header className={styles.header}>
                <div className={styles.Logo}>
                    <img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
                    <h1 className={styles.tituloLogo}>DG-Studio</h1>
                </div>
                <ul className={styles.lineButton}>
                    <button className={styles.button} onClick={openLogin}>Login</button>
                    <button className={styles.button} onClick={openRegister}>Cadastrar</button>
                </ul>
            </header>
            <main className={styles.bodyLayout}>
				{isOpenRegister && (
					<form method="post" className={styles.form} onSubmit={handleRegistro}>
						<h1 className={styles.tituloForm}>Cadastre-se</h1>
						<input
							type="text"
							className={styles.inputForm}
							placeholder="Digite Seu nome aqui"
							onChange={(e) => setNomeRegistro(e.target.value)}
						/>
						<input
							type="text"
							className={styles.inputForm}
							placeholder="Digite Seu email aqui"
							onChange={(e) => setEmailRegistro(e.target.value)}
						/>
						<select name="" id="" className={styles.inputForm} onChange={(e) => setCategoriaRegistro(e.target.value)}>
							<option value="leitor">Leitor</option>
							<option value="autor">Autor Independente</option>
							<option value="scan">Produtora</option>
						</select>
						<input
							type="text"
							className={styles.inputForm}
							placeholder="Digite Sua senha aqui"
							onChange={(e) => setSenhaRegistro(e.target.value)}
						/>
		
						<button className={styles.linkRedirectForm} onClick={openLogin}>Já possui conta? Faça Login</button>
						<input type="Submit" value="Cadastrar" className={styles.inputSubmit}/>
					</form>
				)}
				{isOpenLogin && (
					<form method="post" className={styles.form} onSubmit={handleLogin}>
						<h1 className={styles.tituloForm}>Entrar</h1>
						<input
							type="text"
							className={styles.inputForm}
							placeholder="Digite Seu email aqui"
							onChange={(e) => setEmail(e.target.value)}
						 />
						<input
							type="password"
							className={styles.inputForm}
							placeholder="Digite Sua senha aqui"
							onChange={(e) => setSenha(e.target.value)}
						/>
						<button type="button" className={styles.linkRedirectForm} onClick={openRegister}>Não possui conta? Cadastre-se</button>
						<button type="submit" className={styles.inputSubmit}>Entrar</button>
					</form>
				)}	
			</main>
		</div>
	);
}
export default PaginaInicial;