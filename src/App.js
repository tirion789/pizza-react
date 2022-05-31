import React from 'react';

import Header from './components/Header';

import Cotegories from './components/Categories';

import Sort from './components/Sort';
import PizzaBlock from './components/Pizza-block';

import './scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Cotegories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Итальянская" price="450" />
            <PizzaBlock title="Охотничая" price="550" />
            <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
