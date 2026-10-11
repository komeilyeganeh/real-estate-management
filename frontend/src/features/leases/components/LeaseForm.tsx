import { useEffect } from "react";
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import {
  leaseSchema,
  updateLeaseSchema,
  type LeaseFormValues,
  type UpdateLeaseFormValues,
} from "../schemas/lease.schema";
import type {
  Lease,
  TenantOption,
  UnitOption,
} from "../types/lease.types";

interface LeaseFormProps {
  lease?: Lease | null;
  tenants: TenantOption[];
  units: UnitOption[];
  loadingOptions?: boolean;
  submitting?: boolean;
  onSubmit: (
    values: LeaseFormValues | UpdateLeaseFormValues,
  ) => void;
  onCancel: () => void;
}

function toDateInput(value?: string) {
  return value ? dayjs(value) : null;
}

export default function LeaseForm({
  lease,
  tenants,
  units,
  loadingOptions = false,
  submitting = false,
  onSubmit,
  onCancel,
}: LeaseFormProps) {
  const isEditing = Boolean(lease);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeaseFormValues>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      unitId: lease?.unitId ?? 0,
      tenantId: lease?.tenantId ?? 0,
      startDate: lease?.startDate
        ? dayjs(lease.startDate).format("YYYY-MM-DD")
        : "",
      endDate: lease?.endDate
        ? dayjs(lease.endDate).format("YYYY-MM-DD")
        : "",
      monthlyRent: String(lease?.monthlyRent ?? ""),
      deposit: String(lease?.deposit ?? ""),
    },
  });

  const selectedUnitId = watch("unitId");

  useEffect(() => {
    reset({
      unitId: lease?.unitId ?? 0,
      tenantId: lease?.tenantId ?? 0,
      startDate: lease?.startDate
        ? dayjs(lease.startDate).format("YYYY-MM-DD")
        : "",
      endDate: lease?.endDate
        ? dayjs(lease.endDate).format("YYYY-MM-DD")
        : "",
      monthlyRent: String(lease?.monthlyRent ?? ""),
      deposit: String(lease?.deposit ?? ""),
    });
  }, [lease, reset]);

  const availableUnits = units.filter(
    (unit) =>
      unit.status === "AVAILABLE" ||
      unit.id === lease?.unitId,
  );

  const selectedUnit = units.find(
    (unit) => unit.id === selectedUnitId,
  );

  function submit(values: LeaseFormValues) {
    if (isEditing) {
      const { startDate, endDate, monthlyRent, deposit } = values;

      onSubmit({
        startDate,
        endDate,
        monthlyRent,
        deposit,
      });
      return;
    }

    onSubmit(values);
  }

  return (
    <Spin spinning={loadingOptions}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(submit)}
        requiredMark="optional"
      >
        {isEditing && (
          <Alert
            type="info"
            showIcon
            message="Tenant and unit cannot be changed after creation."
            className="mb-4"
          />
        )}

        {!isEditing && (
          <>
            <Form.Item
              label="Tenant"
              validateStatus={errors.tenantId ? "error" : ""}
              help={errors.tenantId?.message}
            >
              <Controller
                name="tenantId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || undefined}
                    placeholder="Select a tenant"
                    showSearch
                    optionFilterProp="label"
                    options={tenants.map((tenant) => ({
                      value: tenant.id,
                      label: `${tenant.firstName} ${tenant.lastName} (${tenant.email})`,
                    }))}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Unit"
              validateStatus={errors.unitId ? "error" : ""}
              help={errors.unitId?.message}
            >
              <Controller
                name="unitId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || undefined}
                    placeholder="Select an available unit"
                    showSearch
                    optionFilterProp="label"
                    options={availableUnits.map((unit) => ({
                      value: unit.id,
                      label: `Unit ${unit.unitNumber} — ${
                        unit.property?.name ?? "Property"
                      }`,
                    }))}
                    onChange={(value) => {
                      field.onChange(value);

                      const unit = units.find(
                        (item) => item.id === value,
                      );

                      if (unit) {
                        setValue(
                          "monthlyRent",
                          String(unit.monthlyRent),
                        );
                      }
                    }}
                  />
                )}
              />
            </Form.Item>

            {selectedUnit && (
              <Alert
                type="info"
                showIcon
                className="mb-4"
                message={`Floor ${selectedUnit.floor} · ${selectedUnit.bedrooms} bedrooms`}
                description={
                  selectedUnit.property?.address ??
                  "Property address unavailable"
                }
              />
            )}
          </>
        )}

        <Form.Item
          label="Start Date"
          validateStatus={errors.startDate ? "error" : ""}
          help={errors.startDate?.message}
        >
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                value={toDateInput(field.value)}
                format="YYYY-MM-DD"
                placeholder="Select start date"
                onChange={(date) =>
                  field.onChange(
                    date ? date.format("YYYY-MM-DD") : "",
                  )
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          validateStatus={errors.endDate ? "error" : ""}
          help={errors.endDate?.message}
        >
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                value={toDateInput(field.value)}
                format="YYYY-MM-DD"
                placeholder="Select end date"
                onChange={(date) =>
                  field.onChange(
                    date ? date.format("YYYY-MM-DD") : "",
                  )
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Monthly Rent"
          validateStatus={errors.monthlyRent ? "error" : ""}
          help={errors.monthlyRent?.message}
        >
          <Controller
            name="monthlyRent"
            control={control}
            render={({ field }) => (
              <InputNumber
                className="w-full"
                min={0}
                precision={2}
                placeholder="Enter monthly rent"
                value={
                  field.value === "" ? null : Number(field.value)
                }
                onChange={(value) =>
                  field.onChange(
                    value === null ? "" : String(value),
                  )
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Security Deposit"
          validateStatus={errors.deposit ? "error" : ""}
          help={errors.deposit?.message}
        >
          <Controller
            name="deposit"
            control={control}
            render={({ field }) => (
              <InputNumber
                className="w-full"
                min={0}
                precision={2}
                placeholder="Enter security deposit"
                value={
                  field.value === "" ? null : Number(field.value)
                }
                onChange={(value) =>
                  field.onChange(
                    value === null ? "" : String(value),
                  )
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={onCancel} disabled={submitting}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              {isEditing ? "Save Changes" : "Create Lease"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}