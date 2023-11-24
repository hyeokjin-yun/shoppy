import { useState } from "react";
import axios from 'axios';

export default function NewProducts(){

  const [form, setForm] = useState({image: '', name : '', price : ''});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]:value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method : 'post',
      url : 'http://127.0.0.1:8000/products/new/',
      data : form,
    })
    .then(result => {
      if(result.data === 'ok'){
        alert('상품을 등록했습니다.')
      }
    })
    .catch(err => {
      console.log('요청 실패');
      console.log(err);
    })
  };

  return(
    <div className="prodRegContainer" onSubmit={handleSubmit}>
      <h1>상품 등록</h1>
      <form className="prodRegForm">
        <ul>
          <li>
            <input type="text" name="image" placeholder="image" onChange={handleChange} value={form.image}/>
          </li>
          <li>
            <input type="text" name="name" placeholder="name"  onChange={handleChange} value={form.name}/>
          </li>
          <li>
            <input type="text" name="price" placeholder="price"  onChange={handleChange} value={form.price}/>
          </li>
        </ul>
        <button type="submit">등록</button>
      </form>
      
    </div>

  );
}