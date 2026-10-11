import { useEffect } from "react";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
} from "antd";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProperties } from "../../properties/hooks/useProperties";

import {
  useCreateUnit,
  useUpdateUnit,
} from "../hooks/useUnits";

import {
  unitSchema,
  type UnitFormValues,
} from "../schemas/unit.schema";

import type { Unit } from "../types/unit.types";

interface UnitFormProps {
  open: boolean;
  unit: Unit | null;
  onClose: () => void;
}

export default function UnitForm({
  open,
  unit,
  onClose,
}: UnitFormProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const createMutation = useCreateUnit();
  const updateMutation = useUpdateUnit();

  const isEditing = Boolean(unit);

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unitNumber: "",
      floor: 0,
      area: 0,
      bedrooms: 1,
      monthlyRent: 0,
      propertyId: 0,
    },
  });

  const { data: propertiesData, isPending: propertiesLoading } =
    useProperties({
      page: 1,
      limit: 100,
    });

  useEffect(() => {
    if (open) {
      reset({
        unitNumber: unit?.unitNumber ?? "",
        floor: unit?.floor ?? 0,
        area: Number(unit?.area ?? 0),
        bedrooms: unit?.bedrooms ?? 1,
        monthlyRent: Number(unit?.monthlyRent ?? 0),
        propertyId: unit?.propertyId ?? 0,
      });
    }
  }, [open, unit, reset]);

  const onSubmit = async (values: UnitFormValues) => {
    try {
      if (unit) {
        await updateMutation.mutateAsync({
          id: unit.id,
          payload: {
            unitNumber: values.unitNumber,
            floor: values.floor,
            area: String(values.area),
            bedrooms: values.bedrooms,
            monthlyRent: String(values.monthlyRent),
          },
        });

        messageApi.success("Unit updated successfully.");
      } else {
        await createMutation.mutateAsync({
          unitNumber: values.unitNumber,
          floor: values.floor,
          area: String(values.area),
          bedrooms: values.bedrooms,
          monthlyRent: String(values.monthlyRent),
          propertyId: values.propertyId,
        });

        messageApi.success("Unit created successfully.");
      }

      onClose();
    } catch {
      messageApi.error("Failed to save unit. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}

      <Modal
        title={isEditing ? "Edit Unit" : "Add Unit"}
        open={open}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
        centered
      >
        <form
          className="mt-6 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Form.Item
            label="Unit Number"
            required
            validateStatus={errors.unitNumber ? "error" : ""}
            help={errors.unitNumber?.message}
          >
            <Controller
              name="unitNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="e.g. A-101"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Property"
            required
            validateStatus={errors.propertyId ? "error" : ""}
            help={errors.propertyId?.message}
          >
            <Controller
              name="propertyId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || undefined}
                  placeholder="Select a property"
                  loading={propertiesLoading}
                  disabled={isEditing}
                  showSearch
                  optionFilterProp="label"
                  options={(propertiesData?.data ?? []).map((property) => ({
                    value: property.id,
                    label: property.name,
                  }))}
                />
              )}
            />
          </Form.Item>

          {isEditing && (
            <p className="text-sm text-slate-500">
              The property cannot be changed when editing a unit.
            </p>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Form.Item
              label="Floor"
              required
              validateStatus={errors.floor ? "error" : ""}
              help={errors.floor?.message}
            >
              <Controller
                name="floor"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    className="w-full"
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? 0)}
                    placeholder="Floor"
                    precision={0}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Bedrooms"
              required
              validateStatus={errors.bedrooms ? "error" : ""}
              help={errors.bedrooms?.message}
            >
              <Controller
                name="bedrooms"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    className="w-full"
                    min={0}
                    max={100}
                    precision={0}
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? 0)}
                    placeholder="Bedrooms"
                  />
                )}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Form.Item
              label="Area (m²)"
              required
              validateStatus={errors.area ? "error" : ""}
              help={errors.area?.message}
            >
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    className="w-full"
                    min={0.01}
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? 0)}
                    placeholder="Area in square meters"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Monthly Rent"
              required
              validateStatus={errors.monthlyRent ? "error" : ""}
              help={errors.monthlyRent?.message}
            >
              <Controller
                name="monthlyRent"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    className="w-full"
                    min={0.01}
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? 0)}
                    placeholder="Monthly rent"
                    precision={2}
                  />
                )}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={!isEditing && (propertiesLoading || !propertiesData?.data.length)}
            >
              {isEditing ? "Save Changes" : "Create Unit"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}