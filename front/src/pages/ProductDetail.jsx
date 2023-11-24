import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getUser } from '../util/localStorage.js';
import * as cookie from '../util/cookie.js';
import Quantity from '../components/Quantity.jsx';

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = getUser();
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  let [quantity, setQuantity] = useState(1);
  const selectSize = useRef(null);

  useEffect(() => {
    axios(`http://127.0.0.1:8000/products/${id}`).then((result) =>
      setProduct(result.data)
    );
  }, []);

  const decrease = () => {
    if(quantity >= 1 ){
      setQuantity(--quantity)
    }else{
      alert('최소 수량은 1개입니다.')
    }
  }

  const increase = () => {
    if(quantity <= 10 ){
      setQuantity(++quantity)
    }else{
      alert('최대 수량은 10개입니다.')
    }
  }

    //하위(자식) 컴포넌트인 Quantity의 number 값 가져오기
    const [qty, setQty] = useState(1);
    const getQty = (e) => {  //Quantity
      setQty(e);
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleClick = (e) => {
    if(userInfo === null){
      alert("로그인 후 이용 가능한 서비스입니다.");

      //현재 주소를 쿠키에 저장
      cookie.setCookie("sproduct", JSON.stringify(location.pathname));
      navigate('/login');
      return
    }

    if (product.size === undefined) {
      alert("사이즈를 선택해주세요");
      return selectSize.current.focus();
    }else{
      const cartProduct = {
        "id" : userInfo.id,
        "pid" : product.pid,
        "size" : product.size,
        "qty" : quantity
      };
      axios({
        method:'post',
        url:"http://127.0.0.1:8000/cart/new",
        data: cartProduct
      })
      .then(result => {
        if(result.data === 'ok'){
          //쿠키에 저장된 sproduct 삭제
          cookie.removeCookie("sproduct");
          alert('상품을 카트에 담았습니다.');
        }
      })
      .catch();
    }
  };

  return (
    <div className="productDetail">
      <img src={product.image} className="productDetailImg" alt="" />
      <div className="prodInfo">
        <div className="productDetailName">{product.name}</div>
        <div className="productDetailPrice">￦{product.price}</div>
        <select className="detail_select" name="size" onChange={handleChange} ref={selectSize}>
          <option value="default">옵션을 선택해주세요.</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <br />
        <Quantity getQty= {getQty} qty={1}/>
        <Link className="buyBtn">바로 구매</Link>
        <button className="buyBtn" onClick={handleClick}>
          카트에 담기
        </button>
      </div>
    </div>
  );
}
