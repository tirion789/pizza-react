import React from "react"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"

import { setCategoryIndex, setPageCount } from "../redux/slices/filterSlice";
import Cotegories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block';
import Skeleton from '../components/Pizza-block/skeleton';
import Pagination from '../components/pagination'
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

 const onChangePage = (id) => {
  dispatch(setPageCount(id))
 }

  const {categoryIndex, sortType, pageCount} = useSelector((state) => state.filter)
  
  


  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id))
  }

  const {searchValue} = React.useContext(SearchContext)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
      setIsLoading(true)
      const order = sortType.sort.includes('-') ? 'asc' : 'desc'
      axios
      .get(`https://629b64b3656cea05fc3883e0.mockapi.io/Items?&page=${pageCount}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortType.sort.replace('-', '')}&order=${order}&search=${searchValue}`)
      .then((response) => {
          setItems(response.data);
          setIsLoading(false);
      })
        window.scrollTo(0, 0)
    }, [categoryIndex, sortType, searchValue, pageCount]);


    return (  
    <>
      <div className="content__top">
        <Cotegories value={categoryIndex} onClickCategory={onClickCategory} />
        <Sort/>
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
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </>)
}


export default Home

