"use client"
import styles from "./home.module.css";
import Header from "@/components/header/header";
import Recents from "@/components/box-hqs-recents/box-recents";
import Finalizadas from "@/components/box-hqs-recents/box-finalizadas";

const Home = () => {
    return(
        <main>
            <Header/>
            <img src="https://s1.1zoom.me/big3/598/The_Walking_Dead_TV_460918.jpg" alt="" />
            <section className={styles.section}>
                <Recents/>
                <Finalizadas/>
            </section>
        </main>
    );
}
export default Home;