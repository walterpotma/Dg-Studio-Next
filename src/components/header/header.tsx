"use client";
import styles from "./header.module.css";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"; 
import { Search, AlignJustify, X, Home, BookOpenText, Info, LogIn } from "lucide-react"; 
import { useSearch } from "../../../Context/SearchContext"; 
import { hqsService } from "../../../service/WebApiService"; // Atualize se necessário

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}

const Header = () => {
    const { setSearchQuery, searchQuery } = useSearch();
    const router = useRouter();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigateToHome = (event: React.FormEvent) => {
        event.preventDefault(); 
        router.push('/');
    };
    const navigateToHQs = (event: React.FormEvent) => {
        event.preventDefault(); 
        router.push('/hqs');
    };
    const navigateToSobre = (event: React.FormEvent) => {
        event.preventDefault(); 
        router.push('/sobre');
    };
    const navigateToLogin = (event: React.FormEvent) => {
        event.preventDefault(); 
        router.push('/login');
    };

    const openMenu = () => setIsOpenMenu(true);
    const closeMenu = () => setIsOpenMenu(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filtra HQs com base na consulta de pesquisa
        const filtered = hqs.filter(hq => 
            hq.nome.toLowerCase().includes(query.toLowerCase()) ||
            hq.descricao.toLowerCase().includes(query.toLowerCase()) ||
            hq.generos.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredHqs(filtered);
        setIsModalOpen(filtered.length > 0);
    };

    useEffect(() => {
        hqsService.listarHqs()
            .then((response) => {
                setHqs(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar hq:', error);
            });
    }, []);

    const closeModal = () => setIsModalOpen(false);

    return (
        <main className={styles.header}>
            <div className={styles.Logo}>
                <img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
                <h1 className={styles.tituloLogo}>DG-Studio</h1>
            </div>
            <div className={styles.areaInputPesquisa}>
                <input type="text" placeholder="Pesquisar" onChange={handleSearchChange} />
                <button><Search /></button>
            </div>
            <nav className={styles.navigation}>
                <button onClick={openMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" x2="21" y1="6" y2="6"/>
                        <line x1="3" x2="21" y1="12" y2="12"/>
                        <line x1="3" x2="21" y1="18" y2="18"/>
                    </svg>
                </button>
            </nav>
            {isOpenMenu && (
                <nav className={styles.menuHamburg}>
                    <button onClick={closeMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                    <ul>
                        <button onClick={navigateToHome}><Home/><p>Home</p></button>
                        <button onClick={navigateToHQs}><BookOpenText/><p>HQs</p></button>
                        <button onClick={navigateToSobre}><Info/><p>Sobre</p></button>
                        <button onClick={navigateToLogin}><LogIn/><p>login</p></button>
                    </ul>
                </nav>
            )}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.boxPesquisa}>
						<button onClick={closeModal} className={styles.closeButton}>Fechar</button>
						<h2>HQs Filtradas</h2>
						{filteredHqs.map((hq) => (
							<div key={hq.id} className={styles.modalItem}>
								{hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
								<div className={styles.descricaoHq}>
									<p>{hq.nome}</p>
									<div className={styles.generoHq}>
										<button>{hq.generos}</button>
									</div>
									<p>{hq.descricao}</p>
								</div>
							</div>
						))}
					</div>
                </div>
            )}
        </main>
    );
}

export default Header;
