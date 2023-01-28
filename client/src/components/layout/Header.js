import { message,Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const logouthandle = () => {
    localStorage.removeItem("user");
    message.success("logout Succcessfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Expanse Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginTop:'9px'}}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/homepage"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link" style={{color:'green'}}>
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                    marginRight:'5px'
                  }}
                  icon={<UserOutlined />}
                />
                {JSON.parse(localStorage.getItem("user")).name}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-primary mx-3"
                  onClick={logouthandle}
                >
                  Logout
                </button>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
