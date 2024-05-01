import '../css/update_item.css';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import UpdateItemInformation from './update_item_information';

export default function Update_item() {
    const [item_information, set_item_information] = useState([]);

    useEffect(() => {
        const search = window.location.search;
        const query = queryString.parse(search);
        get_item(query.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_item=async(id)=> {
        const {
            data
        } = await axios.get(`/get_detail_item/${id}`);
        set_item_information(data);
    }

    const result = item_information.map(
        (data, index) => (
            <UpdateItemInformation
            key={index}
            id={data.id}
            img={data.img}
            content={data.content}
            type={data.type}
            price={data.price}
            ></UpdateItemInformation>
        )
    )

    return(
        <div id='update_item_div'>
            {result}
        </div>
    )
}