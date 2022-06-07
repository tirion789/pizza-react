import React from "react"

import Cotegories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block';
import Skeleton from '../components/Pizza-block/skeleton';

const Home = () => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryIndex, setCategoryIndex] = React.useState(0);
    const [sortType, setSortType] = React.useState(
      { name:'популярности', sort: 'rating'}
    )
  
    React.useEffect(() => {
      setIsLoading(true)
      const order = sortType.sort.includes('-') ? 'asc' : 'desc'
      fetch(`https://629b64b3656cea05fc3883e0.mockapi.io/Items?${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortType.sort.replace('-', '')}&order=${order}`)
        .then((response) => response.json())
        .then((array) => {
          setItems(array);
          setIsLoading(false);
        });
        window.scrollTo(0, 0)
    }, [categoryIndex, sortType]);

    return (  
    <>
      <div className="content__top">
        <Cotegories value={categoryIndex} onClickCategory={(index) => setCategoryIndex(index)} />
        <Sort value={sortType} onClickSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
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
    </>)
}

export default Home

