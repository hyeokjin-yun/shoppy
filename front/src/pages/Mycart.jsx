import { useEffect, useState } from "react";
import { getUser } from "../util/localStorage.js";
import axios from "axios";
import Quantity from "../components/Quantity.jsx";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';

export default function Mycart() {
  //페이징 처리
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  // const [startIndex, setStartIndex] = useState(0);
  // const [endIndex, setEndIndex] = useState(0);

  const navigate = useNavigate();
  const userInfo = getUser();
  const [carts, setCarts] = useState([]);
  const [totPrice, setTotPrice] = useState(0);
  const [totDeliprice, setTotDeliprice] = useState(0);
  const [totOrderPrice, setTotOrderPrice] = useState(0);
  const [qty, setQty] = useState(1);

  //수량 업데이트
  function updateQty(cid, checkFlag){
    //http://127.0.0.1:8000/carts/:고객아이디/:장바구니아이디/:상태값
    axios({
      method : "get",
      url : `http://127.0.0.1:8000/carts/${userInfo.id}/${cid}/${checkFlag}`    
    })
    .then((result) => window.location.reload())
    .catch();
  }
  
  const getQty = (e) => {
    // alert(JSON.stringify(e)); //수량, 상품가격, flag
    setQty(e.qty);

    if (e.flag === "plus") {
      if(e.qtyFlag){
        updateQty(e.cid, e.flag); //DB에서 수량 변경 ++
        setTotPrice(totPrice + parseInt(e.price));
        setTotOrderPrice(totPrice + parseInt(e.price));
      }
    } else {
      if(e.qtyFlag){
        updateQty(e.cid, e.flag); //DB에서 수량 변경 --
        setTotPrice(totPrice - parseInt(e.price));
        setTotOrderPrice(totPrice - parseInt(e.price));
      }
    }
  };



  //서버에 회원의 장바구니 리스트 가져오기
  useEffect(() => {
    //startIndex, endIndex
    let startIndex = 0;
    let endIndex = 0;

    startIndex = (currentPage - 1) * pageSize + 1;
    endIndex = currentPage * pageSize;

    axios(`http://127.0.0.1:8000/carts/${userInfo.id}/${startIndex}/${endIndex}`)
      .then((result) => {
        setCarts(result.data);
        setTotalCount(result.data[0].cnt);

      //총 상품가격 구하기
      const newTotPrice = setNewTotPrice(result.data);
      const newTotOrderPrice = newTotPrice + totDeliprice;
      setTotPrice(newTotPrice);
      setTotOrderPrice(newTotOrderPrice);

      })
      .catch();
  }, [currentPage]);

    //총 상품가격 계산함수
    const setNewTotPrice = (carts) => {
      return carts.reduce((total, cart) => total + (cart.price * cart.qty), 0);
    }

  //삭제버튼 이벤트
  const handleDelete = async(e) => {
    const cid = e.target.dataset.id;
    alert(`cid ==>> ${cid}`);
    try {
      await axios.get(`http://127.0.0.1:8000/carts/${userInfo.id}/${cid}`)
          .then((result) => {
              // alert(JSON.stringify(result.data));
              window.location.reload();
          })
          .catch();
    } catch (error) {
      
    }    
  }

  //주문하기
  const handleOrder = (e) => {
    const newOrderList = new Array(); //[{},{}..]
    carts.map((cart) => {
        const orderProduct = {
            id : cart.id,
            pid : cart.pid,
            size : cart.size,
            qty : cart.qty,
            totPrice : cart.tprice
        };
        newOrderList.push(orderProduct);
    });

    //post 방식으로 서버에 전송
    axios({
      method : "post",
      url : "http://127.0.0.1:8000/order/new",
      data : newOrderList
    })
      .then((result) => {
        if(result.data === 'ok'){
          navigate('/order');
        }
      })
      .catch();    
  }//handleOrder


  return (
    <>
      {userInfo ? (
        <div>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>번호</th>
              <th>이미지</th>
              <th>이름</th>
              <th>가격</th>
              <th>사이즈</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((carts) => (
              <tr>
                <td>{carts.rno}</td>
                <td>
                  <img src={carts.image} alt="" style={{ width: "50px" }} />
                </td>
                <td>{carts.name}</td>
                <td>{carts.price}</td>
                <td>{carts.size}</td>
                <td>
                  <Quantity
                    qty={carts.qty}
                    price={carts.price}
                    getQty={getQty}
                  />
                  <Button
                    variant="danger"
                    type="button"
                    className="delete_style"
                    onClick={handleDelete} //이벤트.target.dataset.id
                    getQty={getQty}
                    cid = {carts.cid}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination 
          className="d-flex justify-content-center"
          current={currentPage}
          total={totalCount}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
        <div className="tot_div_style">
          <label>총 상품가격 </label><span className="tot_font_style">{totPrice.toLocaleString()} 원</span>
          <label>+ 총 배송비 </label><span className="tot_font_style">{totDeliprice.toLocaleString()} 원</span>   
          <label>= 총 주문금액 </label><span className="tot_order_font_style">{totOrderPrice.toLocaleString()} 원</span>
        </div>
        <button type="button" onClick={handleOrder}>주문하기</button>
        </div>
      ) : (
        <div>로그인 후 이용해주세요</div>
      )}
    </>
  );
}
