import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizzas: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    

    React.useEffect(() => {

        async function fetchPizzas() {
            try {
              const {data} = await axios.get('https://629b64b3656cea05fc3883e0.mockapi.io/Items/' + id)
              setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы');
            }
        }
        fetchPizzas();
    }, [])

    if(!pizza) {
        return <>Загрузка...</>
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="Картинка пиццы"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} р</h4>
        </div>
    )
}


export default FullPizzas