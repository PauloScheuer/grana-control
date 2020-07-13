import React from 'react';
import css from './index.module.css';

export default function FilterAndNew({ setDescription, setIsModalAddOpen }) {
  const handleSetDescription = (event) => {
    const description = event.target.value;
    setDescription(description);
  }
  const handleSetIsModalOpen = () => {
    setIsModalAddOpen(true);
  }
  return (
    <div className={css.container}>
      <button className={css.button} onClick={handleSetIsModalOpen}>+ nova</button>
      <input type="text" placeholder="Filtrar" className={css.filter} onChange={handleSetDescription} />
    </div>
  )
}
