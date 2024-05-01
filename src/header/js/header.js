import '../css/header.css';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import $ from 'jquery';

export default function Header() {
    const [header_input_value, Set_header_input_value] = useState();

    useEffect(() => {
        const id = cookie.load('id');
        const name = cookie.load('name');

        if(id === undefined) {
            $("#logout_text").hide();
            $("#name_text").hide();

            $("#sign_text").show();
            $("#login_text").show();
        } else {
            $("#sign_text").hide();
            $("#login_text").hide();

            $("#logout_text").show();
            $("#name_text").show();
            $("#name_text").text(`${name}님`);
        }

        $(window).scroll(function() {
            let sc_top=$(this).scrollTop();
            // console.log(sc_top) // 80

            if(sc_top >= 80){
                $("#header").addClass("fixed")
            }else{
                $("#header").removeClass("fixed")
            }
        })

        $("#header>p").hover(function() {
            const idx = $("#header>p").index(this);

            $("#header p").eq(idx).addClass('p_hover');
        }, function() {
            const idx = $("#header>p").index(this);
            $("#header p").eq(idx).removeClass('p_hover');
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout_btn=()=> {
        cookie.remove('id', {path : '/'},1000)
        cookie.remove('name', {path : '/'},1000)
        alert('로그아웃!');
        window.location.href='/';
    }

    const go_home=()=> {
        window.location.href='/';
    }

    const go_sign=()=> {
        window.location.href='/sign';
    }

    const go_login=()=> {
        window.location.href='/login';
    }

    const go_myPage=()=> {
        const id = cookie.load('id');

        window.location.href=`/my_page?id=${id}&ie=utf-8`;
    }

    const go_used_page=()=> {
        window.location.href='/used_page';
    }

    const go_free_page=()=> {
        window.location.href='/free_page';
    }

    const get_header_input_value=(e)=> {
        Set_header_input_value(e.target.value);
    }

    const search_input_btn=async(e)=> {
        if(e.key === 'Enter') {
            window.location.href=`/search?content=${header_input_value}&ie=utf-8`;
        }
    }

    const go_now_markeyPrice_page=(e)=> {
        window.location.href='/market_price';
    }

    return(
        <div id='header'>
            <h1 id='header_logo' onClick={go_home}>중고나라</h1>

            <p onClick={go_used_page}>중고거래</p>
            <p onClick={go_free_page}>무료나눔</p>
            <p onClick={go_now_markeyPrice_page}>실시간 시세</p>

            <input placeholder='검색어를 입력하세요' onChange={get_header_input_value} onKeyDown={search_input_btn}></input>

            <span id='logout_text' onClick={logout_btn}>로그아웃</span>
            <span id='name_text' onClick={go_myPage}></span>
            
            <span onClick={go_sign} id='sign_text'>회원가입</span>
            <span onClick={go_login} id='login_text'>로그인</span>
        </div>
    )
}