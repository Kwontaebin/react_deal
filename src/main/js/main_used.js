import '../css/main_used.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainUsedList from './main_used_list';

export default function Main_used() {
    const [main_used_item, set_main_used_item] = useState([]);

    useEffect(() => {
        get_main_used_item_list();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_main_used_item_list=async() => {
        const {
            data
        } = await axios.get('/get_main_used_item');
        set_main_used_item(data);
    }

    const go_used_page=()=> {
        window.location.href='/used_page';
    }

    const used_list_result = main_used_item.map(
        (data, index) => (
            <MainUsedList
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></MainUsedList>
        )
    )

    return(
        <div id='main_used_div'>
            <div id='main_used_div_header'>
                <p id='main_used_div_header_text'>방금 등록된 중고물품</p>

                <p id='main_used_div_header_go_used_text' onClick={go_used_page}>더 구경하기</p>
            </div>

            <div id='main_used_div_main'>
                {used_list_result}
            </div>
        </div>
    )
}