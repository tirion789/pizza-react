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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false)

 const onChangePage = (id) => {
  dispatch(setPageCount(id))
 }

  const {categoryIndex, sortType, pageCount, searchValue} = useSelector((state) => state.filter)
  
  
  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id))

    
  }


    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPizzas = () => {
      setIsLoading(true)
      const order = sortType.sort.includes('-') ? 'asc' : 'desc'
      axios
      .get(`https://629b64b3656cea05fc3883e0.mockapi.io/Items?&page=${pageCount}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortType.sort.replace('-', '')}&order=${order}&search=${searchValue}`)
      .then((response) => {
          setItems(response.data);
          setIsLoading(false);
      })
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
        fetchPizzas();
      }
      isSearch.current = false
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
                {...obj}
              />
            ))}
      </div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </>)
}


export default Home

