import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";


const MonitorRefugee = () => {
  const [refugeeId, setRefugeeId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRefugeeId(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Fetching details for Refugee ID:", refugeeId);
    // API call will be added here later
  };

  return (
    <>
    <Navbar/>
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
    
      <h1 className="text-3xl  font-bold text-blue-600 mb-6">Monitor Refugee</h1>
      <Card className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            name="refugeeId"
            placeholder="Enter Refugee ID"
            className="p-2 border border-gray-300 rounded-md"
            value={refugeeId}
            onChange={handleChange}
          />
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default MonitorRefugee;