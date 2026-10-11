import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import LeaseForm from "../../features/leases/components/LeaseForm";
import {
  useCreateLease,
  useLeaseTenants,
  useLeaseUnits,
  useLeases,
  useTerminateLease,
  useUpdateLease,
} from "../../features/leases/hooks/useLeases";
import type {
  Lease,
  LeaseStatus,
} from "../../features/leases/types/lease.types";
import type {
  LeaseFormValues,
  UpdateLeaseFormValues,
} from "../../features/leases/schemas/lease.schema";

const { Title, Text } = Typography;

type StatusFilter = "ALL" | LeaseStatus;

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(value: string | number) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getLeaseStatus(lease: Lease): LeaseStatus {
  if (lease.status === "TERMINATED") {
    return "TERMINATED";
  }

  if (
    lease.status === "EXPIRED" ||
    new Date(lease.endDate).getTime() < Date.now()
  ) {
    return "EXPIRED";
  }

  return lease.status;
}

function statusColor(status: LeaseStatus) {
  switch (status) {
    case "ACTIVE":
      return "green";
    case "EXPIRED":
      return "orange";
    case "TERMINATED":
      return "red";
    default:
      return "default";
  }
}

export default function LeasesPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const { data: leases = [], isLoading, isError, error } = useLeases();
  const {
    data: tenants = [],
    isLoading: tenantsLoading,
  } = useLeaseTenants();
  const {
    data: units = [],
    isLoading: unitsLoading,
  } = useLeaseUnits();

  const createLease = useCreateLease();
  const updateLease = useUpdateLease();
  const terminateLease = useTerminateLease();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedLease, setSelectedLease] =
    useState<Lease | null>(null);
  const [detailsLease, setDetailsLease] =
    useState<Lease | null>(null);

  const [operationError, setOperationError] =
    useState<string | null>(null);

  const activeCount = leases.filter(
    (lease) => getLeaseStatus(lease) === "ACTIVE",
  ).length;

  const expiredCount = leases.filter(
    (lease) => getLeaseStatus(lease) === "EXPIRED",
  ).length;

  const terminatedCount = leases.filter(
    (lease) => getLeaseStatus(lease) === "TERMINATED",
  ).length;

  const filteredLeases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leases
      .filter((lease) => {
        const status = getLeaseStatus(lease);

        if (statusFilter !== "ALL" && status !== statusFilter) {
          return false;
        }

        if (!query) {
          return true;
        }

        const searchable = [
          String(lease.id),
          lease.tenant?.firstName,
          lease.tenant?.lastName,
          lease.tenant?.email,
          lease.unit?.unitNumber,
          lease.unit?.property?.name,
          lease.unit?.property?.address,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(query);
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );
  }, [leases, search, statusFilter]);

  const openCreateForm = () => {
    setOperationError(null);
    setSelectedLease(null);
    setFormOpen(true);
  };

  const openEditForm = (lease: Lease) => {
    setOperationError(null);
    setSelectedLease(lease);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setSelectedLease(null);
    setOperationError(null);
  };

  const handleFormSubmit = async (
    values: LeaseFormValues | UpdateLeaseFormValues,
  ) => {
    setOperationError(null);

    try {
      if (selectedLease) {
        const payload = values as UpdateLeaseFormValues;

        await updateLease.mutateAsync({
          id: selectedLease.id,
          payload,
        });

        messageApi.success("Lease updated successfully.");
      } else {
        const payload = values as LeaseFormValues;

        await createLease.mutateAsync(payload);

        messageApi.success("Lease created successfully.");
      }

      closeForm();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setOperationError(errorMessage);
      messageApi.error("Unable to save lease.");
    }
  };

  const handleTerminate = async (lease: Lease) => {
    setOperationError(null);

    try {
      await terminateLease.mutateAsync(lease.id);
      messageApi.success("Lease terminated successfully.");

      if (detailsLease?.id === lease.id) {
        setDetailsLease(null);
      }
    } catch {
      messageApi.error("Unable to terminate lease.");
    }
  };

  const columns: TableColumnsType<Lease> = [
    {
      title: "Lease",
      dataIndex: "id",
      key: "id",
      width: 90,
      render: (id: number) => (
        <Text strong>#{id}</Text>
      ),
    },
    {
      title: "Tenant",
      key: "tenant",
      render: (_, lease) => (
        <div>
          <Text strong>
            {lease.tenant
              ? `${lease.tenant.firstName} ${lease.tenant.lastName}`
              : "Unknown tenant"}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            {lease.tenant?.email ?? "—"}
          </Text>
        </div>
      ),
    },
    {
      title: "Property / Unit",
      key: "unit",
      render: (_, lease) => (
        <div>
          <Text strong>
            {lease.unit?.property?.name ?? "Unknown property"}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            {lease.unit
              ? `Unit ${lease.unit.unitNumber} · Floor ${lease.unit.floor}`
              : "—"}
          </Text>
        </div>
      ),
    },
    {
      title: "Lease Period",
      key: "period",
      render: (_, lease) => (
        <div>
          <Text>{formatDate(lease.startDate)}</Text>
          <br />
          <Text type="secondary" className="text-xs">
            to {formatDate(lease.endDate)}
          </Text>
        </div>
      ),
    },
    {
      title: "Monthly Rent",
      dataIndex: "monthlyRent",
      key: "monthlyRent",
      align: "right",
      render: (value: string | number) => (
        <Text strong>{formatMoney(value)}</Text>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, lease) => {
        const status = getLeaseStatus(lease);

        return (
          <Tag color={statusColor(status)}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 210,
      render: (_, lease) => {
        const status = getLeaseStatus(lease);

        return (
          <Space wrap size="small">
            <Button
              size="small"
              onClick={() => setDetailsLease(lease)}
            >
              View
            </Button>

            {status === "ACTIVE" && (
              <>
                <Button
                  size="small"
                  onClick={() => openEditForm(lease)}
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Terminate this lease?"
                  description="This action cannot be undone."
                  okText="Terminate"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleTerminate(lease)}
                >
                  <Button
                    size="small"
                    danger
                    loading={terminateLease.isPending}
                  >
                    Terminate
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {contextHolder}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Title level={2} className="!mb-1">
            Lease Management
          </Title>
          <Text type="secondary">
            Manage rental agreements, lease periods, and terminations.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateForm}
        >
          Create Lease
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Leases"
              value={leases.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Leases"
              value={activeCount}
              valueStyle={{ color: "#389e0d" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Expired Leases"
              value={expiredCount}
              valueStyle={{ color: "#d48806" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Terminated Leases"
              value={terminatedCount}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {isError && (
        <Alert
          type="error"
          showIcon
          message="Unable to load leases"
          description={
            error instanceof Error
              ? error.message
              : "Please check your connection and try again."
          }
        />
      )}

      {operationError && formOpen && (
        <Alert
          type="error"
          showIcon
          closable
          message="Unable to save lease"
          description={operationError}
          onClose={() => setOperationError(null)}
        />
      )}

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search by tenant, property, unit, or lease ID"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="sm:max-w-md"
          />

          <Select
            value={statusFilter}
            onChange={(value: StatusFilter) => {
              setStatusFilter(value);
              setPage(1);
            }}
            className="w-full sm:w-48"
            options={[
              { label: "All Statuses", value: "ALL" },
              { label: "Active", value: "ACTIVE" },
              { label: "Expired", value: "EXPIRED" },
              { label: "Terminated", value: "TERMINATED" },
            ]}
          />
        </div>

        <Table<Lease>
          rowKey="id"
          columns={columns}
          dataSource={filteredLeases}
          loading={isLoading}
          scroll={{ x: 1050 }}
          locale={{
            emptyText: (
              <Empty
                description={
                  search || statusFilter !== "ALL"
                    ? "No leases match your filters"
                    : "No leases found"
                }
              >
                {!search && statusFilter === "ALL" && (
                  <Button
                    type="primary"
                    onClick={openCreateForm}
                  >
                    Create your first lease
                  </Button>
                )}
              </Empty>
            ),
          }}
          pagination={{
            current: page,
            pageSize,
            total: filteredLeases.length,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            showTotal: (total) => `${total} leases`,
            onChange: (nextPage, nextPageSize) => {
              setPage(nextPage);
              setPageSize(nextPageSize);
            },
          }}
        />
      </Card>

      <Modal
        title={selectedLease ? "Edit Lease" : "Create Lease"}
        open={formOpen}
        onCancel={closeForm}
        footer={null}
        destroyOnHidden
        width={600}
      >
        <LeaseForm
          key={selectedLease?.id ?? "new"}
          lease={selectedLease}
          tenants={tenants}
          units={units}
          loadingOptions={tenantsLoading || unitsLoading}
          submitting={
            createLease.isPending || updateLease.isPending
          }
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal
        title={`Lease Details${detailsLease ? ` #${detailsLease.id}` : ""}`}
        open={Boolean(detailsLease)}
        onCancel={() => setDetailsLease(null)}
        footer={
          detailsLease &&
          getLeaseStatus(detailsLease) === "ACTIVE"
            ? [
                <Button
                  key="close"
                  onClick={() => setDetailsLease(null)}
                >
                  Close
                </Button>,
                <Button
                  key="edit"
                  type="primary"
                  onClick={() => {
                    const lease = detailsLease;
                    setDetailsLease(null);
                    openEditForm(lease);
                  }}
                >
                  Edit Lease
                </Button>,
              ]
            : [
                <Button
                  key="close"
                  onClick={() => setDetailsLease(null)}
                >
                  Close
                </Button>,
              ]
        }
        width={650}
      >
        {detailsLease && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Status">
              <Tag color={statusColor(getLeaseStatus(detailsLease))}>
                {getLeaseStatus(detailsLease)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Tenant">
              {detailsLease.tenant
                ? `${detailsLease.tenant.firstName} ${detailsLease.tenant.lastName}`
                : "Unknown tenant"}
            </Descriptions.Item>

            <Descriptions.Item label="Tenant Email">
              {detailsLease.tenant?.email ?? "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Tenant Phone">
              {detailsLease.tenant?.phone ?? "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Property">
              {detailsLease.unit?.property?.name ?? "Unknown property"}
            </Descriptions.Item>

            <Descriptions.Item label="Property Address">
              {detailsLease.unit?.property?.address ?? "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Unit">
              {detailsLease.unit
                ? `Unit ${detailsLease.unit.unitNumber}, Floor ${detailsLease.unit.floor}`
                : "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Start Date">
              {formatDate(detailsLease.startDate)}
            </Descriptions.Item>

            <Descriptions.Item label="End Date">
              {formatDate(detailsLease.endDate)}
            </Descriptions.Item>

            <Descriptions.Item label="Monthly Rent">
              {formatMoney(detailsLease.monthlyRent)}
            </Descriptions.Item>

            <Descriptions.Item label="Security Deposit">
              {formatMoney(detailsLease.deposit)}
            </Descriptions.Item>

            <Descriptions.Item label="Created At">
              {formatDate(detailsLease.createdAt)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}