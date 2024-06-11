"use client"
import styles from "./header.module.css";
import { Search , AlignJustify } from "lucide-react"; 
const Header = () => {
	return(
		<main className={styles.header}>
			<div className={styles.Logo}>
                    <img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
                    <h1 className={styles.tituloLogo}>DG-Studio</h1>
                </div>
				<div className={styles.areaInputPesquisa}>
					<input type="text" className={styles.inputPesquisa}/>
					<button><Search/></button>
				</div>
				<nav className={styles.navigation}>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
					</button>
				</nav>
		</main>
	);
}
export default Header;