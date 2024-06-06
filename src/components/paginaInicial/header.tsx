"use client"
import styles from "./paginaInicial.module.css"

const Header = () => {
	return(
		<div>
			<header className={styles.header}>
                <div className={styles.Logo}>
                    <img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
                    <h1 className={styles.tituloLogo}>DG-Studio</h1>
                </div>
                <ul className={styles.lineButton}>
                    <button className={styles.button}>Login</button>
                    <button className={styles.button}>Cadastrar</button>
                </ul>
            </header>
		</div>
	);
}
export default Header;