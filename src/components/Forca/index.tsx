import forcaVazia from '../../assets/forca-vazia.png';
import forcaCabeca from '../../assets/forca-cabeca.png';
import forcaCorpo from '../../assets/forca-corpo.png';
import forcaPernaEsq from '../../assets/forca-pernaEsq.png';
import forcaPernaDir from '../../assets/forca-pernaDir.png';
import forcaBracoEsq from '../../assets/forca-bracoEsq.png';
import forcaBracoDir from '../../assets/forca-final.png';
import { useState, useEffect } from 'react';
import styles from './Forca.module.css';

export default function Imagens({numErros}: {numErros: number}){
    const [imagem, setImagem] = useState(forcaVazia)
    
    useEffect(() => {
        if(numErros === 0) {
            setImagem(forcaVazia)
        }
        else if (numErros === 1) {
            setImagem(forcaCabeca)
        }
        else if (numErros === 2) {
            setImagem(forcaCorpo)
        }
        else if (numErros === 3) {
            setImagem(forcaPernaEsq)
        }
        else if (numErros === 4) {
            setImagem(forcaPernaDir)
        }
        else if (numErros === 5) {
            setImagem(forcaBracoEsq)
        }
        else if (numErros === 6) {
            setImagem(forcaBracoDir)
        }
    }, [numErros])

    return(
        <img className={styles.imagens} src={imagem} alt="" />
    )
}