"use client"
import styles from "./caps.module.css";
import Nav from "./nav";

const Page = () => {
    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <div className={styles.head}>
                    <h1>Spider Man: cap 1</h1>
                </div>
                <Nav/>
                <div className={styles.pgimg}>
                    <img src="https://www.researchgate.net/publication/325603512/figure/fig1/AS:634524169957377@1528293759764/Figura-2-Pagina-da-HQ-do-Homem-Aranha-Fonte-HOMEM-ARANHA-ESPECIAL-Sao-Paulo-Panini.png" alt="" />
                </div>
                <Nav/>
            </div>
        </main>
    );
}
export default Page;