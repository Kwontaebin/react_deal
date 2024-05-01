import '../css/view_detail.css';
import query_string from 'query-string';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailList from './view_detail_list';

export default function View_detail() {
    const [item_information, set_item_information] = useState([]);

    useEffect(() => {
        const search = window.location.search;
        const query = query_string.parse(search);
        
        view_detail_item(query.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const view_detail_item=async(id)=> {
        const {
            data
        } = await axios.get(`/get_detail_item/${id}`);
        set_item_information(data);
    }

    const view_detail_result = item_information.map(
        (data, index) => (
            <ViewDetailList
            key={index}
            id={data.id}
            user_id={data.user_id}
            img={data.img}
            name={data.name}
            price={data.price}
            content={data.content}
            view={data.view}
            favorite={data.favorite}
            date={data.date}
            status={data.status}
            ></ViewDetailList>
        )
    )

    return (
        <div id='view_detail'>
            {view_detail_result}
        </div>
    )
}