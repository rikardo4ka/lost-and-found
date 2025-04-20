import React, { useState } from 'react';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://observantly-earnest-finfoot.cloudpub.ru";


function Form() {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { fullname, phone };

    try {
      const response = await fetch(`${API_URL}/api/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      

      if (response.ok) {
        alert('Заявка успешно отправлена!');
        setFullname('');
        setPhone('');
      } else {
        alert('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="statement-input-button">
        <input
          type="text"
          id="fullname"
          placeholder="Ваше ФИО"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="statement-input-button">
        <input
          type="tel"
          id="phone"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className="statement-submit-btn">Оставить заявку</button>
    </form>
  );
}

export default Form;
