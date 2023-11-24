import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { getUser, removeUser } from "../util/localStorage";

export default function Navbar() {
  const navigate = useNavigate();
  const userInfo = getUser();

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    removeUser();
    navigate("/");
  };

  return (
    <header>
      <h1>
        <Link to="/">
          <FiShoppingBag />
          Shoppy
        </Link>
      </h1>
      <div className="navMenu">
        {userInfo ? (
          <>
            <span>[{userInfo.id}] 님! 반갑습니다</span>
            <Link to="/products">Products</Link>
            <Link to="/carts">Cart</Link>
            <Link to="/order">Order</Link>
            <Link to="/products/new">
              <BsFillPencilFill />
            </Link>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/products">Products</Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}

        {/* <Link to="/products">Products</Link>
        <Link to="/products/new">
          <BsFillPencilFill />
        </Link>
        <Link to="/carts">Cart</Link>
        <Link to="/login">
          <button>Login</button>
        </Link> */}
      </div>
    </header>
  );
}
