"use client"
import styles from "./master.module.css"

const Page = () => {

    return(
        <main className={styles.mainAddCap}>
            <div className={styles.bodyAddCap}>
                <form action="" method="post">
                    <h1>Add Novo Capitulo</h1>
                    <select name="" id="" >
                        <option value="0" selected>Selecione para qual HQ deseja adicionar</option>
                        <option value="0" selected>HQ 1</option>
                        <option value="0" selected>HQ 2</option>
                        <option value="0" selected>HQ 3</option>
                        <option value="0" selected>HQ 4</option>
                        <option value="0" selected>HQ 5</option>
                    </select>
                    <label htmlFor="">Adicionar Pagina</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <label htmlFor="">Adicionar Pagina</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <label htmlFor="">Adicionar Pagina</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <label htmlFor="">Adicionar Pagina</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <label htmlFor="">Adicionar Pagina</label>
                    <input type="file" name="" id="" placeholder="Adicione a Capa da Historia em Quadrinhos" />
                    <button>Adicionar</button>
                </form>
            </div>
        </main>
    );
}
export default Page;