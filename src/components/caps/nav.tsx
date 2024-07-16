"use client"
import { useRouter } from "next/navigation";
import styles from "./caps.module.css";
import { MoveLeft, MoveRight, ListFilter } from "lucide-react";


const Page = () => {
    const router = useRouter();

    const NavigationPageHq = () => {
        router.push('/pagehq')
    }

    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <nav className={styles.nav}>
                    <button><MoveLeft/></button>
                    <button onClick={NavigationPageHq}><ListFilter/></button>
                    <button><MoveRight/></button>
                </nav>
            </div>
        </main>
    );
}
export default Page;