import { useState, useEffect } from 'react';
import styles from './Contador.module.css';

interface IStatus{
    status: string,
    contador: number,
    setContador: any,
    corDeFundo: boolean,
    setCorDeFundo: any
}

export default function Contador({status, contador, setContador, corDeFundo, setCorDeFundo}: IStatus) {
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (contador === 0) {
                clearInterval(intervalo);
            } else {
                setContador(contador - 1);
            }

        }, 1000);

        if (status === "ganhou" || status === "perdeu") {
            clearInterval(intervalo);
        }

        return () => clearInterval(intervalo);
    }, [contador, status]);

    useEffect(() => {
        if (contador <= 10 && contador > 5) {
            setTimer(0.5);
            const corDeFundoInterval = setInterval(() => {
                setCorDeFundo((corDeFundo: boolean) => !corDeFundo);
            }, 500);

            if (status === "ganhou") {
                clearInterval(corDeFundoInterval);
                setCorDeFundo(false);
            } if (status === "perdeu"){
                clearInterval(corDeFundoInterval);
                setCorDeFundo(true);
            }

            return () => clearInterval(corDeFundoInterval);
        }
        if (contador <= 5 && contador > 0) {
            setTimer(0.2);
            const corDeFundoInterval = setInterval(() => {
                setCorDeFundo((corDeFundo: boolean) => !corDeFundo);
            }, 250);

            if (status === "ganhou") {
                clearInterval(corDeFundoInterval);
                setCorDeFundo(false);
            } if (status === "perdeu"){
                clearInterval(corDeFundoInterval);
                setCorDeFundo(true);
            }

            return () => clearInterval(corDeFundoInterval);
        }
    }, [contador, status])

    return (
        <div style={{ backgroundColor: corDeFundo ? 'red' : 'green',
                        transition: `background-color ${timer}s` 
                    }}
                className={styles.corDeFundo}
        >      
            <p>{contador}</p>
        </div>
    );
}
