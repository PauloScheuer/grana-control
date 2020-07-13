import React, { useState, useEffect } from 'react';
import SelectDate from './components/SelectDate';
import DataTransactions from './components/DataTransactions';
import TransactionsContainer from './components/TransactionsContainer';
import FilterAndNew from './components/FilterAndNew';

import ModalAdd from './components/ModalAdd';
import Title from './components/Title';
import api from '../src/services/api';


export default function App() {
  const [nowDate, setNowDate] = useState('2019-01');
  const [allTransactions, setAllTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [id, setId] = useState(0);
  useEffect(() => {

    searchTransactions();
  }, [nowDate, description]);
  const searchTransactions = async () => {
    const res = await api.get(`/findAll?yearMonth=${nowDate}&description=${description}`);
    setAllTransactions(res.data);
  }
  return (
    <>
      <ModalAdd isOpen={isModalAddOpen} setIsModalAddOpen={setIsModalAddOpen} isAdding={isAdding} searchTransactions={searchTransactions} id={id} />
      <main>
        <Title />
        <SelectDate nowDate={nowDate} setNowDate={setNowDate} />
        <DataTransactions allTransactions={allTransactions} />
        <FilterAndNew setDescription={setDescription} setIsModalAddOpen={setIsModalAddOpen} setIsAdding={setIsAdding} />
        <TransactionsContainer
          allTransactions={allTransactions}
          searchTransactions={searchTransactions}
          setIsAdding={setIsAdding}
          setIsModalOpen={setIsModalAddOpen}
          setId={setId} />
      </main>
    </>
  );
}
