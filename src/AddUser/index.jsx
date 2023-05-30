import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const user = {
      id: users[0] ? Number(users[0].id) + 1 : 1,
      favorite: false,
      name: values.name,
      family: values.family,
      phoneNumber: values.phoneNumber,
      email: values.email,
      age: values.age,
      gender: values.gender,
      address: values.address,
    };
    users.unshift(user);
    localStorage.setItem("users", JSON.stringify(users));
    form.resetFields();
    navigate("/contacts", { replace: true });
  };

  useEffect(() => {
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      return;
    }
  }, []);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row justify={"space-around"}>
        <Col span={8}>
          <Form.Item
            label="نام"
            name="name"
            rules={[
              { required: true, message: "فیلد نام الزامی است" },
              {
                pattern: new RegExp(/^[\u0600-\u06FF\s]+$/),
                message: "لطفا حروف فارسی را جهت پر نمودن فیلد انتخاب نمایید",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="نام خانوادگی"
            name="family"
            rules={[
              { required: true, message: "فیلد نام خانوادگی الزامی است" },
              {
                pattern: new RegExp(/^[\u0600-\u06FF\s]+$/),
                message: "لطفا حروف فارسی را جهت پر نمودن فیلد انتخاب نمایید",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"space-around"}>
        <Col span={8}>
          <Form.Item
            label="شماره تلفن"
            name="phoneNumber"
            rules={[
              { required: true, message: "فیلد شماره تلفن الزامی است" },
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: "فرمت فیلد عددی است",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              { required: true, message: "فیلد  الزامی است" },
              { type: "email", message: "فرمت فیلد ایمیل صحیح نمیباشد" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"space-around"}>
        <Col span={8}>
          <Form.Item
            label="سن"
            name="age"
            rules={[
              {
                pattern: new RegExp(/^[1-9][0-9]?$|^100$/),
                message: "سن وارد شده صحیح نمیاشد",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="gender"
            label="جنسیت"
            rules={[{ required: true, message: "انتخاب جنسیت الزامی است" }]}
          >
            <Radio.Group>
              <Radio value="male">مذکر</Radio>
              <Radio value="female">مونث</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"space-around"}>
        <Col span={8}>
          <Form.Item label="آدرس" name="address">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              ثبت
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default AddUser;
