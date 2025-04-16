import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

const baseUrl = "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/adminlogin`, credentials);

      if (response.data.status === "true") {
        localStorage.setItem("adminUsername", credentials.username); // ✅ Save username
        navigate("/admin-dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Admin Login</h1>
      <Card className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-md"
            value={credentials.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
