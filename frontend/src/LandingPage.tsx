import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    navigate(`/${role}/login`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Refugee System</h1>
      <Card className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <CardContent className="flex flex-col gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Select Your Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="refugee">Refugee</option>
            <option value="ngo">NGO</option>
          </select>
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
