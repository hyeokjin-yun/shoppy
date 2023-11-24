import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", id: "", pass: "", phone: "" });

  const inputName = useRef(null);
  const inputId = useRef(null);
  const inputPass = useRef(null);
  const inputPhone = useRef(null);

  const [checkError, setCheckError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "id" && value !== "") {
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/signup/${value}`
      })
      .then(result => {
        if(result.data.cnt === 1){
          setCheckError('사용 불가능한 아이디입니다.')
        }else{
          setCheckError('사용 가능한 아이디입니다.')
        }
      })
      .catch();
    }
  };

  const handleReset = () => {
    setForm({ name: "", id: "", pass: "", phone: "" });
    return inputName.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //기본 html submit 방지

    //validationCheck(유효성 검사)
    if (form.name === "") {
      alert("이름을 입력해주세요");
      //focus는 html dom에서 레퍼런스하는 것이므로 사용 불가
      return inputName.current.focus(); //레퍼런스하고 있는 inputName에 포커스를 맞춘다.
    } else if (form.id === "") {
      alert("아이디를 입력해주세요");
      return inputId.current.focus();
    } else if (form.pass === "") {
      alert("비밀번호를 입력해주세요");
      return inputPass.current.focus();
    } else if (form.phone === "") {
      alert("전화번호를 입력해주세요");
      return inputPhone.current.focus();
    }

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/signup/",
      data: form, //전송하는 데이터는 항상 json타입으로 하도록 함
    })
      .then((result) => {
        if (result.data === "ok") {
          alert("회원가입이 완료되었습니다.:)");
          navigate("/login");
        }
      })
      .catch((error) => console.log(`회원가입 실패!! --> ${error}`));
  };

  return (
    <div className="signupCenter" onSubmit={handleSubmit}>
      <form id="signupForm" action="">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          ref={inputName}
        />
        <input
          type="text"
          name="id"
          id="id"
          placeholder="아이디"
          value={form.id}
          onChange={handleChange}
          ref={inputId}
        />
        <div name="checkMsg">{checkError}</div>
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="비밀번호"
          value={form.pass}
          onChange={handleChange}
          ref={inputPass}
        />
        <input
          type="phone"
          name="phone"
          id="phone"
          placeholder="전화번호"
          value={form.phone}
          onChange={handleChange}
          ref={inputPhone}
        />
        <button type="submit">회원가입</button>
        <button type="reset" onClick={handleReset}>
          다시쓰기
        </button>
      </form>
    </div>
  );
}
