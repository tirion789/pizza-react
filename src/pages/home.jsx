import React from "react"
import axios from "axios";
import qs from "qs";


import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryIndex, setPageCount, setFilters } from "../redux/slices/filterSlice";
import Cotegories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block';
import Skeleton from '../components/Pizza-block/skeleton';
import Pagination from '../components/pagination'
import { sortsList } from "../components/Sort";
import { fetchPizzas } from "../redux/slices/pizzasSlice";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false)

 const onChangePage = (id) => {
  dispatch(setPageCount(id))
 }

  const {categoryIndex, sortType, pageCount, searchValue} = useSelector((state) => state.filter)
  const {items, status} = useSelector((state) => state.pizzas)
  
  
  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id))

    
  }


    // const [items, setItems] = React.useState([]);


    const getPizzas = async () => {
      const order = sortType.sort.includes('-') ? 'asc' : 'desc'
      const sortBy = sortType.sort.replace('-', '')
      const category = categoryIndex > 0 ? `category=${categoryIndex}` : ''
      dispatch(fetchPizzas({
        pageCount, category, sortBy, order, searchValue
      }))
    }

    // Если изменили параметры и был первый рендер

    React.useEffect(() => {
      if(isMounted.current){
        const queryString = qs.stringify({
          sort: sortType.sort,
          categoryIndex,
          pageCount,
        })
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    }, [categoryIndex, sortType, navigate, pageCount])

 // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе

    React.useEffect(() => {
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1))
        const sorts = sortsList.find(obj => obj.sort === params.sort)
        console.log()
        dispatch(
          setFilters({
            ...params,
            sorts,
          }),
        );
        isSearch.current = true
      }
    }, []);


    // Если был первый рендер, то запрашиваем пиццы

    React.useEffect(() => {
      window.scrollTo(0, 0)
      if(!isSearch.current){
        getPizzas();
      }
      isSearch.current = false
    }, [categoryIndex, sortType, searchValue, pageCount]);

    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)


    return (  
    <>
      <div className="content__top">
        <Cotegories value={categoryIndex} onClickCategory={onClickCategory} />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <div className="content__error-info">
          <h2>Произошла ошибка <icon>😕</icon></h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже 
          </p>
        </div> : <div className="content__items">
        {status === 'loading'
          ? skeletons
          // фитрация через js
          : items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())
          //
          ).map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
              />
            ))}
      </div>
      }
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </>)
}


export default Home

