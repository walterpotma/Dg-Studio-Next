"use client"
import styles from "./box-hqs.module.css";

const boxFinalizadas = () => {
    return (
        <main className={styles.bodyFinalizadas}>
            <h1>HQs Finalizadas</h1>
            <div className={styles.linhaHq}>
                <img src="https://cdn.ome.lt/1_qR1Az7HVWQMd6X7jowZrV0ixQ=/770x0/smart/uploads/conteudo/fotos/marvels_spider-man_2_hq_capa_completa.jpg" alt="" />
                <div className={styles.descricaoHq}>
                    <p></p>
                    <div className={styles.generoHq}>
                        <button>Ação</button>
                        <button>Romance</button>
                        <button>Sobrenatural</button>
                        <button>SuperHerois</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default boxFinalizadas;