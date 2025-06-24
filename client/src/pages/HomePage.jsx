import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analyics from '../components/Analyics';

const { RangePicker } = DatePicker;

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'refernce',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <div className="flex gap-3">
          <EditOutlined
  style={{ fontSize: '20px', color: '#1890ff', cursor: 'pointer', marginRight: '10px' }}
  onClick={() => {
    setEditable(record);
    setShowModal(true);
  }}
/>

<DeleteOutlined
  style={{ fontSize: '20px', color: '#ff4d4f', cursor: 'pointer' }}
  onClick={() => handleDelete(record)}
/>

        </div>
      )
    }
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/get-transaction`, {
        userId: user._id,
        frequency,
        ...(frequency === 'custom' && { selectedDate }),
        type
      });
      setAllTransactions(res.data);
    } catch (error) {
      message.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/delete-transaction`, {
        transactionId: record._id
      });
      message.success("Transaction deleted");
      getAllTransactions();
    } catch (error) {
      message.error("Unable to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      if (editable) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/edit-transaction`, {
          payload: { ...value, userId: user._id },
          transactionId: editable._id
        });
        message.success('Transaction updated');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/add-transaction`, {
          ...value, userId: user._id
        });
        message.success('Transaction added');
      }

      setShowModal(false);
      setEditable(null);
      getAllTransactions();
    } catch (error) {
      message.error('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      {/* Filter Section */}
      <div className="filter-section mb-4 p-4 bg-white shadow rounded d-flex justify-content-between align-items-center flex-wrap gap-4">
        <div>
          <label className="fw-semibold">Select Frequency</label>
          <Select value={frequency} onChange={setFrequency} className="ms-2 w-100">
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (
            <RangePicker
              format="YYYY-MM-DD"
              onChange={(values) => setSelectedDate(values?.map(v => v.format("YYYY-MM-DD")))}
              className="mt-2"
            />
          )}
        </div>

        <div>
          <label className="fw-semibold">Select Type</label>
          <Select value={type} onChange={setType} className="ms-2 w-100">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div className="d-flex align-items-center gap-2 view-toggle">
          <UnorderedListOutlined
            className={`icon-btn ${viewData === 'table' ? 'active-icon' : ''}`}
            onClick={() => setViewData('table')}
          />
          <AreaChartOutlined
            className={`icon-btn ${viewData === 'analytics' ? 'active-icon' : ''}`}
            onClick={() => setViewData('analytics')}
          />
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Transaction</button>
      </div>

      {/* Data Section */}
      <div className="bg-white shadow rounded p-3">
        {viewData === 'table' ? (
          <Table
            columns={columns}
            dataSource={allTransactions}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 8 }}
          />
        ) : (
          <Analyics allTransactions={allTransactions} />
        )}
      </div>

      {/* Modal */}
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => { setShowModal(false); setEditable(null); }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...editable,
            date: editable ? moment(editable.date).format('YYYY-MM-DD') : null
          }}
        >
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select placeholder="Select category">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medicine">Medicine</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="refernce">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="desciption">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Save Transaction
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default HomePage;
