import React, { useState, useEffect } from "react";
import "../css/login.css";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
const Login = () => {
  const [Loading, setloading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setloading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setloading(false);
      message.error("Somenthing went wrong");
    }
  };
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className={"form-Controller"}>
      {Loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Login Form</h1>
        <Form.Item label="Email" name="email">
          <Input type="email  " />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex flex-column">
          <button className="btn btn-primary">Submit</button>
          <br />
          <Link to="/register">Not Register? click here to Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
