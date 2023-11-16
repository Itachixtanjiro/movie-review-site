import React,{useEffect} from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apis/users";
import { antValidationerror } from "../../helpers";
import { useDispatch } from "react-redux";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if( localStorage.getItem("token")){
        navigate("/"); 
    }
  },[]);
  const onFinish = async (value) => {
    console.log(navigate);
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser(value);
      dispatch(SetLoading(false));
      message.success(response.success);
      navigate("/login");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  return (
    <div className="grid grid-cols-2 h-screen bg-secondary">
      <div className="bg-primary flex flex-col items-center justify-center">
        <div>
          <h1 className="text-6xl text-orange-700">OUR MOVIE PALACE</h1>
          <span className="text-md text-white">
            One step solution to all your movie cravings
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="W-[400px]">
          <h1 className="text-2xl my-5">Register your account</h1>
          <hr />

          <hr />
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
          >
            <Form.Item label="Name" name="name" initialValue={""} rules={antValidationerror}>
              <input />
            </Form.Item>
            <Form.Item label="Email" name="email"initialValue={""} rules={antValidationerror}>
              <input />
            </Form.Item>
            <Form.Item label="Password" name="password"initialValue={""} rules={antValidationerror}>
              <input type="password" />
            </Form.Item>
            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
              <Link to="/login">If u already have an account ,Login here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
