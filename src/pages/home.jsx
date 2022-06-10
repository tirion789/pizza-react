import React from "react"

import Cotegories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block';
import Skeleton from '../components/Pizza-block/skeleton';
import Pagination from '../components/pagination'
import { SearchContext } from "../App";

const Home = () => {

  const {searchValue} = React.useContext(SearchContext)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryIndex, setCategoryIndex] = React.useState(0);
    const [page, setPage] = React.useState(1)
    const [sortType, setSortType] = React.useState(
      { name:'популярности (DESC)', sort: 'rating'}
    )
  
    React.useEffect(() => {
      setIsLoading(true)
      const order = sortType.sort.includes('-') ? 'asc' : 'desc'
      fetch(`https://629b64b3656cea05fc3883e0.mockapi.io/Items?&page=${page}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortType.sort.replace('-', '')}&order=${order}&search=${searchValue}`)
        .then((response) => response.json())
        .then((array) => {
          setItems(array);
          setIsLoading(false);
        });
        window.scrollTo(0, 0)
    }, [categoryIndex, sortType, searchValue, page]);

    return (  
    <>
      <div className="content__top">
        <Cotegories value={categoryIndex} onClickCategory={(index) => setCategoryIndex(index)} />
        <Sort value={sortType} onClickSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          // фитрация через js
          : items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())
          //
          ).map((obj) => (
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
      <Pagination onChangePage={(number) => setPage(number)} />
    </>)
}


export default Home

