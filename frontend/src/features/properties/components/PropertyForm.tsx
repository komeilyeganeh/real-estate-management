import { useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateProperty,
  useUpdateProperty,
} from "../hooks/useProperties";

import {
  propertySchema,
  type PropertyFormValues,
} from "../schemas/property.schema";

import type { Property } from "../types/property.types";

interface PropertyFormProps {
  open: boolean;
  property: Property | null;
  onClose: () => void;
}

const { TextArea } = Input;

export default function PropertyForm({
  open,
  property,
  onClose,
}: PropertyFormProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();

  const isEditing = Boolean(property);
  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: property?.name ?? "",
        address: property?.address ?? "",
        description: property?.description ?? "",
      });
    }
  }, [open, property, reset]);

  const onSubmit = async (values: PropertyFormValues) => {
    const payload = {
      name: values.name,
      address: values.address,
      description: values.description || undefined,
    };

    try {
      if (property) {
        await updateMutation.mutateAsync({
          id: property.id,
          payload,
        });

        messageApi.success("Property updated successfully.");
      } else {
        await createMutation.mutateAsync(payload);

        messageApi.success("Property added successfully.");
      }

      onClose();
    } catch {
      messageApi.error("Failed to save property. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}

      <Modal
        title={isEditing ? "Edit Property" : "Add Property"}
        open={open}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
        centered
      >
        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Form.Item
            label="Property Name"
            required
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="e.g. Sunrise Tower"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            required
            validateStatus={errors.address ? "error" : ""}
            help={errors.address?.message}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter the full property address"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={4}
                  placeholder="Enter an optional property description"
                />
              )}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              {isEditing ? "Save Changes" : "Add Property"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}