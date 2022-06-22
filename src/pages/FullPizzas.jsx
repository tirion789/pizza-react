import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizzas = () => {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState();

    React.useEffect(() => {
        async function fetchPizzas() {
            const {data} = await axios.get('https://629b64b3656cea05fc3883e0.mockapi.io/Items/' + id)
            setPizza(data)
        }
        fetchPizzas();
    }, [])

    if(!pizza) {
        return 'Загрузка...'
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} р</h4>
        </div>
    )
}

export default FullPizzas