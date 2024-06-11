"use client"
import styles from "./paginaInicial.module.css"
import Header from "../paginaInicial/header"
import FormRegister from "../formularios/Register"
import FormLogin from "../formularios/login"


const PaginaInicial = () => {
	return(
		<div>
			<Header/>
            <main className={styles.bodyLayout}>
				<p className={styles.textInicial}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quis expedita veniam architecto sunt, laudantium nostrum impedit minima. Consectetur minus mollitia optio eos numquam nihil laudantium adipisci voluptates saepe illo.</p>
				<FormRegister/>
				<FormLogin/>
			</main>
		</div>
	);
}
export default PaginaInicial;