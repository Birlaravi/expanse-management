import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
//css include
import "../css/homepage.css";

import { Modal, Form, Input, Select, message, DatePicker } from "antd";
// import TextArea from "antd/es/input/TextArea";
import { UnorderedListOutlined, PieChartOutlined } from "@ant-design/icons";
import axios from "axios";
import { Spin } from "antd";
import ShowExpanse from "../../components/layout/ShowExpanse";
import ShowChart from "../../components/layout/ShowChart";
function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [getAllExpanse, setAllExpanse] = useState([]);
  const [searchBytime, SetSearchBytime] = useState("7");
  const [ByType, setByType] = useState("All");
  const [selectedTime, setselectedTime] = useState([]);
  const [Table, setTable] = useState(true);
  const [Chart, setChart] = useState(false);
  const [edit, setedit] = useState(null);
  const { RangePicker } = DatePicker;
  const [count, setcount] = useState(getAllExpanse.length);

  const onEdit = (record) => {
    setIsModalOpen(true);
    setedit(record);
  };
  const deleteHandler = async (_id) => {
    try {
      setloading(true);
      await axios.post("/api/v1/transactions/delete-transaction", { _id });
      setloading(false);
      message.success(" Transaction successfully deleted");
      setcount(count-1);
    } catch (error) {
      setloading(false);
      message.error("something wrong");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setedit(false);
  };

  const formSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if (edit) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: edit._id,
        });
        message.success("transaction Edit succesfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("transaction added succesfully");
        setcount(count+1);
      }
      setloading(false);
      setIsModalOpen(false);
      setedit(null);
      
    } catch (error) {
      setloading(false);
      message.error("add transaction is failed");
    }
  };

  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem("user"));
    axios
      .post("/api/v1/transactions/get-transaction", {
        userid: userid._id,
        searchBytime,
        ByType,
        selectedTime,
      })
      .then((res) => {
        setAllExpanse(res.data);
      })
      .catch((error) => {
        message.error("something went wrong");
      });
  }, [searchBytime, ByType, selectedTime,count]);

  return (
    <Layout>
      {loading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      <div
        className="con"
        style={{
          margin: "18px",
          padding: "8px",
          boxShadow: "4px 2px 20px 0px darkgrey",
          borderRadius: "5px",
        }}
      >
        <div className="d-flex justify-content-between m-2">
          <Select
            value={searchBytime}
            onChange={(values) => SetSearchBytime(values)}
            style={{ width: "100px" }}
          >
            <Select.Option value="7">1 week</Select.Option>
            <Select.Option value="30">1 month</Select.Option>
            <Select.Option value="365">1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {searchBytime === "custom" && (
            <RangePicker
              value={selectedTime}
              onChange={(values) => {
                setselectedTime(values);
              }}
            />
          )}
          <Select
            value={ByType}
            onChange={(values) => setByType(values)}
            style={{ width: "100px" }}
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>

          <div className="icon-conatiner">
            <span className={`${Table ? "icon-Active" : "icon-Not-Active"}`}>
              <UnorderedListOutlined
                onClick={() => {
                  setTable(true);
                  setChart(false);
                }}
              />
            </span>
            <span className={`${Chart ? "icon-Active" : "icon-Not-Active"}`}>
              <PieChartOutlined
                onClick={() => {
                  setTable(false);
                  setChart(true);
                }}
              />
            </span>
          </div>

          <button className="btn btn-primary" onClick={showModal}>
            Add expense
          </button>
        </div>
        <Modal
          title={`${edit ? "Edit Expanse" : "Add Expanse"}`}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form layout="vertical" onFinish={formSubmit} initialValues={edit}>
            <Form.Item label="amount" name="amount">
              <Input />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="Income">Income</Select.Option>
                <Select.Option value="Expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="category" name="category">
              <Select>
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Medical">Medical</Select.Option>
                <Select.Option value="Fees">Fees</Select.Option>
                <Select.Option value="Bills">Bills</Select.Option>
                <Select.Option value="Travel">Travel</Select.Option>
                <Select.Option value="Movies Ticket">
                  Movies Ticket
                </Select.Option>
                <Select.Option value="others">others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="reference" name="reference">
              <Input type="text" />
            </Form.Item>
            {/* <Form.Item label="description" name="description">
              <TextArea
                placeholder="description ..."
                autoSize={{ minRows: 3, maxRows: 5 }}
              ></TextArea>
            </Form.Item> */}
            <Form.Item label="date" name="date">
              <Input type="date" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Add expense
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      {Table ? (
        <ShowExpanse
          expanseData={getAllExpanse}
          Type={ByType}
          onDelete={deleteHandler}
          onEdit={onEdit}
        />
      ) : (
        <ShowChart expanseData={getAllExpanse} />
      )}
    </Layout>
  );
}

export default HomePage;
