import '../css/search.css';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchList from './search_list';

export default function Search() {
    const [search_item, set_search_item] = useState([]);

    useEffect(() => {
        const search = window.location.search;
        const query = queryString.parse(search);
        get_search_item(query.content);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_search_item=async(content)=> {
        const {
            data
        } = await axios.get(`/search_item/${content}`);

        if(data.length === 0) {
            alert('해당 품목은 없습니다.');
            window.location.href='/';
        }

        set_search_item(data);
    }

    const search_result = search_item.map(
        (data, index) => (
            <SearchList
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></SearchList>
        )
    )

    return(
        <div id='search_div'>
            {search_result}
        </div>
    )
}