import React from 'react'
import css from './index.module.css';
import { FiEdit, FiDelete } from 'react-icons/fi';
import classnames from 'classnames';
import api from '../../services/api';

export default function Transaction({ id, description, value, type, category, index, search, setIsAdding, setIsModalOpen, setId }) {
  const formatValue = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const typeColor = type === '+' ? true : false;
  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      search();
      alert('Transação deletada');
    } catch (err) {
      alert(err)
    }
  }
  const handleEdit = (id) => {
    setIsAdding(false);
    setIsModalOpen(true);
    setId(id);
  }
  return (
    <div className={classnames([css.transaction, typeColor ? css.good : css.bad])}>
      <span className={css.index}>{(index + 1).toLocaleString('pt-br', { minimumIntegerDigits: 2 })}</span>
      <section className={css.descriptionCategory}>
        <span className={css.description}>{description}</span>
        <span className={css.category}>{category}</span>
      </section>
      <span className={css.value}>{formatValue}</span>
      <section className={css.buttons}>
        <FiEdit onClick={() => handleEdit(id)} />
        <FiDelete onClick={() => handleDelete(id)} />
      </section>
    </div>
  )
}
