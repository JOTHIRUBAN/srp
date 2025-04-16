import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

const baseUrl = "http://localhost:5000"; // your backend URL

export default function NGORegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    type: "",
    year: "",
    regNumber: "",
    website: "",
    description: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleRegister = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== "file") data.append(key, value as string);
      });

      if (formData.file) {
        data.append("file", formData.file); // File must be appended separately
      }

      const response = await axios.post(`${baseUrl}/api/ngo-register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "true") {
        alert("You will be notified soon by us");
        navigate("/ngo/login");
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error occurred during registration.");
    }
  };

  return (
    <div className="h-auto min-h-screen py-10 flex flex-col items-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">NGO Registration</h1>
      <Card className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="NGO Name" name="name" value={formData.name} onChange={handleChange} />
            <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <Input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
            <Input placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <Input placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
            <Input placeholder="State/Province" name="state" value={formData.state} onChange={handleChange} />
            <Input placeholder="City" name="city" value={formData.city} onChange={handleChange} />
            <Input placeholder="Year of Establishment" name="year" value={formData.year} onChange={handleChange} />
            <Input placeholder="Registration Number" name="regNumber" value={formData.regNumber} onChange={handleChange} />
            <Input placeholder="Website (optional)" name="website" value={formData.website} onChange={handleChange} />
          </div>

          <Input placeholder="Full Address" name="address" value={formData.address} onChange={handleChange} />

          <div>
            <Label className="text-sm text-muted-foreground mb-1">NGO Type</Label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Refugee Support">Refugee Support</SelectItem>
                <SelectItem value="Child Welfare">Child Welfare</SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Tell us about your NGO (optional)"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="min-h-[80px]"
          />

          <div>
            <Label className="text-sm text-muted-foreground mb-1">Upload NGO Certificate (optional)</Label>
            <Input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} />
          </div>

          <Button
            className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleRegister}
          >
            Register NGO
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
