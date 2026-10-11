import { useEffect } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  message,
} from "antd";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateTenant,
  useUpdateTenant,
} from "../hooks/useTenants";

import {
  tenantSchema,
  type TenantFormValues,
} from "../schemas/tenant.schema";

import type { Tenant } from "../types/tenant.types";

interface TenantFormProps {
  open: boolean;
  tenant: Tenant | null;
  onClose: () => void;
}

export default function TenantForm({
  open,
  tenant,
  onClose,
}: TenantFormProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const createMutation = useCreateTenant();
  const updateMutation = useUpdateTenant();

  const isEditing = Boolean(tenant);

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        firstName: tenant?.firstName ?? "",
        lastName: tenant?.lastName ?? "",
        email: tenant?.email ?? "",
        phone: tenant?.phone ?? "",
      });
    }
  }, [open, tenant, reset]);

  const onSubmit = async (values: TenantFormValues) => {
    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    };

    try {
      if (tenant) {
        await updateMutation.mutateAsync({
          id: tenant.id,
          payload,
        });

        messageApi.success("Tenant updated successfully.");
      } else {
        await createMutation.mutateAsync(payload);

        messageApi.success("Tenant created successfully.");
      }

      onClose();
    } catch {
      messageApi.error(
        "Failed to save tenant. Please check the information and try again.",
      );
    }
  };

  return (
    <>
      {contextHolder}

      <Modal
        title={isEditing ? "Edit Tenant" : "Add Tenant"}
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
            label="First Name"
            required
            validateStatus={errors.firstName ? "error" : ""}
            help={errors.firstName?.message}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter first name"
                  autoComplete="given-name"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            required
            validateStatus={errors.lastName ? "error" : ""}
            help={errors.lastName?.message}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter last name"
                  autoComplete="family-name"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            required
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            required
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone?.message}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter phone number"
                  autoComplete="tel"
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
              {isEditing ? "Save Changes" : "Create Tenant"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
