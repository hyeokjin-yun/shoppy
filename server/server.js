import express from 'express';
import cors from 'cors';
import newProductsRouter from './router/newProductsRouter.js';
import allProductsRouter from './router/allProductsRouter.js';
import signupRouter from './router/signupRouter.js';
import loginRouter from './router/loginRouter.js';
import newCartRouter from './router/newCartRouter.js';
import cartRouter from './router/cartRouter.js';
import cookieParser from 'cookie-parser';

const server = express();
const PORT = 8000;

server.use(express.json());//클라이언트와 주고 받는 데이터는 json형태
server.use(express.urlencoded({extended : true}))//한글 데이터를 인코딩하기 위함
server.use(cors());
server.use(cookieParser());

server.use('/products/new', newProductsRouter);
server.use('/products', allProductsRouter);
server.use('/signup', signupRouter);
server.use('/login', loginRouter);
server.use('/cart/new', newCartRouter);
server.use('/carts', cartRouter);


server.listen(PORT, () => {
  console.log(`server running => ${PORT}`);
})

//npm start => nodemon 라이브러리가 server.js를 찾음 => 8000번 포트를 통해 요청을 기다림