"use client";
import styles from "./header.module.css";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"; 
import { Search, AlignJustify, X, Home, BookOpenText, Info, LogIn, PersonStanding } from "lucide-react"; 
import { useSearch } from "../../../Context/SearchContext"; 
import { CacheService, hqsService, UsuarioService } from "../../../service/WebApiService"; // Atualize se necessário

interface HQ {
    id: number;
    nome: string;
    capa: string; // Base64 string for the image
    descricao: string;
    generos: string; // Array of genres
}
interface UserData {
    id: number;
    nome: string;
    email: string;
    senha: string;
    categoria: string;
}

const Header = () => {
    const { setSearchQuery, searchQuery } = useSearch();
    const router = useRouter();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [hqs, setHqs] = useState<HQ[]>([]);
    const [filteredHqs, setFilteredHqs] = useState<HQ[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cache, setCache] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);

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
    const navigateToProfile = (event: React.FormEvent) => {
        event.preventDefault(); 
        router.push('/profile');
    };

    const openMenu = () => { 
		setIsOpenMenu(true);
		setIsModalOpen(false);
	}
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
		setIsOpenMenu(false);
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
    const reabrirPesquisa = () => {
        setIsModalOpen(true);
    }


    const userId = localStorage.getItem("userId")
    useEffect(() => {
        if (userId !== null) {
            CacheService.listarCache(userId)
                .then((response) => {
                    console.log(response.data);
                    setCache(response.data);
                    // Aqui você define o token usando o valor do cache
                    router.push('/controle');
                })
                .catch((error) => {
                    console.error('Erro ao recuperar cache:', error);
                });
        }
    }, [userId]);
    
    useEffect(() => {
        if(userId !== null){
            CacheService.listarToken(userId)
                .then((response) => {
                    console.log(response.data);
                    setToken(response.data.valor);
                })
                .catch((error) => {
                    console.error('erro ao localizar o token:' , error)
                })
        }
    }, [token]);
    useEffect(() => {
        console.log(token)
        if (token !== null) {  // Verifique se o token não está vazio
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


    return (
        <main className={styles.header}>
            <div className={styles.Logo}>
                <img className={styles.imgLogo} src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/70-512.png" alt="" />
                <h1 className={styles.tituloLogo}>DG-Studio</h1>
            </div>
            <div className={styles.areaInputPesquisa}>
                <input type="text" placeholder="Pesquisar" onChange={handleSearchChange} />
                <button onClick={reabrirPesquisa}><Search /></button>
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
                        <button onClick={navigateToProfile}><PersonStanding/><p>Profile</p></button>
                    </ul>
                </nav>
            )}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.boxPesquisa}>
						<div className={styles.headerPesquia}>
                            <h2>Resultados</h2>
                            <button onClick={closeModal} className={styles.closeButton}>Fechar</button>
                        </div>
						{filteredHqs.map((hq) => (
							<div key={hq.id} className={styles.modalItem}>
								{hq.capa && <img src={`data:image/jpeg;base64,${hq.capa}`} alt="HQ" />}
								<div className={styles.descricaoHq}>
									<p className={styles.nomeHq}>{hq.nome}</p>
									<div className={styles.generoHq}>
										<button>{hq.generos}</button>
									</div>
									<p className={styles.sinopseHq}>{hq.descricao}</p>
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
