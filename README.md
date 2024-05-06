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

## 3. 주요 기능
### 회원가입
- 아이디와 이름중 일치하는 회원이 있는경우입니다.
<img src="/images/sign_img2.png" width="600" height="400">
<img src="/images/sign_img5.png" width="600" height="400">

- 비밀번호와 비밀번호 확인이 일치하지 않는경우입니다.
<img src="/images/sign_img4.png" width="600" height="400">

- 모두다 작성하지 않고 빈칸이 하나라도 있는경우입니다.
<img src="/images/sign_img3.png" width="600" height="400">

- 회원가입에 성공한 경우입니다.
- 회원가입에 성공하면 로그인페이지로 이동합니다.
<img src="/images/sign_img6.png" width="600" height="400">

## 로그인
- 아이디와 비밀번호를 압력후 로그인버튼을 누르면 회원정보에서 일치하는 정보를 찾고 일치하는 정보가 없으면 경고창을 띄웁니다.
<img src="/images/login_img1.png" width="600" height="400">
<img src="/images/login_img2.png" width="600" height="400">

- 로그인에 성공한 경우입니다.
- 로그인에 성공하면 홈 화면으로 이동합니다.
<img src="/images/login_img3.png" width="600" height="400">

## 로그아웃
- 로그인에 성공하면 생기는 로그아웃 글자를 클릭하면 로그아웃을 할수있습니다.
<img src="/images/logout_img1.png" width="600" height="400">
<img src="/images/logout_img2.png" width="600" height="400">

## 메인 페이지
- react-slick 라이브러리를 사용해서 이미지 슬라이드가 가능하게 했습니다.
<img src="/images/main_img1.png" width="600" height="400">

- 헤더 분리를 하여 일정 높이가 되면 헤더가 내려옵니다.
- 등록된 무료,유료 상품들을 최신순으로 보여줍니다.
- 더 알아보기를 클릭하면 중고거래, 무료나눔 페이지로 이동해서 더 많은 상품들을 확인할수 있습니다.
<img src="/images/main_img2.png" width="600" height="400">

## 중고 물품 페이지, 무료 나눔 페이지
- 모든 중고물품, 무료나눔 상품들을 확인할수있습니다.
- react-js-pagination 라이브러리를 사용해서 페이지네이션 기능을 만들었습니다.
<img src="/images/item_page_img1.png" width="600" height="400">
<img src="/images/item_page_img2.png" width="600" height="400">

## 실시가 시세 페이지
- 중고물품의 가격에 따라 가격이 높은순, 낮은순으로 상품을 보여줍니다.
<img src="/images/price_page_img1.png" width="600" height="400">
<img src="/images/price_page_img2.png" width="600" height="400">
