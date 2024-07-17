"use client"
import styles from "./master.module.css"
import Donut from "./barchart"
import LineChart from "./linechart"

const Page = () => {

    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <div className={styles.section}>
                    <div className={styles.buttoncollun}>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <div className={styles.vazio}>
                            <div className={styles.dashedLines}>
                                <div className={styles.dashedLine}></div>
                                <div className={styles.dashedLine}></div>
                                <div className={styles.dashedLine}></div>
                                <div className={styles.dashedLine}></div>
                                <div className={styles.dashedLine}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.listhqs}>
                        
                    </div>
                    <div className={styles.divgrafic}>
                        <LineChart/>
                        <Donut/>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Page;