"use client"
import styles from "./master.module.css";
import Donut from "./barchart";
import AddHq from "./addhq";
import AddCap from "./addcap";
import LineChart from "./linechart";
import { Search } from "lucide-react";
import { useState } from "react";

const Page = () => {

    const [isOpenAddHq, setIsOpenAddHq] = useState(false);
    const openAddHq = () => {
        setIsOpenAddHq(true);
        setIsOpenAddCap(false);
    }
    const closeAddHq = () => {
        setIsOpenAddHq(false);
    }

    const [isOpenAddCap, setIsOpenAddCap] = useState(false);
    const openAddCap = () => {
        setIsOpenAddCap(true);
        setIsOpenAddHq(false);
    }
    const closeAddCap = () => {
        setIsOpenAddCap(false);
    }

    return(
        <main className={styles.main}>
            <div className={styles.body}>
                <div className={styles.section}>
                    <div className={styles.buttoncollun}>
                        <button onClick={openAddHq}>Adicionar Nova HQ</button>
                        <button onClick={openAddCap}>Adicionar Capitulo</button>
                        <button>Aprovar </button>
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
                    {/* <div className={styles.listhqs}>
                        <div className={styles.linefilter}>
                            <select className={styles.filterhqs} id="">
                                <option value="0">Recentes</option>
                                <option value="1">Antigas</option>
                                <option value="2">Populares</option>
                                <option value="3">Favoritas</option>
                                <option value="4">Maiores</option>
                                <option value="5">Menores</option>
                                <option value="6">Maiores Produtores</option>
                                <option value="7">Menores Produtores</option>
                            </select>
                            <select className={styles.filterquant} id="">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className={styles.linepesquisa}>
                            <input type="text" placeholder="Procurar HQs pelo Nome"/>
                            <button><Search/></button>
                        </div>
                    </div> */}
                    <div className={styles.divgrafic}>
                        <LineChart/>
                        <Donut/>
                    </div>
                </div>
                {isOpenAddHq && (
                    <div>
                        <AddHq/>
                        <button onClick={closeAddHq} className={styles.buttonClose}>X</button>
                    </div>
                )}
                {isOpenAddCap && (
                    <div>
                        <AddCap/>
                        <button onClick={closeAddCap} className={styles.buttonClose}>X</button>
                    </div>
                )}
            </div>
        </main>
    );
}
export default Page;