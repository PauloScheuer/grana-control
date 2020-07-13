import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import css from './index.module.css';

export default function SelectDate({ nowDate, setNowDate }) {
  const [nextDate, setNextDate] = useState();

  useEffect(() => {
    if (nextDate != null) {
      setNowDate(nextDate);
    }
  }, [nextDate, setNowDate])

  const handleSelectChange = (event) => {
    setNowDate(event.target.value);
  }
  const handleButtonBack = () => {
    const nowYear = nowDate.substring(0, 4);
    const nowMonth = nowDate.substring(5);
    let nextDate;
    if (nowMonth !== '01') {
      nextDate = `${nowYear}-${(nowMonth - 1).toLocaleString('pt-br', { minimumIntegerDigits: 2 })}`;
    } else if (nowYear !== '2019' && nowMonth === '01') {
      nextDate = `${nowYear - 1}-12`;
    } else {
      nextDate = null;
    }
    setNextDate(nextDate);
  }
  const handleButtonGo = () => {
    const nowYear = nowDate.substring(0, 4);
    const nowMonth = nowDate.substring(5);
    let nextDate;
    if (nowMonth !== '12') {
      nextDate = `${nowYear}-${(Number(nowMonth) + 1).toLocaleString('pt-br', { minimumIntegerDigits: 2 })}`;
    } else if (nowYear !== '2021' && nowMonth === '12') {
      nextDate = `${Number(nowYear) + 1}-01`;
    } else {
      nextDate = null;
    }
    setNextDate(nextDate);
  }

  return (
    <div className={css.container}>
      <button className={classnames([css.button, nowDate === '2019-01' && css.null])} onClick={handleButtonBack}>{"<"}</button>
      <select className={css.select} onChange={handleSelectChange} value={nowDate}>
        <option>2019-01</option>
        <option>2019-02</option>
        <option>2019-03</option>
        <option>2019-04</option>
        <option>2019-05</option>
        <option>2019-06</option>
        <option>2019-07</option>
        <option>2019-08</option>
        <option>2019-09</option>
        <option>2019-10</option>
        <option>2019-11</option>
        <option>2019-12</option>
        <option>2020-01</option>
        <option>2020-02</option>
        <option>2020-03</option>
        <option>2020-04</option>
        <option>2020-05</option>
        <option>2020-06</option>
        <option>2020-07</option>
        <option>2020-08</option>
        <option>2020-09</option>
        <option>2020-10</option>
        <option>2020-11</option>
        <option>2020-12</option>
        <option>2021-01</option>
        <option>2021-02</option>
        <option>2021-03</option>
        <option>2021-04</option>
        <option>2021-05</option>
        <option>2021-06</option>
        <option>2021-07</option>
        <option>2021-08</option>
        <option>2021-09</option>
        <option>2021-10</option>
        <option>2021-11</option>
        <option>2021-12</option>
      </select>
      <button className={classnames([css.button, nowDate === '2021-12' && css.null])} onClick={handleButtonGo}>{'>'}</button>
    </div>
  )
}
