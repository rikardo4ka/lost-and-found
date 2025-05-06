import React, { useState } from 'react';
import './styles.css';
import Form from './Form';
import Modal from './Modal';
import ModalReg from './ModalReg';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://observantly-earnest-finfoot.cloudpub.ru";


function App() {
   // Состояния для двух разных модальных окон
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isRegModalOpen, setIsRegModalOpen] = useState(false);
 
   const openLoginModal = (e) => {
     e?.preventDefault();
     setIsLoginModalOpen(true);
   };
 
   const closeLoginModal = () => {
     setIsLoginModalOpen(false);
   };
 
   const openRegModal = (e) => {
     e?.preventDefault();
     setIsRegModalOpen(true);
     closeLoginModal(); // Закрываем модалку входа при открытии регистрации
   };
 
   const closeRegModal = () => {
     setIsRegModalOpen(false);
   };

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="h-line">
            <div className="h-logo">
              <img src="/картино4ки/Лого.svg" alt="" />
            </div>
            <div className="nav">
              <a className="nav-item" href="#">Главная</a>
              <a className="nav-item" href="#">Все объявления</a>
              <a className="nav-item" href="#">Отзывы</a>
              <a className="nav-item" href="#">Контакты</a>
              <button 
                className="nav-item icon-button" 
                onClick={openLoginModal}
                aria-label="Открыть модальное окно"
              >
                <img src="/картино4ки/иконка (1).png" alt="" height="56" width="56" />
              </button>
              <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
                <span className='ent-title'>Вход</span>
                <form
                  className="ent-content"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const login = document.getElementById("login").value;
                    const password = document.getElementById("password").value;

                    try {
                      const response = await fetch(`${API_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: login, password: password }),
                      });

                      if (response.ok) {
                        const data = await response.json();
                        alert('Успешный вход!');
                        console.log('Токен или данные:', data);
                        closeLoginModal();
                      } else {
                        alert('Неверный логин или пароль');
                      }
                    } catch (error) {
                      console.error('Ошибка при входе:', error);
                    }
                  }}
                >
                  <div className="ent-input">
                    <input type="text" id="login" placeholder="Логин" required />
                  </div>
                  <div className="ent-input">
                    <input type="password" id="password" placeholder="Пароль" required />
                  </div>
                  <div className="reviews-button">
                    <button type="submit">Войти</button>
                  </div>
                  <span>или</span>
                  <button 
                    className='ent-reg' 
                    type="button"
                    onClick={openRegModal} 
                    aria-label="Открыть окно регистрации"
                  >
                    Зарегистрироваться
                  </button>
                </form>
              </Modal>

              <Modal isOpen={isRegModalOpen} onClose={closeRegModal}>
                <span className='ent-title'>Регистрация</span>
                <form
                  className="ent-content"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const lastName = document.getElementById("lastName").value;
                    const firstName = document.getElementById("firstName").value;
                    const middleName = document.getElementById("middleName").value;
                    const phone = document.getElementById("regPhone").value;
                    const email = document.getElementById("regEmail").value;
                    const password = document.getElementById("regPassword").value;

                    try {
                      const response = await fetch(`${API_URL}/api/register`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          lastName,
                          firstName,
                          middleName,
                          phone,
                          email,
                          password
                        }),
                      });

                      if (response.ok) {
                        alert('Регистрация прошла успешно!');
                        closeRegModal();
                      } else {
                        alert('Ошибка при регистрации');
                      }
                    } catch (error) {
                      console.error('Ошибка регистрации:', error);
                    }
                  }}
                >
                  <div className="ent-input">
                    <input type="text" id="lastName" placeholder="Фамилия" required />
                  </div>
                  <div className="ent-input">
                    <input type="text" id="firstName" placeholder="Имя" required />
                  </div>
                  <div className="ent-input">
                    <input type="text" id="middleName" placeholder="Отчество" />
                  </div>
                  <div className="ent-input">
                    <input type="tel" id="regPhone" placeholder="Номер телефона" required />
                  </div>
                  <div className="ent-input">
                    <input type="email" id="regEmail" placeholder="Email" required />
                  </div>
                  <div className="ent-input">
                    <input type="password" id="regPassword" placeholder="Пароль" required />
                  </div>
                  <div className="reviews-button">
                    <button type="submit">Зарегистрироваться</button>
                  </div>
                </form>
              </Modal>

            </div>
          </div>
          <div className="h-down">
            <div className="h-title">
              Добро пожаловать<br />в Бюро Находок
              <div className="h-subtitle">
                Здесь вы найдёте свою вещь <br /> или поможете другим в<br /> поисках
              </div>
            </div>
          </div>
          <div className="h-links">
            <div className="link-items">
              <div className="h-links-title">Подписывайтесь в соцсетях<br /></div>
              <a className="link-item" href="#">
                <img src="/картино4ки/yt-icon.png" alt="icon youtube" />
                Бюро Находок | Воронеж<br />
              </a>
              <a className="link-item" href="#">
                <img src="/картино4ки/vk-icon.png" alt="icon vk" />
                Бюро Находок | Воронеж<br />
              </a>
              <a className="link-item" href="#">
                <div className="fb-icon-container"></div>
                <img src="/картино4ки/fb-icon.png" alt="icon facebook" />
                Бюро Находок | Воронеж<br />
              </a>
            </div>
            <div className="less-blocks">
              <div className="less-block">
                <div className="less-title">
                  Потеря <br />телефонов
                  <div className="arrow-icon">
                    <a href="#"><img src="/картино4ки/Arrow 1.png" alt="стрелка" /></a>
                  </div>
                </div>
                <div className="less-img">
                  <img src="/картино4ки/less-tel.png" alt="потеря телефонов" />
                </div>
              </div>
              <div className="less-block">
                <div className="less-title">
                  Забытые<br />ключи
                  <div className="arrow-icon">
                    <a href="#"><img src="/картино4ки/Arrow 1.png" alt="стрелка" /></a>
                  </div>
                </div>
                <div className="less-img">
                  <img src="/картино4ки/ключи.png" alt="потеря ключей" />
                </div>
              </div>
              <div className="less-block">
                <div className="less-title">
                  Пропавшие<br />украшения
                  <div className="arrow-icon">
                    <a href="#"><img src="/картино4ки/Arrow 1.png" alt="стрелка" /></a>
                  </div>
                </div>
                <div className="less-img">
                  <img src="/картино4ки/украш.png" alt="потеря украшений" />
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="ads">
        <div className="ads-img">
          <img src="/картино4ки/ads-img.png" alt="объявления" />
        </div>
        <div className="ads-right">
          <div className="ads-title">Посмотрите все объявления сайта</div>
          <div className="ads-subtitle">
            Мы собрали самые актуальные<br />объявления о потерянных вещах<br />и находках
          </div>
          <div className="ads-button">
            <a href="#">Смотреть все</a>
          </div>
        </div>
      </div>

      <div className="statement">
        <div className="statement-img">
          <img src="/картино4ки/statement-img.jpg" alt="заявление о пропаже" />
        </div>
        <div className="statement-text">
          <div className="statement-title">Напишите заявление<br />о пропаже</div>
          <div className="statement-subtitle">Мы перезвоним вам в ближайшее<br />время</div>
        </div>
        <div className="statement-button-and-text">
          <div className="statement-button">
            <Form />
          </div>
          <span className="statement-text1-under-button">
            Нажимая кнопку вы даёте согласие на <span className="statement-text2-under-button">обработку персональных данных</span>
          </span>
        </div>
      </div>

      <div className="reviews">
        <div className="reviews-text-and-button">
          <div className="reviews-title">Что пишут посетители<br />Бюро Находок</div>
          <div className="reviews-subtitle">
            Ежегодно в общественном<br />транспорте теряются более 130 000<br />всевозможных вещей, включая<br />24 000 сумок, 10 000 телефонов.
          </div>
          <div className="reviews-button">
            <a href="#">Читать отзывы</a>
          </div>
        </div>
        <div className="reviews-block">
          <div className="reviews-text">
            <div className="reviews-img-title">Отзыв</div>
            <div className="reviews-img-subtitle">Мария Петрова</div>
            <div className="reviews-desc">
              "Не могу поверить, что мне удалось<br />вернуть свою потерянную сумку! Бюро<br />находок - настоящий спаситель. Отличное<br />обслуживание и оперативное решение<br />проблемы. Спасибо вам!"
              <div className="arrow-icon">
                <a href="#"><img src="/картино4ки/Arrow 1.png" alt="стрелка" /></a>
              </div>
            </div>
          </div>
          <div className="reviews-img">
            <img src="/картино4ки/rewiews-img.png" alt="отзыв" />
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="f-line">
            <div className="f-logo">
              <img src="/картино4ки/Лого-black.png" alt="" />
            </div>
            <span className="f-text">Политика конфиденциальности</span>
            <span className="f-text">Согласие на обработку персональных данных</span>
            <img src="/картино4ки/yt-icon.png" alt="icon youtube" className="f-icon" />
            <img src="/картино4ки/vk-icon.png" alt="icon vk" className="f-icon" />
            <img src="/картино4ки/fb-icon.png" alt="icon facebook" className="f-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
