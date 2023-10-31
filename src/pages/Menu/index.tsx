import { Link } from 'react-router-dom';
import styles from './Menu.module.css'

export default function Menu() {

    return(
        <div className={styles.menu}>
            <h1 className={styles.menu__titulo}>HANGMAN</h1>
            <Link to="/novojogo" className={styles.menu__novojogo}> Novo Jogo </Link>
            <p>Ao clicar no botão de Novo Jogo <br /> você terá 30 segundos para acertar a palavra</p>
        </div>
    )
}