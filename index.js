// express 모듈 로드
const express = require('express')
const app = express()

// 웹 서버의 port 번호 지정
const port = 3000

//뷰 파일들의 기본 경로 설정
// __dirname: 현재 파일의 경로 
app.set('views', __dirname + '/views')
//뷰 파일의 엔진으로 어떤 것을 사용할 것인가 
app.set('view engine', 'ejs') 

// json 데이터 사용하겠단 설정
//app.use(express.json()) 옛날엔 이거 적어야 했지만 요즘은 안 적어도 됨
// extended false를 사용시 데이터를 변환하는 엔진인 querystring 모듈을 사용함(express에 내장됨)
// extended true를 사용하게 되면 데이터 변환하는 엔진 qs 모듈을 사용함 (구버전 express에는 내장되어 있지 않음)
app.use(express.urlencoded({extended:false})) // 요즘엔 true나 false 입력 안 해도 됨

// 기본 경로 localhost:3000
// api 생성
// localhost:3000/ 요청이 들어오면
app.get('/', function (req, res) {
    // req 매개변수는 유저가 서버에게 요청을 보내는 부분
    // res 매개변수는 서버가 유저에게 응답을 보내는 부분
    //res.send('Hello World')

    // ejs 파일 응답해주기
    res.render('main.ejs')
})

// localhost:3000/second
app.get('/second', function(req, res) {
    //res.send('Second Page')
    res.render('data.ejs')
})

// localhost:3000/third
app.post('/third', function(req, res) {
    res.send('Third Page')
})   

//localhost:3000/data get 방식
app.get('/data', function(req, res) {
    // get 형식으로 데이터를 보내면
    // req 안에 query라는 키값 안에 데이터들이 존재함 
    console.log(req.query)
    const input_id = req.query._id
    const input_pass = req.query._pass
    //console.log(req['query']) // 접근방식2: 대괄호 - 키값이 숫자거나 중간에 공백이 있을 경우 사용
    console.log(input_id, input_pass)
    res.send(req.query)
})   

//localhost:3000/data2 post 방식
app.post('/data2', function(req, res) {
    // post 형식으로 데이터를 보낼 땐 req 안에 body 안에 데이터들이 존재
    console.log(req.body)
    //res.send(req.body) // 이렇게 하면 json 방식이라 형변환이 필요해 데이터 못 읽어옴

    // 유저가 입력한 id 값이 test이고 password가 1234인 경우 로그인 성공
    // 그 외의 경우엔 로그인 실패
    const input_id = req.body._id
    const input_pass = req.body._pass
    console.log(input_id, input_pass)
    let result

    if ((input_id == 'test') & (input_pass == '1234')) {
        result = '로그인 성공'
    } else {
        result = '로그인 실패'
    }

     // 화면에 result 값도 띄우기 키 data : 값 result
    res.render('index', {
        data : result
     })
})  

// 웹 서버 시작
app.listen(port, function () {
    console.log('server start')
})