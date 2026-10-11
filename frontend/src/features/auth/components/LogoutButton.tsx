import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      danger
      icon={<LogoutOutlined />}
      onClick={logout}
    >
      Logout
    </Button>
  );
}