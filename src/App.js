import React from 'react';

import Header from './components/Header';

import Cotegories from './components/Categories';

import Sort from './components/Sort';
import PizzaBlock from './components/Pizza-block';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Cotegories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Итальянская" price="450" />
            <PizzaBlock title="Охотничья" price="550" />
            <PizzaBlock title="Маргарита" price="350" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
