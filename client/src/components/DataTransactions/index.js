import React, { useState, useEffect } from 'react';
import css from './index.module.css';

export default function DataTransactions({ allTransactions }) {
  const [numTransactions, setNumTransactions] = useState();
  const [transactionsPositive, setTransactionsPositive] = useState();
  const [transactionsNegative, setTransactionsNegative] = useState();
  const [totalMoney, setTotalMoney] = useState();

  useEffect(() => {
    const size = allTransactions.length;
    setNumTransactions(size);
    const allPositive = allTransactions.filter(transaction => {
      return transaction.type === '+';
    });
    const totalPositive = allPositive.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
    const allNegative = allTransactions.filter(transaction => {
      return transaction.type === '-';
    });
    const totalNegative = allNegative.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
    const total = totalPositive - totalNegative;
    setTransactionsPositive(toBRL(totalPositive));
    setTransactionsNegative(toBRL(totalNegative));
    setTotalMoney(toBRL(total));
  }, [allTransactions]);

  const toBRL = (num) => {
    return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', maximumFractoryDigits: 2 });
  }

  return (
    <div className={css.container}>
      <section className={css.each}>
        <span className={css.title}>Lançamentos: </span>
        <span className={css.value}>{numTransactions}</span>
      </section>
      <section className={css.each}>
        <span className={css.title}>Receitas: </span>
        <span className={css.value}>{transactionsPositive}</span>
      </section>
      <section className={css.each}>
        <span className={css.title}>Despesas: </span>
        <span className={css.value}>{transactionsNegative}</span>
      </section>
      <section className={css.each}>
        <span className={css.title}>Saldo: </span>
        <span className={css.value}>{totalMoney}</span>
      </section>
    </div>
  )
}
