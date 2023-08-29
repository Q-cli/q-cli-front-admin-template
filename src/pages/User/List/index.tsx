import { deleteUserApi, getUserListApi, saveUserApi, updateUserAPi } from '@/API/user';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.CurrentUser) => {
  const hide = message.loading('正在添加');
  try {
    await saveUserApi({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error: any) {
    console.log(error);
    hide();
    message.error(error?.message);
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.CurrentUser, item?: API.CurrentUser) => {
  const hide = message.loading('修改中');
  try {
    console.log(fields);
    await updateUserAPi({ ...fields, _id: item?._id ?? '' });
    hide();

    message.success('修改成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (_id: string, cb: () => void) => {
  const hide = message.loading('正在删除');
  try {
    await deleteUserApi(_id);
    hide();
    message.success('删除成功');
    cb();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const updateFormRef = useRef<ProFormInstance>();
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '_id',
      dataIndex: '_id',
      copyable: true,
      tip: 'The _id is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '最后修改时间',
      dataIndex: 'updateTime',
      sorter: true,
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalOpen(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title={`确定删除该用户？`}
            onConfirm={() => handleRemove(record._id, () => actionRef.current?.reload())}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CurrentUser, API.PageParams>
        headerTitle="系统人员列表"
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
            icon={<PlusOutlined />}
          >
            添加
          </Button>,
        ]}
        // 第一个参数 params 查询表单和 params 参数的结合
        // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
        request={async (params: API.PageParams, sort) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await getUserListApi({ ...params, ...(sort ?? {}) });
          return {
            data: msg.data.list,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.data.total,
          };
        }}
        pagination={{ pageSize: 10 }}
        columns={columns}
      />
      <ModalForm
        title="添加用户"
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.CurrentUser);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[{ required: true, message: '用户名必填' }]}
          width="md"
          name="username"
          label="username"
        />
        <ProFormText
          rules={[{ required: true, message: '密码必填' }]}
          width="md"
          name="password"
          label="password"
        />
      </ModalForm>
      <ModalForm
        title="修改用户"
        width="400px"
        formRef={updateFormRef}
        open={updateModalOpen}
        onOpenChange={(open) => {
          handleUpdateModalOpen(open);
          if (open) {
            if (currentRow) {
              updateFormRef.current?.setFieldsValue(currentRow);
            }
          } else {
            updateFormRef.current?.resetFields();
            setCurrentRow(undefined);
          }
        }}
        onFinish={async (value) => {
          const success = await handleUpdate(value as API.CurrentUser, currentRow);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[{ required: true, message: '用户名必填' }]}
          width="md"
          name="username"
          label="username"
        />
        <ProFormText
          rules={[{ required: true, message: '密码必填' }]}
          width="md"
          name="password"
          label="password"
        />
      </ModalForm>

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.CurrentUser>
            column={1}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?._id,
            }}
            columns={columns as ProDescriptionsItemProps<API.CurrentUser>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
