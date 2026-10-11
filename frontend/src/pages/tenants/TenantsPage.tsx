import { useMemo, useState } from "react";

import {
  Avatar,
  Button,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import type {
  ColumnsType,
  TablePaginationConfig,
} from "antd/es/table";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  useDeleteTenant,
  useTenants,
} from "../../features/tenants/hooks/useTenants";

import TenantForm from "../../features/tenants/components/TenantForm";

import type { Tenant } from "../../features/tenants/types/tenant.types";

const { Title, Text } = Typography;

export default function TenantsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] =
    useState<Tenant | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const deleteMutation = useDeleteTenant();

  const {
    data: tenants,
    isPending,
    isError,
    refetch,
  } = useTenants();

  const filteredTenants = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return (tenants ?? []).filter((tenant) => {
      const fullName =
        `${tenant.firstName} ${tenant.lastName}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        tenant.firstName.toLowerCase().includes(normalizedSearch) ||
        tenant.lastName.toLowerCase().includes(normalizedSearch) ||
        tenant.email.toLowerCase().includes(normalizedSearch) ||
        tenant.phone.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [tenants, search]);

  const openCreateForm = () => {
    setSelectedTenant(null);
    setFormOpen(true);
  };

  const openEditForm = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setFormOpen(true);
  };

  const handleDelete = (tenant: Tenant) => {
    Modal.confirm({
      title: "Delete Tenant",
      content: `Are you sure you want to delete "${tenant.firstName} ${tenant.lastName}"?`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          await deleteMutation.mutateAsync(tenant.id);

          messageApi.success("Tenant deleted successfully.");
        } catch {
          messageApi.error(
            "Failed to delete tenant. Check whether this tenant has associated leases.",
          );
        }
      },
    });
  };

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (
      pagination.pageSize &&
      pagination.pageSize !== pageSize
    ) {
      setPageSize(pagination.pageSize);
      setPage(1);
      return;
    }

    if (pagination.current) {
      setPage(pagination.current);
    }
  };

  const columns: ColumnsType<Tenant> = [
    {
      title: "Tenant",
      key: "tenant",
      render: (_, tenant) => (
        <Space>
          <Avatar
            icon={<UserOutlined />}
            className="bg-blue-100 text-blue-600"
          />

          <div>
            <Text strong className="text-slate-800">
              {tenant.firstName} {tenant.lastName}
            </Text>

            <div>
              <Text type="secondary" className="text-xs">
                ID: #{tenant.id}
              </Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <a href={`mailto:${email}`} className="text-blue-600">
          {email}
        </a>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => (
        <a href={`tel:${phone}`} className="text-slate-700">
          {phone}
        </a>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: () => (
        <Tag color="blue">
          Registered
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, tenant) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditForm(tenant)}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(tenant)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {contextHolder}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Title level={2} className="!mb-1">
            Tenant Management
          </Title>

          <Text type="secondary">
            View, search, and manage registered tenants.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateForm}
          size="large"
        >
          Add Tenant
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            allowClear
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onPressEnter={handleSearch}
            onClear={() => {
              setSearchInput("");
              setSearch("");
              setPage(1);
            }}
            placeholder="Search by name, email, or phone..."
            prefix={<SearchOutlined className="text-slate-400" />}
            className="sm:max-w-md"
          />

          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>

        {isError ? (
          <div className="py-10 text-center">
            <Text type="danger">
              Failed to load tenants.
            </Text>

            <div className="mt-3">
              <Button onClick={() => void refetch()}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <Table<Tenant>
            rowKey="id"
            columns={columns}
            dataSource={filteredTenants}
            loading={isPending}
            onChange={handleTableChange}
            scroll={{ x: 900 }}
            pagination={{
              current: page,
              pageSize,
              total: filteredTenants.length,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100],
              showTotal: (total) => `${total} tenants in total`,
            }}
            locale={{
              emptyText: "No tenants found",
            }}
          />
        )}
      </div>

      <TenantForm
        open={formOpen}
        tenant={selectedTenant}
        onClose={() => {
          setFormOpen(false);
          setSelectedTenant(null);
        }}
      />
    </div>
  );
}
