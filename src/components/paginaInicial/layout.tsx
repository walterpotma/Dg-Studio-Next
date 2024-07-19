"use client"
import styles from "./paginaInicial.module.css"
import FormRegister from "../formularios/Register"
import FormLogin from "../formularios/login"
import {useState , useEffect} from "react";
import axios from "axios";
import { UsuarioService } from "../../../service/UsuarioService";

const PaginaInicial = () => {

	const [isOpenLogin , setIsOpenLogin] = useState(true);
    const [isOpenRegister , setIsOpenRegister] = useState(false);
	const [usuario, setUsuario] = useState([]);

	const usuarioService = new UsuarioService();
    
    useEffect(() => {
        usuarioService.listarUsuarios()
            .then((response) => {
                console.log(response.data);
				setUsuario(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
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
					<form action="" method="post" className={styles.form}>
						<h1 className={styles.tituloForm}>Cadastre-se</h1>
						<input type="text" className={styles.inputForm} placeholder="Digite Seu nome aqui"/>
						<input type="text" className={styles.inputForm} placeholder="Digite Seu email aqui"/>
						<select name="" id="" className={styles.inputForm}>
							<option value="leitor">Leitor</option>
							<option value="autor">Autor Independente</option>
							<option value="scan">Produtora</option>
						</select>
						<input type="text" className={styles.inputForm} placeholder="Digite Sua senha aqui"/>
		
						<button className={styles.linkRedirectForm} onClick={openLogin}>Já possui conta? Faça Login</button>
						<input type="Submit" value="Cadastrar" className={styles.inputSubmit}/>
					</form>
				)}
				{isOpenLogin && (
					<form action="" method="post" className={styles.form}>
						<h1 className={styles.tituloForm}>Entrar</h1>
						<input type="text" className={styles.inputForm} placeholder="Digite Seu email aqui" />
						<input type="password" className={styles.inputForm} placeholder="Digite Sua senha aqui" />
						<button type="button" className={styles.linkRedirectForm} onClick={openRegister}>Não possui conta? Cadastre-se</button>
						<button type="submit" className={styles.inputSubmit}>Entrar</button>
					</form>
				)}	
			</main>
		</div>
	);
}
export default PaginaInicial;