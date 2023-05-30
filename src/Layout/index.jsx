import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { authCtx } from "../authContext";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("افزودن مخاطب", "add-user", <UserAddOutlined />),
  getItem("مخاطبین", "contacts", <UserOutlined />),
];

function LayoutPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const pathname = window.location.pathname.split("/");
  const { logout } = useContext(authCtx);
  let username = localStorage.getItem("username");
  
  useEffect(()=>{
    window.innerWidth < 900 ? setCollapsed(true) : setCollapsed(false)
  },[window.innerWidth])
  
  function handleLogout() {
    logout();
    navigate("/login");
  }

  window.addEventListener("resize", () =>
    window.innerWidth < 900 ? setCollapsed(true) : setCollapsed(false)
  );

  function handleNavigate(e) {
    navigate(e.key);
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        reverseArrow="true"
        style={{ backgroundColor: "#0E0E23" }}
      >
        <div className="title"><span>دفترچه تلفن</span></div>
        <Menu
          onClick={handleNavigate}
          theme="dark"
          style={{ backgroundColor: "#0E0E23" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          selectedKeys={pathname[1]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <Space split={<Divider type="vertical" />}>
            <span>{username}</span>
            <Button onClick={handleLogout} danger>
              خروج
            </Button>
          </Space>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div className="mainDiv">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutPanel;
