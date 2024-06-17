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
      
    </main>
  );
};

export default FormLogin;
