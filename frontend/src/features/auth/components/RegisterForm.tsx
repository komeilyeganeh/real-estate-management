import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router";
import { Controller, useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";

const { Title, Text } = Typography;

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...payload } = data;

    mutate(payload, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <div className="mb-8">
        <Title level={2} className="mb-2! text-3xl! font-semibold!">
          Create your account
        </Title>

        <Text type="secondary">
          Get started with your property management workspace.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        requiredMark={false}
      >
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <Form.Item
            label="First name"
            validateStatus={errors.firstName ? "error" : ""}
            help={errors.firstName?.message}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="John" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Last name"
            validateStatus={errors.lastName ? "error" : ""}
            help={errors.lastName?.message}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="Doe" />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="you@example.com" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Create a password"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Confirm your password"
              />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isPending}
        >
          Create account
        </Button>
      </Form>

      <div className="mt-8 text-center">
        <Text type="secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
}