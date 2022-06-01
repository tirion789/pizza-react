import React from "react";


const Cotegories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'Всё',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const onClickCategories = (n) => {
    setActiveIndex(n)
  }
    return (
      <div className="categories">
      {/* навигация по пиццам */}
        <ul>
          {
            categories.map((value, index) => (
              <li onClick = {() => onClickCategories(index)} className = {activeIndex === index ? "active" : ''} >{value}</li>
            ))
          }
        </ul>
      </div>
    );
  };

  export default Cotegories;