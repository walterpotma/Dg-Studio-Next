"use client"
import styles from "./form.module.css"

const FormRegister = () => {
    return(
        <main className={styles.bodyRegister}>
            <form action="" method="post" className={styles.form}>
                <h1 className={styles.tituloForm}>Cadastre-se</h1>
                <input type="text" className={styles.inputForm} placeholder="Digite Seu nome aqui"/>
                <input type="text" className={styles.inputForm} placeholder="Digite Seu email aqui"/>
                <select name="" id="" className={styles.inputForm}>
                    <option value="leitor">Leitor</option>
                    <option value="autor">Autor Independente</option>
                    <option value="scan">Produtora</option>
                </select>
                <input type="text" className={styles.inputForm} placeholder="Digite Sua senha aqui"/>

                <button className={styles.linkRedirectForm}>Já possui conta? Faça Login</button>
                <input type="Submit" value="Cadastrar" className={styles.inputSubmit}/>
            </form>
        </main>
    );
}
export default FormRegister;