const express = require('express');
const body_parser = require('body-parser');
const multer = require('multer');
const upload = require('./fileUploadAction');//업로드 기능을 가져옴
const PORT = process.env.PORT || 4000;
const app = express();
app.use(body_parser.json())
const db = require('./config/db');
const multi_db = require('./config/multi_db');
app.use(body_parser.urlencoded({extended:true}));
app.use(express.json());
app.use("/upload", express.static("upload"));

// 이미지를 upload 폴더에 넣는 쿼리
app.post('/api/upload', (req, res, next) => {
    console.log('/api/upload');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          return next(err);
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename) // 이것만 찾으면 된다.
        console.log('크기 : ' + req.file.size)
        return res.json({file:req.file.filename});
      });
})

// 모든 회원정보 가져오기
app.get('/get_all_user_information', (req, res) => {
    db.query(`select * from user_information`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 회원가입
app.post('/sign', (req, res) => {
    const { user_id, user_password, name } = req.body;

    db.query(`insert into user_information(user_id, user_password, name) values("${user_id}", "${user_password}", "${name}")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 로그인
app.get('/login/:user_id', (req, res) => {
    const { user_id } = req.params;

    db.query(`select * from user_information where user_id="${user_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 물건 등록
app.post('/post_item', (req, res) => {
    const { user_id, name, type, price, content, img } = req.body;

    db.query(`insert into item(user_id, name, type, price, content, img, date, status, favorite, view) values("${user_id}", "${name}", "${type}", "${price}", "${content}", "${img}", now(), "not sale", 0, 0)`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 조회수 올리기
app.put('/post_add_view', (req, res) => {
    const { id, view } = req.body;

    db.query(`update item set view="${view + 1}" where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 관심 목록 + 관심수 올리기
app.post('/post_favorite_item', (req, res) => {
    const { user_id, item_id, favorite } = req.body;

    const query1 = `insert into favorite_item(user_id, item_id) values("${user_id}", "${item_id}");`
    const query2 = `update item set favorite="${favorite + 1}" where id="${item_id}";`;

    multi_db.query(query1 + query2, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 관심목록 삭제 + 관심수 내리기
app.delete('/update_favorite_item/:user_id/:item_id/:favorite', (req, res) => {
    const { user_id, item_id, favorite } = req.params;

    const query1 = `delete from favorite_item where user_id="${user_id}" and item_id="${item_id}";`;
    const query2 = `update item set favorite="${favorite - 1}" where id="${item_id}";`;

    multi_db.query(query1 + query2, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

//관심목록 가져오기
app.get('/get_all_favorite_list', (req, res) => {
    db.query('select * from favorite_item', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당유저 관심 물품 가져오기
app.get('/get_favorite_item_list/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from favorite_item where user_id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 나의 중고 물품 목록 가져오기
app.get(`/get_my_used_item/:id`, (req, res) => {
    const { id } = req.params;

    db.query(`select * from item where user_id="${id}" and type="used" limit 0,8`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 나의 중고 물품 목록 가져오기 : 페이지네이션
app.get('/get_my_user_item_pagenation/:id/:page', (req, res) => {
    const { id, page } = req.params;

    let last_num = page * 8;
    let first_num = last_num - 8;

    db.query(`select * from item where user_id="${id}" and type="used" limit ${first_num},8`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})


// 나의 무료 나눔 목록 가져오기
app.get(`/get_my_free_item/:id`, (req, res) => {
    const { id } = req.params;

    db.query(`select * from item where user_id="${id}" and type="free" limit 0,8`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 나의 무료 나눔 목록 가져오기 : 페이지네이션
app.get('/get_my_free_item_pagenation/:id/:page', (req, res) => {
    const { id, page } = req.params;

    let last_num = page * 8;
    let first_num = last_num - 8;

    db.query(`select * from item where user_id="${id}" and type="free" limit ${first_num},8`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 상품 정보 가져오기
app.get('/get_detail_item/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from item where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 상세보기에서 추천상품 limit 0,6
app.get('/get_recommend_item', (req, res) => {
    db.query(`select * from item limit 0,6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 중고거래 페이지 limit 12개 씩
app.get('/get_used_page_item/:page', (req, res) => {
    const { page } = req.params;

    const last_num = page * 12;
    const first_num = last_num - 12;

    db.query(`select * from item where type="used" limit ${first_num},12`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 무료거래 페이지 limit 12개 씩
app.get('/get_free_page_item/:page', (req, res) => {
    const { page } = req.params;

    const last_num = page * 12;
    const first_num = last_num - 12;

    db.query(`select * from item where type="free" limit ${first_num},12`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 매인 중고거래 페이지 limit 4개 씩
app.get('/get_main_used_item', (req, res) => {
    db.query(`select * from item where type="used" limit 0,4`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 메인 무료거래 페이지 limit 4개 씩
app.get('/get_main_free_item', (req, res) => {
    db.query(`select * from item where type="free" limit 0,4`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 물품 구매
app.post('/buy_item', (req, res) => {
    const { buy_user_id, sell_user_id, item_id } = req.body;

    const query1 = `insert into buy_item(buy_user_id, sell_user_id, item_id) values("${buy_user_id}", "${sell_user_id}", "${item_id}");`;
    const query2 = `update item set status="sale" where id="${item_id}";`;
    const query3 = `delete from favorite_item where user_id="${buy_user_id}" and item_id="${item_id}";`;

    multi_db.query(query1 + query2 + query3, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    }) 
})

// 해당 사용자의 구매 목록
app.get('/get_buy_item', (req, res) => {
    db.query(`select * from buy_item`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 사용자의 구매 목록
app.get('/get_my_buy_item/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from buy_item where buy_user_id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 사용자의 구매 목록
app.get('/get_my_sell_item/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from buy_item where sell_user_id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 정보 수정하기
app.put('/update_item', (req, res) => {
    const { id, img, content, type, price } = req.body;

    db.query(`update item set img="${img}", content="${content}", type="${type}", price="${price}" where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 정보 삭제하기
app.delete('/delete_item/:id/:user_id', (req, res) => {
    const { id, user_id } = req.params;

    const query1 = `delete from item where id="${id}" and user_id="${user_id}";`
    const query2 = `delete from favorite_item item_id="${id}";`;

    multi_db.query(query1 + query2, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 검색 게시물 찾기
app.get('/search_item/:content', (req, res) => {
    const { content } = req.params;

    db.query(`select * from item where content like '%${content}%'`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 실시간 시세 페이지 오름차순(asc) : 가격이 낮은 순 부터
app.get('/markey_price_asc', (req, res) => {
    db.query(`select * from item where type="used" order by price asc`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 실시간 시세 페이지 내림차순(desc) : 가격이 높은 순 부터
app.get('/markey_price_desc', (req, res) => {
    db.query(`select * from item where type="used" order by price desc`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On http://localhost:${PORT}`);
})