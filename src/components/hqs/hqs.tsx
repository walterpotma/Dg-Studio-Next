"use client"
import { useState , useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./hqs.module.css"

const HQs = () => {
    return(
        <main className={styles.bodyHQs}>
            <nav className={styles.navigation}>
                <button>Ação</button>
                <button>Apocalipse</button>
                <button>Aventura</button>
                <button>Comédia</button>
                <button>Fantasia</button>
                <button>Ficção</button>
                <button>Guerra</button>
                <button>Romance</button>
                <button>Super-Heróis</button>
                <button>Suspense</button>
            </nav>
            <div className={styles.section}>
                <div className={styles.linhaHq}>
                    <img src="https://cdn.ome.lt/1_qR1Az7HVWQMd6X7jowZrV0ixQ=/770x0/smart/uploads/conteudo/fotos/marvels_spider-man_2_hq_capa_completa.jpg" alt="" />
                    <div className={styles.descricaoHq}>
                        <div className={styles.generoHq}>
                            <button>Ação</button>
                            <button>Romance</button>
                            <button>Sobrenatural</button>
                            <button>SuperHerois</button>
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti consequuntur error temporibus incidunt aspernatur delectus dolorum harum. Distinctio, itaque, exercitationem beatae eaque ducimus asperiores explicabo sint eligendi corrupti dolore consequuntur?</p>
                    </div>
                </div>
                <div className={styles.linhaHq}>
                    <img src="https://cdn.ome.lt/1_qR1Az7HVWQMd6X7jowZrV0ixQ=/770x0/smart/uploads/conteudo/fotos/marvels_spider-man_2_hq_capa_completa.jpg" alt="" />
                    <div className={styles.descricaoHq}>
                        <div className={styles.generoHq}>
                            <button>Ação</button>
                            <button>Romance</button>
                            <button>Sobrenatural</button>
                            <button>SuperHerois</button>
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti consequuntur error temporibus incidunt aspernatur delectus dolorum harum. Distinctio, itaque, exercitationem beatae eaque ducimus asperiores explicabo sint eligendi corrupti dolore consequuntur?</p>
                    </div>
                </div>
                <div className={styles.linhaHq}>
                    <img src="https://cdn.ome.lt/1_qR1Az7HVWQMd6X7jowZrV0ixQ=/770x0/smart/uploads/conteudo/fotos/marvels_spider-man_2_hq_capa_completa.jpg" alt="" />
                    <div className={styles.descricaoHq}>
                        <div className={styles.generoHq}>
                            <button>Ação</button>
                            <button>Romance</button>
                            <button>Sobrenatural</button>
                            <button>SuperHerois</button>
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti consequuntur error temporibus incidunt aspernatur delectus dolorum harum. Distinctio, itaque, exercitationem beatae eaque ducimus asperiores explicabo sint eligendi corrupti dolore consequuntur?</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default HQs;