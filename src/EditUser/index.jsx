import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

function EditUser() {
  const [defaultUser, setDefaultUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    setIsLoading(false);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        setDefaultUser({
          defName: users[i].name,
          defFamily: users[i].family,
          defPhoneNumber: users[i].phoneNumber,
          defEmail: users[i].email,
          defAge: users[i].age,
          defGender: users[i].gender,
          defAddress: users[i].address,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = (values) => {
    for (let user of users) {
      if (user.id == id) {
        user.name = values.name;
        user.family = values.family;
        user.phoneNumber = values.phoneNumber;
        user.email = values.email;
        user.age = values.age;
        user.gender = values.gender;
        user.address = values.address;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/contacts", { replace: true });
  };
  if (isLoading) {
    return <Loading />;
  }
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
            initialValue={defaultUser.defName}
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
            initialValue={defaultUser.defFamily}
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
            initialValue={defaultUser.defPhoneNumber}
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
            initialValue={defaultUser.defEmail}
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
          <Form.Item label="سن" name="age" initialValue={defaultUser.defAge}>
            <InputNumber min={1} max={100} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="gender"
            label="جنسیت"
            initialValue={defaultUser.defGender}
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
          <Form.Item
            label="آدرس"
            name="address"
            initialValue={defaultUser.defAddress}
          >
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

export default EditUser;
