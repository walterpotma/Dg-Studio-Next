"use client"
import styles from "./header.module.css";
import { useRouter } from 'next/navigation';
import { useState , useEffect } from "react"; 
import { Search , AlignJustify , X , Home , BookOpenText , Shapes , Info } from "lucide-react"; 
const Header = () => {

  	const router = useRouter();

  	const navigateToHome = (event: React.FormEvent) => {
    	event.preventDefault(); 
    	router.push('/home');
  	};
  	const navigateToHQs = (event: React.FormEvent) => {
    	event.preventDefault(); 
    	router.push('/hqs');
  	};
  	const navigateToGeneros = (event: React.FormEvent) => {
    	event.preventDefault(); 
    	router.push('/generos');
  	};
  	const navigateToSobre = (event: React.FormEvent) => {
    	event.preventDefault(); 
    	router.push('/sobre');
  	};
  	const navigateToLogin = (event: React.FormEvent) => {
    	event.preventDefault(); 
    	router.push('/');
  	};

	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const openMenu = () => {
		setIsOpenMenu(true);
	};

	const closeMenu = () => {
		setIsOpenMenu(false);
	};

	

	return(
		<main className={styles.header}>
			<div className={styles.Logo}>
				<img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
				<h1 className={styles.tituloLogo}>DG-Studio</h1>
			</div>
			<div className={styles.areaInputPesquisa}>
				<input type="text" placeholder="Pesquisar"/>
				<button><Search/></button>
			</div>
			<nav className={styles.navigation}>
				<button onClick={openMenu}>
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
				</button>
			</nav>
			{isOpenMenu && (
				<nav className={styles.menuHamburg}>
					<button onClick={closeMenu} className="">
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					</button>
					<ul>
						<button onClick={navigateToHome}><Home/><p>Home</p></button>
						<button onClick={navigateToHQs}><BookOpenText/><p>HQs</p></button>
						<button onClick={navigateToGeneros}><Shapes/><p>Generos</p></button>
						<button onClick={navigateToSobre}><Info/><p>Sobre</p></button>
						<button onClick={navigateToLogin}><Info/><p>Sobre</p></button>
					</ul>
				</nav>
			)}
		</main>
	);
}
export default Header;