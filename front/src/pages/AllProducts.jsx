import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default function AllProducts(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products/')
    .then(res => setProducts(res.data))
  }, [])
  return(
    <div className="productList">
    {
      products.map((prod) => {
        const imgPath = prod.image;
        const url = `/products/${prod.pid}`
        return (
          <figure>
            <Link to={url}>
              <div className="product">
                <img src={imgPath} alt=''/>
              </div>
              <figcaption>
                <div>{prod.name}</div>
                <div>{prod.price}원</div>
              </figcaption>
            </Link>
          </figure>
        );
      })
    }
  </div>
  );
}