"use client"
import { useState , useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./sobre.module.css"

const Sobre = () => {
    return(
        <main className={styles.body}>
            <ul className={styles.sobre}>
                <li className={styles.topico}>
                    <h1>Quem Somos:</h1>
                    <p>No DG Studio, somos apaixonados por histórias em quadrinhos e dedicados a criar um espaço onde criadores e leitores possam se encontrar e compartilhar suas paixões. Nossa missão é oferecer uma plataforma inovadora e acessível, que celebre a criatividade e a diversidade dentro do universo das HQs. Com uma equipe composta por entusiastas de quadrinhos e especialistas em tecnologia, trabalhamos continuamente para melhorar e expandir nossa comunidade.</p>
                </li>
                <li className={styles.topico}>
                    <h1>Oque fazemos:</h1>
                    <p>
                    Publicação de HQs: Facilitamos o processo de publicação para que autores possam compartilhar suas histórias com o mundo. Desde amadores até profissionais, qualquer pessoa pode publicar suas HQs no DG Studio.
                    <br /><br />
                    Leitura de HQs: Oferecemos uma vasta biblioteca digital de HQs, abrangendo diversos gêneros e estilos, para que os leitores possam desfrutar de suas histórias favoritas e descobrir novas aventuras.
                    <br /><br />
                    Interação Comunitária: Promovemos uma comunidade vibrante onde leitores e criadores podem interagir, comentar e colaborar em projetos de HQs. Nosso fórum e nossas ferramentas sociais incentivam o diálogo e a troca de ideias.
                    <br /><br />
                    Recursos para Criadores: Além de oferecer uma plataforma de publicação, fornecemos ferramentas de edição e suporte técnico para ajudar os criadores a dar vida às suas histórias.
                    </p>
                </li>
                <li className={styles.topico}>
                    <h1>Regras:</h1>
                    <p>Respeito Mútuo: Trate todos os membros da comunidade com respeito. Comentários ofensivos, discriminatórios ou abusivos não serão tolerados.
                    <br /><br />
                    Conteúdo Apropriado: Publicações devem estar de acordo com as diretrizes de conteúdo da plataforma. Não é permitido postar material explícito, ilegal ou que viole direitos autorais.
                    <br /><br />
                    Spam e Propaganda: É proibido fazer spam ou publicar propagandas não autorizadas. Os links externos devem ser relevantes e não comerciais.
                    <br /><br />
                    Direitos Autorais: Respeite os direitos autorais de outros criadores. Não publique material que não seja de sua autoria sem a devida permissão.
                    <br /><br />
                    Colaboração Construtiva: Incentivamos a crítica construtiva, mas ataques pessoais ou críticas destrutivas não serão permitidos.</p>
                </li>
                <li className={styles.topico}>
                    <h1>Suporte Para Parceiros:</h1>
                    <p>No DG Studio, valorizamos nossos criadores e estamos comprometidos em fornecer o suporte necessário para que eles possam prosperar. Se você é um autor que publica suas HQs em nosso site, estamos aqui para ajudar com:
                    <br /><br />
                    1. Assistência Técnica: Nossa equipe de suporte está disponível para ajudar com questões técnicas relacionadas à publicação e formatação de suas HQs. Desde problemas de upload até ajustes na visualização, estamos prontos para fornecer soluções rápidas e eficazes.
                    <br /><br />
                    2. Dicas de Criação: Oferecemos recursos e conselhos para ajudar a melhorar a qualidade de suas histórias em quadrinhos. Isso inclui guias de melhores práticas, tutoriais e workshops sobre roteiro, arte, e design de HQs.
                    <br /><br />
                    3. Promoção e Visibilidade: Ajudamos a promover suas obras na nossa plataforma e em nossas redes sociais, garantindo que suas HQs alcancem um público maior. Oferecemos destaques para novas publicações, entrevistas com autores e eventos especiais.
                    <br /><br />
                    4. Feedback Construtivo: Se você busca melhorar seu trabalho, podemos fornecer feedback construtivo sobre suas HQs. Nossos especialistas estão disponíveis para revisar suas histórias e oferecer sugestões valiosas.</p>
                </li>
            </ul>
        </main>
    );
}
export default Sobre;