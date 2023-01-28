import React, { useEffect , useState } from "react";
import "../css/register.css";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setloading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Register Successful");
      navigate("/login");
      setloading(false);
    } catch (error) {
      message.error("somenthing went wrong");
      setloading(false);
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
        <h1>Register Form</h1>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email  " />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex flex-column">
          <button className="btn btn-primary">Submit</button>
          <br />
          <Link to="/login">Already Register? click here to login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
