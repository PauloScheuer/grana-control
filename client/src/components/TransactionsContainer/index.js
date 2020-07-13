import React from 'react';
import Transaction from '../Transaction';
import css from './index.module.css';
export default function TransactionsContainer({ allTransactions, searchTransactions, setIsAdding, setIsModalOpen, setId }) {
  return (
    <div className={css.container}>
      {allTransactions.map((transaction, index) => {
        const { _id, description, value, type, category } = transaction;
        return (
          <Transaction
            key={_id}
            id={_id}
            index={index}
            description={description}
            value={value}
            type={type}
            category={category}
            search={searchTransactions}
            setIsAdding={setIsAdding}
            setIsModalOpen={setIsModalOpen}
            setId={setId} />
        )
      })}
    </div>
  )
}
