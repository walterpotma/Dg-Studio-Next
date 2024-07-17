"use client"
import styles from "./master.module.css"
import Donut from "./barchart"
import LineChart from "./linechart"

const Page = () => {

    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <div>
                    <div>
                        <LineChart/>
                        <Donut/>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Page;