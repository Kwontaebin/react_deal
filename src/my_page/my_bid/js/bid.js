import '../css/bid.css';
import cookie from 'react-cookies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import BuyBid from './buy_bid';
import SellBid from './sell_bid';

export default function Bid() {
    let buy_item_arr = [];
    let sell_item_arr = [];

    const [buy_item_list, set_buy_item_list] = useState([]);
    const [sell_item_list, set_sell_item_list] = useState([]);

    useEffect(() => {
        get_buy_list(); // 구매목록
        get_sell_list(); // 판매목록

        $("#bid_div_header p").click(function() {
            let idx = $("#bid_div_header p").index(this);

            $("#bid_div_header p").removeClass('p_where');
            $("#bid_div_header p").eq(idx).addClass('p_where');
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_buy_list=async() => {
        const login_user_id = cookie.load('id');
        const {
            data
        } = await axios.get(`/get_my_buy_item/${login_user_id}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/get_detail_item/${data[i].item_id}`);
            buy_item_arr.push(result.data[0]);
        }
        set_buy_item_list(buy_item_arr);
    }

    const get_sell_list=async() => {
        const login_user_id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_my_sell_item/${login_user_id}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/get_detail_item/${data[i].item_id}`);
            sell_item_arr.push(result.data[0]);
        }
        set_sell_item_list(sell_item_arr);
    }

    const bid_div_header_buy_text=()=> {
        $("#bid_div_sell_list").hide()
        $("#bid_div_buy_list").show()
    }

    const bid_div_header_sell_text=()=> {
        $("#bid_div_buy_list").hide()
        $("#bid_div_sell_list").show()
    }

    const buy_bid_result = buy_item_list.map(
        (data, index) => (
            <BuyBid
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></BuyBid>
        )
    )

    const sell_bid_result = sell_item_list.map(
        (data, index) => (
            <SellBid
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></SellBid>
        )
    )

    return(
        <div id='bid_div'>
            <div id='bid_div_header'>
                <p className='p_where' onClick={bid_div_header_buy_text}>구매 목록</p>
                <p onClick={bid_div_header_sell_text}>판매 목록</p>
            </div>

            <div id='bid_div_buy_list'>
                {buy_bid_result}
            </div>

            <div id='bid_div_sell_list'>
                {sell_bid_result}
            </div>
        </div>
    )
}