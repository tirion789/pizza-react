import React from "react";
import debounce from "lodash.debounce";

import styles from './Search.module.scss'
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

const Search = () => {

    const [value, setValue] = React.useState('')

    const dispatch = useDispatch();

    const onChangeSearch = (text) => {
        dispatch(setSearchValue(text))
       }


    const inputRef = React.useRef();

    const updateSearchValue = React.useCallback(
    debounce((str) => {
        onChangeSearch(str);
    }, 500),
      [],
    )

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    const onClear = () => {
        onChangeSearch('');
        setValue('')
        inputRef.current.focus();
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="50" width="50"/><circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/><line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5" y1="32.229" y2="45.5"/></svg>
            <input
            ref={inputRef}
            value={value} 
            onChange={onChangeInput}           
            className={styles.input} placeholder="Поиск пиццы"/>
            {value && (
            <svg onClick={() => onClear()}className={styles.closeIcon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
            </svg>)}
        </div>
    )
}

export default Search;