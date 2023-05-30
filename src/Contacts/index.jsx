import { Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  StarOutlined,
  StarFilled,
  DeleteFilled,
  EditFilled,
  SearchOutlined,
} from "@ant-design/icons";
import "./Contacts.css";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            جست و جو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            پاک کردن
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  function handleChangeFav(obj) {
    for (let user of users) {
      if (user.id == obj.id) {
        if (user.favorite) {
          user.favorite = false;
        } else {
          user.favorite = true;
        }
        break;
      }
    }
    setUsers(users);
    localStorage.setItem("users", JSON.stringify(users));
    setUsers(JSON.parse(localStorage.getItem("users")));
  }

  function handleDelete(id) {
    for (let i = 0; i < users.length; i++) {
      if (id == users[i].id) {
        users.splice(i, 1);
        break;
      }
    }
    setUsers(users);
    localStorage.setItem("users", JSON.stringify(users));
    setUsers(JSON.parse(localStorage.getItem("users")));
  }

  const columns = [
    {
      title: "مورد علاقه",
      dataIndex: "favorite",
      key: "favorite",
      key2: "id",
      render: (index, key2) =>
        index ? (
          <StarFilled
            className="favIcon"
            onClick={() => handleChangeFav(key2)}
          />
        ) : (
          <StarOutlined
            className="favIcon"
            onClick={() => handleChangeFav(key2)}
          />
        ),
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
      onFilter: (value, record) => record.family.startsWith(value),
      ...getColumnSearchProps("family"),
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
      render: (i) => <a href={`tel:${i}`}>{i}</a>,
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      render: (i) => <a href={`mailto:${i}`}>{i}</a>,
    },
    {
      title: "جنسیت",
      dataIndex: "gender",
      key: "gender",
      render: (i) => (i === "male" ? "مذکر" : "مونث"),
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "عملیات",
      key: "action",
      dataIndex: "id",
      render: (i) => (
        <span className="action">
          <DeleteFilled
            className="deleteIcon"
            onClick={() => handleDelete(i)}
          />
          <EditFilled
            className="editIcon"
            onClick={() => navigate(`/edit-user/${i}`, { replace: true })}
          />
        </span>
      ),
    },
  ];
  return (
    <Table
      pagination={{
        position: ["bottomCenter"],
      }}
      style={{ overflowX: "auto" }}
      dataSource={users.sort(function (a, b) {
        return b.favorite - a.favorite;
      })}
      columns={columns}
      rowKey={columns.key}
    />
  );
}

export default Contacts;
