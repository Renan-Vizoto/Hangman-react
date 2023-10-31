import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Imagens from '../Forca';
import Teclado from '../Teclado'
import styles from './Palavra.module.css'
import classNames from "classnames";
import Contador from "../Contador";

export default function App(): JSX.Element {
  const palavras: string[] = ["ABACAXI", "BANANA", "PERA", "KIWI", "LARANJA"];
  const [palavraAleatoria, setPalavraAleatoria] = useState<string>("");
  const [letraPalavra, setLetraPalavra] = useState<string[]>([]);
  const [palavraEscondida, setPalavraEscondida] = useState<string[]>([]);
  const [letrasErradas, setLetrasErradas] = useState<number>(0);
  const [mensagem, setMensagem] = useState<string>("");
  
  const [contador, setContador] = useState<number>(13);
  const [corDeFundo, setCorDeFundo] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const ganhou: boolean = mensagem === `Você Ganhou! A palavra era: ${palavraAleatoria}`;
  const perdeu: boolean = mensagem === `Você Perdeu! A palavra era: ${palavraAleatoria}`;

  useEffect(() => {
    if (contador === 0) {
      setMensagem(`Você Perdeu! A palavra era: ${palavraAleatoria}`);
      setCorDeFundo(true);
    }
  }, [contador])

  useEffect(() => {
    const palavra: string = sortearPalavra(palavras);
    setPalavraAleatoria(palavra);

    const letras: string[] = palavra.split("");
    setLetraPalavra(letras);

    const palavraComUnderlines: string[] = letras.map(() => "_");
    setPalavraEscondida(palavraComUnderlines);
  }, []);

  function sortearPalavra(array: string[]): string {
    const indiceAleatorio: number = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
  }

  const cliqueTeclado = (letra: string): void => {
    if (letraPalavra.includes(letra)) {
      const novaPalavraEscondida: string[] = [...palavraEscondida];
      letraPalavra.forEach((letraPalavra, index) => {
        if (letraPalavra === letra) {
          novaPalavraEscondida[index] = letra;
        }
      });
      setPalavraEscondida(novaPalavraEscondida);

      if (!novaPalavraEscondida.includes("_")) {
        setMensagem(`Você Ganhou! A palavra era: ${palavraAleatoria}`);
        setStatus("ganhou");
      }
    } else {
      setLetrasErradas(letrasErradas + 1);

      if (letrasErradas >= 5) {
        setMensagem(`Você Perdeu! A palavra era: ${palavraAleatoria}`);
        setStatus("perdeu");
      }
    }
  }


  return (
    <div className={styles.container}>
      {mensagem && (
        <div className={classNames({
          [styles.mensagem]: true,
          [styles.mensagemGanhou]: ganhou,
          [styles.mensagemPerdeu]: perdeu
        })}>
          <p>{mensagem}</p>
          <button className={styles.botao__novoJogo} onClick={() => window.location.reload()}>Iniciar novo jogo</button>
          <Link to="/" className={styles.botao__voltarMenu}> Voltar para o menu </Link>

        </div>
      )}

      {mensagem && <div className={styles.ativarAfter}></div>}

      <Contador status={status} contador={contador} setContador={setContador} corDeFundo={corDeFundo} setCorDeFundo={setCorDeFundo}/>

      <div className={styles.palavra}>
        <Imagens numErros={letrasErradas} />
        <p>
          {palavraEscondida.map((letra, index) => {
            const isAcertou = letra !== "_";
            return (
              <span
                key={index}
                className={classNames({
                  [styles.letra]: true,
                  [styles.letraAcertada]: isAcertou
                })}
              >
                {letra}
              </span>
            );
          })}
        </p>
      </div>

      <Teclado clique={cliqueTeclado} />
    </div>
  )
}