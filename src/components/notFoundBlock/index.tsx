import React from "react";

import styles from './notFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div>
            <h1 className={styles.root}>
                Ничего не найдено 🙁
            </h1>
            <p className={styles.text}>
                Кажется такой страницы не существует 
            </p>
        </div>
    ) 
} 

export default NotFoundBlock