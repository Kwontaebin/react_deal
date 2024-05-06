# **React 중고거래 프로젝트**

프로젝트 소개
- 물건을 등록해서 구매하고 판매할수 있습니다.
- 검색을 통해 자신이 원하는 상품을 검색할수 있습니다.
- 자신의 페이지에서 자신이 구매,판매 목록을 볼수있습니다.

## 1. 개발 환경
- #### Front-end : Css, Html, Javascript, Jquery, React
- #### back-end : Mysql, Node-js
- #### 디자인 참고 : 링크 https://velog.io/@koohs414/React-Project-중고거래-서비스-Zoopzoop-Market

## 2. 프로젝트 구조
📦src <br/>
 ┣ 📂config <br/>
 ┃ ┣ 📜db.js <br/>
 ┃ ┗ 📜multi_db.js <br/>
 ┣ 📂free_page <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜free_item_list.js <br/>
 ┃ ┃ ┗ 📜free_page.js <br/>
 ┣ 📂header <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┗ 📜header.js <br/>
 ┣ 📂login_sign <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜login.js <br/>
 ┃ ┃ ┗ 📜sign.js <br/>
 ┣ 📂main <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜main.js <br/>
 ┃ ┃ ┣ 📜main_free.js <br/>
 ┃ ┃ ┣ 📜main_free_list.js <br/>
 ┃ ┃ ┣ 📜main_slider.js <br/>
 ┃ ┃ ┣ 📜main_used.js <br/>
 ┃ ┃ ┗ 📜main_used_list.js <br/>
 ┣ 📂market_price <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜market_price.js <br/>
 ┃ ┃ ┗ 📜market_price_list.js <br/>
 ┣ 📂my_page <br/>
 ┃ ┣ 📂js <br/>
 ┃ ┃ ┣ 📜my_page.js <br/>
 ┃ ┃ ┗ 📜post_item.js <br/>
 ┃ ┣ 📂my_bid <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜bid.js <br/>
 ┃ ┃ ┃ ┣ 📜buy_bid.js <br/>
 ┃ ┃ ┃ ┗ 📜sell_bid.js <br/>
 ┃ ┣ 📂my_favorite_item <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜favorite_item.js <br/>
 ┃ ┃ ┃ ┗ 📜favorite_item_list.js <br/>
 ┃ ┗ 📂my_item <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜free_item.js <br/>
 ┃ ┃ ┃ ┣ 📜update_item.js <br/>
 ┃ ┃ ┃ ┣ 📜update_item_information.js <br/>
 ┃ ┃ ┃ ┗ 📜used_item.js <br/>
 ┣ 📂search <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜search.js <br/>
 ┃ ┃ ┗ 📜search_list.js <br/>
 ┣ 📂used_page <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜used_item_list.js <br/>
 ┃ ┃ ┗ 📜used_page.js <br/>
 ┣ 📂view_detail <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜recommend_item.js <br/>
 ┃ ┃ ┣ 📜view_detail.js <br/>
 ┃ ┃ ┗ 📜view_detail_list.js <br/>
 ┣ 📜App.css <br/>
 ┣ 📜App.js <br/>
 ┗ 📜server.js <br/>
