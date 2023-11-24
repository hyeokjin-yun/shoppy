import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as cookie from "../util/cookie.js";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const inputId = useRef(null);
  const inputPass = useRef(null);

  const [form, setForm] = useState({ id: "", pass: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === "") {
      alert("아이디를 입력해주세요");
      return inputId.current.focus();
    } else if (form.pass === "") {
      alert("비밀번호를 입력해주세요");
      return inputPass.current.focus();
    }

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/login/",
      data: form,
    })
      .then((result) => {
        if (result.data.login_result) {
          alert("로그인에 성공했습니다");

          //토큰에 쿠키 추가
          cookie.setCookie("x-auth-jwt", result.data.token);

          //토큰에 추가된 id 추출(토큰 디코딩: jwt-decode) 후 로컬스토리지에 저장
          const userInfo = jwtDecode(result.data.token);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          //쿠키에 저장된 sproduct 값 체크 후 이동
          const sproduct = cookie.getCookie("sproduct");
          if ((sproduct === undefined)) {
            navigate("/");
          }else{
            navigate(sproduct);
          }
        } else {
          if (result.data.cnt === 1) {
            alert("잘못된 비밀번호입니다. 다시 확인하세요");
            setForm({ ...form, pass: "" });
            return inputPass.current.focus();
          } else {
            alert("잘못된 아이디입니다. 다시 확인하세요");
            setForm({ ...form, id: "" });
            return inputId.current.focus();
          }
        }
      })
      .catch();
  };

  return (
    <div className="loginCenter" onSubmit={handleSubmit}>
      <form id="loginForm" action="">
        <input
          type="text"
          name="id"
          id="id"
          placeholder="아이디"
          value={form.id}
          onChange={handleChange}
          ref={inputId}
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="비밀번호"
          value={form.pass}
          onChange={handleChange}
          ref={inputPass}
        />
        <button type="submit">로그인</button>
        <div id="loginSubMenu">
          <button>아이디/패스워드 찾기</button>
          <Link to="/signup">
            {" "}
            <button>회원가입</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
