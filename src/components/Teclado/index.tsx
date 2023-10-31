import { useState } from 'react'
import styles from './Teclado.module.css';
import classNames from 'classnames'

interface LetraClicada {
    [letra: string]: boolean;
}

interface TecladoProps {
    clique: (letra: string) => void;
}

export default function Teclado({ clique }: TecladoProps) {
    const alfabeto: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [letraClicada, setLetraClicada] = useState<LetraClicada>({});

    const clicouBotao = (letra: string) => {
        clique(letra);
        setLetraClicada((letraClicada) => ({...letraClicada, [letra]: true}));
        
    }

    return (
        <div className={styles.teclado}>
            {alfabeto.split('').map((letra, index) => (
                <button
                    key={index}
                    onClick={() => clicouBotao(letra)}
                    disabled={letraClicada[letra]}
                    className={classNames({
                        [styles.teclas]: true,
                        [styles['teclaClicada']]: letraClicada[letra]
                    })}
                >
                    {letra}
                </button>
            ))}
        </div>
    );
}
