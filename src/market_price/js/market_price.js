import '../css/market_price.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarketPriceList from './market_price_list';

export default function Market_price() {
    const [market_price_item, set_market_price_item] = useState([]);
    const [market_price_status, set_market_price_status] = useState('desc');

    useEffect(() => {
        get_markey_price_item_list();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [market_price_status]);

    const get_market_price_status=(e)=> {
        set_market_price_status(e.target.value);
    }

    const get_markey_price_item_list=async()=> {
        // 가격이 높은순
        const {
            data
        } = await axios.get('/markey_price_desc');

        // 가격이 낮은순
        const result = await axios.get('/markey_price_asc');

        if(market_price_status === 'desc') {
            set_market_price_item(data);
        } else if(market_price_status === 'asc') {
            set_market_price_item(result.data);
        }
    }

    const mraket_price_result = market_price_item.map(
        (data, index) => (
            <MarketPriceList
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            view={data.view}
            ></MarketPriceList>
        )
    )

    return(
        <div id='markey_price_div'>
            <div id='markey_price_div_header'>
                <p>실세간 시세</p>

                <select onChange={get_market_price_status}>
                    <option value='desc'>가격이 높은순</option>
                    <option value='asc'>가격이 낮은순</option>
                </select>
            </div>

            <div id='markey_price_div_main'>
                {mraket_price_result}
            </div>
        </div>
    )
}