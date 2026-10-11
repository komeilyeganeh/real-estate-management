import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  useDeleteProperty,
  useProperties,
} from "../../features/properties/hooks/useProperties";

import PropertyForm from "../../features/properties/components/PropertyForm";

import type { Property } from "../../features/properties/types/property.types";

const { Title, Text } = Typography;

export default function PropertiesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const deleteMutation = useDeleteProperty();

  const { data, isPending, isError, refetch } = useProperties({
    page,
    limit,
    search: search || undefined,
  });

  const openCreateForm = () => {
    setSelectedProperty(null);
    setFormOpen(true);
  };

  const openEditForm = (property: Property) => {
    setSelectedProperty(property);
    setFormOpen(true);
  };

  const handleDelete = (property: Property) => {
    Modal.confirm({
      title: "Delete Property",
      content: `Are you sure you want to delete "${property.name}"?`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
        loading: deleteMutation.isPending,
      },
      onOk: async () => {
        try {
          await deleteMutation.mutateAsync(property.id);
          messageApi.success("Property deleted successfully.");
        } catch {
          messageApi.error("Failed to delete property.");
        }
      },
    });
  };

  const handleSearch = () => {
    const trimmedSearch = searchInput.trim();

    setPage(1);
    setSearch(trimmedSearch);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const nextPageSize = pagination.pageSize;
    const nextPage = pagination.current;

    if (nextPageSize && nextPageSize !== limit) {
      setLimit(nextPageSize);
      setPage(1);
      return;
    }

    if (nextPage) {
      setPage(nextPage);
    }
  };

  const columns: ColumnsType<Property> = [
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Text strong className="text-slate-800">
          {name}
        </Text>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string | null) =>
        description || (
          <Text type="secondary">No description</Text>
        ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => <Tag color="blue">#{id}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, property) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditForm(property)}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(property)}
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
            Properties
          </Title>

          <Text type="secondary">
            View, search, and manage your registered properties.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateForm}
          size="large"
        >
          Add Property
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onPressEnter={handleSearch}
            placeholder="Search by property name or address..."
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
              Failed to load properties.
            </Text>

            <div className="mt-3">
              <Button onClick={() => void refetch()}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <Table<Property>
            rowKey="id"
            columns={columns}
            dataSource={data?.data ?? []}
            loading={isPending}
            onChange={handleTableChange}
            scroll={{ x: 850 }}
            pagination={{
              current: page,
              pageSize: limit,
              total: data?.meta.total ?? 0,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100],
              showTotal: (total) => `${total} properties in total`,
            }}
            locale={{
              emptyText: "No properties found",
            }}
          />
        )}
      </div>

      <PropertyForm
        open={formOpen}
        property={selectedProperty}
        onClose={() => {
          setFormOpen(false);
          setSelectedProperty(null);
        }}
      />
    </div>
  );
}
