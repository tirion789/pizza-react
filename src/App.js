import React from 'react';

import Header from './components/Header';

import Cotegories from './components/Categories';

import Sort from './components/Sort';
import PizzaBlock from './components/Pizza-block';

import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch('https://629b64b3656cea05fc3883e0.mockapi.io/Items')
      .then((response) => response.json())
      .then((array) => {
        setItems(array);
      });
  }, []);

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
            {items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
