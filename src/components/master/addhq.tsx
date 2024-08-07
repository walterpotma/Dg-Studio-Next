"use client"
import styles from "./master.module.css";
import { MoveLeft, MoveRight } from "lucide-react";

const Page = () => {

    return(
        <main className={styles.mainAddHq}>
            <div className={styles.bodyAddHq}>
                <form action="" method="post">
                    <h1>Add Nova HQ</h1>
                    <input type="text" placeholder="Digite o Nome da Historia em Quadrinhos"/>
                    <label htmlFor="">Adicione a Capa da Historia em Quadrinhos</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <label htmlFor="">Adicione o Banner da Historia em Quadrinhos</label>
                    <input type="file" name="" id="" placeholder="Adicione o Banner da Historia em Quadrinhos"/>
                    <input type="text" hidden placeholder="nome do autor"/>
                    <button>Adicionar</button>
                </form>
            </div>
        </main>
    );
}
export default Page;