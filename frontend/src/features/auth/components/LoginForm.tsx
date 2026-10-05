import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';

const { Title, Text } = Typography;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mb-8">
        <Title level={2} className="mb-2! text-3xl! font-semibold!">
          Welcome back
        </Title>

        <Text type="secondary">
          Sign in to your account to continue.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="you@example.com"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Enter your password"
              />
            )}
          />
        </Form.Item>

        <div className="mb-6 flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </Form>

      <div className="mt-8 text-center">
        <Text type="secondary">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600"
          >
            Create an account
          </Link>
        </Text>
      </div>
    </div>
  );
}