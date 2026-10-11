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

import type {
  ColumnsType,
  TablePaginationConfig,
} from "antd/es/table";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  useDeleteUnit,
  useUnits,
} from "../../features/units/hooks/useUnits";

import UnitForm from "../../features/units/components/UnitForm";

import type {
  Unit,
  UnitStatus,
} from "../../features/units/types/unit.types";

const { Title, Text } = Typography;

const statusConfig: Record<
  UnitStatus,
  { label: string; color: string }
> = {
  AVAILABLE: {
    label: "Available",
    color: "green",
  },
  RENTED: {
    label: "Rented",
    color: "blue",
  },
  MAINTENANCE: {
    label: "Maintenance",
    color: "orange",
  },
};

export default function UnitsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const deleteMutation = useDeleteUnit();

  const {
    data,
    isPending,
    isError,
    refetch,
  } = useUnits({
    page,
    limit,
    search: search || undefined,
  });

  const openCreateForm = () => {
    setSelectedUnit(null);
    setFormOpen(true);
  };

  const openEditForm = (unit: Unit) => {
    setSelectedUnit(unit);
    setFormOpen(true);
  };

  const handleDelete = (unit: Unit) => {
    Modal.confirm({
      title: "Delete Unit",
      content: `Are you sure you want to delete unit "${unit.unitNumber}"?`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
        loading: deleteMutation.isPending,
      },
      onOk: async () => {
        try {
          await deleteMutation.mutateAsync(unit.id);
          messageApi.success("Unit deleted successfully.");
        } catch {
          messageApi.error(
            "Failed to delete unit. It may have associated leases.",
          );
        }
      },
    });
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.pageSize && pagination.pageSize !== limit) {
      setLimit(pagination.pageSize);
      setPage(1);
      return;
    }

    if (pagination.current) {
      setPage(pagination.current);
    }
  };

  const columns: ColumnsType<Unit> = [
    {
      title: "Unit Number",
      dataIndex: "unitNumber",
      key: "unitNumber",
      render: (unitNumber: string) => (
        <Text strong className="text-slate-800">
          {unitNumber}
        </Text>
      ),
    },
    {
      title: "Property",
      key: "property",
      render: (_, unit) => (
        <div>
          <Text strong>{unit.property?.name ?? "Unknown Property"}</Text>
          {unit.property?.address && (
            <div>
              <Text type="secondary" className="text-xs">
                {unit.property.address}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
      align: "center",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      align: "right",
      render: (area: string | number) => `${Number(area).toLocaleString()} m²`,
    },
    {
      title: "Bedrooms",
      dataIndex: "bedrooms",
      key: "bedrooms",
      align: "center",
    },
    {
      title: "Monthly Rent",
      dataIndex: "monthlyRent",
      key: "monthlyRent",
      align: "right",
      render: (rent: string | number) =>
        Number(rent).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: UnitStatus) => {
        const config = statusConfig[status];

        return (
          <Tag color={config?.color ?? "default"}>
            {config?.label ?? status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, unit) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditForm(unit)}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(unit)}
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
            Units Management
          </Title>

          <Text type="secondary">
            View, search, and manage property units.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateForm}
          size="large"
        >
          Add Unit
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onPressEnter={handleSearch}
            placeholder="Search by unit number or floor..."
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
              Failed to load units.
            </Text>

            <div className="mt-3">
              <Button onClick={() => void refetch()}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <Table<Unit>
            rowKey="id"
            columns={columns}
            dataSource={data?.data ?? []}
            loading={isPending}
            onChange={handleTableChange}
            scroll={{ x: 1100 }}
            pagination={{
              current: page,
              pageSize: limit,
              total: data?.meta.total ?? 0,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100],
              showTotal: (total) => `${total} units in total`,
            }}
            locale={{
              emptyText: "No units found",
            }}
          />
        )}
      </div>

      <UnitForm
        open={formOpen}
        unit={selectedUnit}
        onClose={() => {
          setFormOpen(false);
          setSelectedUnit(null);
        }}
      />
    </div>
  );
}