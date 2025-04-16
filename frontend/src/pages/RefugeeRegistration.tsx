import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const RefugeeRegistration = () => {
  const [formData, setFormData] = useState({
    country: "",
    name: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: e.target.files }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <><Navbar/>
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold  text-blue-600 mb-8">Refugee Registration</h1>
      <Card className="w-165 p-10 bg-white shadow-lg rounded-lg">
        <CardContent className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <Label>Country of Origin</Label>
            <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />

            <Label>Name</Label>
            <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />

            <Label>Father's Name</Label>
            <Input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} />

            <Label>Mother's Name</Label>
            <Input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-6">
            <Label>Date of Birth</Label>
            <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />

            <Label>Gender</Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Label>Marital Status</Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, maritalStatus: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>

            <Label>Upload Photo</Label>
            <Input type="file" multiple onChange={handleFileChange} />
          </div>
        </CardContent>

        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleSubmit}>
          Register
        </Button>
      </Card>
    </div>
    </>
  );
};

export default RefugeeRegistration;
