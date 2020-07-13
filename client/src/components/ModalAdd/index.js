import React, { useState, useEffect } from 'react';
import css from './index.module.css';
import Modal from 'react-modal';
import api from '../../services/api';

Modal.setAppElement('#root');

export default function FilterAndNew({ id, isOpen, setIsModalAddOpen, isAdding, searchTransactions }) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    category: '',
    value: '',
    year: '',
    month: '',
    day: '',
    yearMonth: '',
    yearMonthDay: '',
  });
  useEffect(() => {
    const searchThisData = async () => {
      try {
        const res = await api.get(`/findOne/${id}`)
        const newData = res.data;
        delete newData._id;
        setFormData({ ...newData });
      } catch (err) {
        alert(err);
      }
    }
    if (!isAdding) {
      searchThisData();
    }
  }, [isAdding, id]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  const handleRadioChange = (isPositive) => {
    if (isPositive) {
      setFormData({ ...formData, 'type': '+' });
    } else {
      setFormData({ ...formData, 'type': '-' });
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleDateChange = (event) => {
    const fullDate = event.target.value;
    const year = fullDate.substring(0, 4);
    const month = fullDate.substring(7, 5);
    const day = fullDate.substring(10, 8);
    const yearMonth = `${year}-${month}`;
    const yearMonthDay = `${year}-${month}-${day}`;
    setFormData({
      ...formData,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay
    })
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsModalAddOpen(false);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isAdding) {
        await api.post('/create', formData);
        alert('Transação inserida');
      } else {
        const dataEdit = formData;
        delete dataEdit.type;
        await api.put(`edit/${id}`, formData);
        alert('Transação editada');
      }
      searchTransactions();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Modal isOpen={isOpen} className={css.modal}>
      <div className={css.container}>
        <section className={css.header}>
          <h1>Inclusão de despesa</h1>
          <button onClick={() => { setIsModalAddOpen(false) }} className={css.close}>Fechar</button>
        </section>
        <form className={css.form} onSubmit={handleSubmit}>
          {isAdding && (
            <section className={css.type}>
              <section className={css.eachInput}>
                <label className={css.label}>Despesa</label>
                <input type="radio" name="type" className={css.radio} onClick={() => handleRadioChange(false)} />
              </section>
              <section className={css.eachInput}>
                <label className={css.label}>Crédito</label>
                <input type="radio" name="type" className={css.radio} onClick={handleRadioChange} />
              </section>
            </section>
          )}
          <section className={css.eachInput}>
            <label className={css.label}>Descrição</label>
            <input type="text" name="description" value={formData.description} placeholder="Informe a descrição aqui" className={css.text} onChange={handleInputChange} />
          </section>
          <section className={css.eachInput}>
            <label className={css.label}>Categoria</label>
            <input type="text" name="category" value={formData.category} placeholder="Informe a categoria aqui" className={css.text} onChange={handleInputChange} />
          </section>
          <section className={css.eachInput}>
            <label className={css.label}>Valor</label>
            <input type="number" name="value" value={formData.value} placeholder="Informe o valor aqui" className={css.text} onChange={handleInputChange} />
          </section>
          <section className={css.eachInput}>
            <label className={css.label}>Data</label>
            <input type="date" name="date" value={formData.yearMonthDay} className={css.text} onChange={handleDateChange} />
          </section>
          <input type="submit" value="Enviar" className={css.submit} />
        </form>
      </div>
    </Modal>
  )
}
