import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: any;
}


const Cotegories: React.FC<CategoriesProps> = ({value, onClickCategory}) => {

  const categories = [
    'Всё',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

    return (
      <div className="categories">
      {/* навигация по пиццам */}
        <ul>
          {
          categories.map((categoryName, index) =>
          <li
          key={index}
          onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
            )
          }
        </ul>
      </div>
    );
  };

  export default Cotegories;
  