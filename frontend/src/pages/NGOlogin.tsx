import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function NGOLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Authentication logic here
    navigate("/ngo/dashboard");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">NGO Login</h1>
      <Card className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
            value={credentials.email}
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
