import '../css/main_free.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainFreeList from './main_free_list';

export default function Main_free() {
    const [main_free_item, set_main_free_item] = useState([]);

    useEffect(() => {
        get_main_free_item_list();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_main_free_item_list=async() => {
        const {
            data
        } = await axios.get('/get_main_free_item');
        set_main_free_item(data);
    }
    
    const go_free_page=()=> {
        window.location.href='/free_page';
    }

    const main_free_item_result = main_free_item.map(
        (data, index) => (
            <MainFreeList
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></MainFreeList>
        )
    )

    return(
        <div id='main_free_div'>
            <div id='main_free_div_header'>
                <p id='main_free_div_header_text'>방금 등록된 무료물품</p>

                <p id='main_free_div_header_go_free_text' onClick={go_free_page}>더 구경하기</p>
            </div>

            <div id='main_free_div_main'>
                {main_free_item_result}
            </div>
        </div>
    )
}