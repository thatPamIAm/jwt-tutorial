import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

const Train = ({ id, line, status, token, canEdit, updateTrains }) => {

  const updateStatus = (event) => {
    const value = event.target.value;
    const trainId = event.target.dataset.trainid;

    fetch(`/api/v1/trains/${trainId}?token=${token}`, {
      method: 'PATCH',
      body: JSON.stringify({
        train: { status: value },
        // token
      }),
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      }
    })
    .then(response => response.json())
    .then(updatedTrains => {
      updateTrains(updatedTrains);
    })
    .catch(error => console.log('Error: ', error));
  }

  return (
    <div className={`${styles[line]} ${styles.train}`}>
      <h3>{ line } line</h3>
      <p>{ status }</p>
      { canEdit &&
        <select data-trainid={id} onChange={e => updateStatus(e)}>
          <option value='running'>running</option>
          <option value='down'>down</option>
          <option value='delayed'>delayed</option>
          <option value='maintenance'>maintenance</option>
        </select>
      }
    </div>
  );
};

export default Train;
