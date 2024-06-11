"use client"
import styles from "./form.module.css";
import { useRouter } from 'next/navigation';

const FormLogin = () => {
  const router = useRouter();

  const navigateToHome = (event: React.FormEvent) => {
    event.preventDefault(); 
    router.push('/home');
  };

  return (
    <main className={styles.bodyRegister}>
      <form action="" method="post" className={styles.form} onSubmit={navigateToHome}>
        <h1 className={styles.tituloForm}>Entrar</h1>
        <input type="text" className={styles.inputForm} placeholder="Digite Seu email aqui" />
        <input type="password" className={styles.inputForm} placeholder="Digite Sua senha aqui" />
        <button type="button" className={styles.linkRedirectForm}>Não possui conta? Cadastre-se</button>
        <button type="submit" className={styles.inputSubmit}>Entrar</button>
      </form>
    </main>
  );
};

export default FormLogin;
