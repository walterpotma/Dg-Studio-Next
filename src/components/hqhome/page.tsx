"use client"
import styles from "./hqhome.module.css";
import {useState , useEffect} from "react";

const Page = () => {

    
    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <img src="https://cdn.ome.lt/1_qR1Az7HVWQMd6X7jowZrV0ixQ=/770x0/smart/uploads/conteudo/fotos/marvels_spider-man_2_hq_capa_completa.jpg" alt="" />
                </div>
                <div className={styles.details}>
                    <h1>Spider-Man 2</h1>
                    <div className={styles.generoHq}>
                        <button>Ação</button>
                        <button>Romance</button>
                        <button>Sobrenatural</button>
                        <button>SuperHerois</button>
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatum cum. Repudiandae a quam aspernatur, molestiae, esse maiores eveniet voluptate cum aliquam qui sed at aliquid ab. Nisi, distinctio porro.</p>
                </div>
                <h1 className={styles.quantCaps}>Capitulos: </h1>
                <div className={styles.listcaps}>
                    
                    <ul>
                        <li>Capitulo 1</li>
                        <li>Capitulo 2</li>
                        <li>Capitulo 3</li>
                        <li>Capitulo 4</li>
                        <li>Capitulo 5</li>
                        <li>Capitulo 6</li>
                        <li>Capitulo 7</li>
                        <li>Capitulo 8</li>
                        <li>Capitulo 9</li>
                        <li>Capitulo 10</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
export default Page;