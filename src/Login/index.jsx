import { Button, Card, Form, Input } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authCtx } from "../context/authContext";
function Login() {
  const { login } = useContext(authCtx);
  const [isDisabled, setIsDisabled] = useState(false);
  const [offset, setOffset] = useState(8);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.innerWidth < 576 ? setOffset(0) : setOffset(8);
  }, [window.width]);

  window.addEventListener("resize", () =>
    window.innerWidth < 576 ? setOffset(0) : setOffset(8)
  );
  function onFinish(values) {
    setIsDisabled(true);
    //fake login
    //username: eve.holt@reqres.in  //password: cityslicka
    fetch("https://reqres.in/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsDisabled(false);
        if (json.token) {
          navigate("/add-user");
          login(json.token, values.username);
          localStorage.setItem("username", values.username);
          localStorage.setItem("token", json.token);
        }
      });
  }
  return (
    <div className="backgroundImg">
      <Card className="card" bordered={false}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="نام کاربری"
            name="username"
            rules={[{ required: true, message: "پر نمودن فیلد بالا الزامیست" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="رمز عبور"
            name="password"
            rules={[{ required: true, message: "پر نمودن فیلد بالا الزامیست" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: offset }}
            style={{ margin: 0 }}
            // style={{}}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", justifyContent: "end" }}
              disabled={isDisabled}
            >
              ورود
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
