import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import axios from "axios";
import imageCompression from "browser-image-compression"; // Install: npm install browser-image-compression

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

  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [qrUrl, setQrUrl] = useState(null); // State for QR code URL
  const [refugeeId, setRefugeeId] = useState(null); // State for refugee ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: e.target.files }));
  };

  const handleSubmit = async () => {
    if (!formData.documents || formData.documents.length === 0) {
      console.error("No image uploaded.");
      return;
    }

    const file = formData.documents[0]; // Get the first uploaded file

    try {
      // Compress the image
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 800, // Resize to 800x800
        useWebWorker: true, // Use web workers for better performance
      };
      const compressedFile = await imageCompression(file, options);

      // Convert the compressed file to a base64 string
      const base64Image = await imageCompression.getDataUrlFromFile(compressedFile);

      // Create the payload
      const payload = {
        image: base64Image,
        biometricData: {
          name: formData.name,
          nationality: formData.country,
          dateOfBirth: formData.dob,
          biometricSignature: "R2D2-C3PO-2024", // Synthetic biometric signature
        },
      };

      // Send the POST request with the Officer-Address header
      const officerAddress = "0x20b5877AB59fF86cfA7E9fe2FB5078F4f1FbDb55";
      const response = await axios.post("http://localhost:3000/register", payload, {
        headers: {
          "Content-Type": "application/json",
          "Officer-Address": officerAddress, // Include the officer's address in the headers
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setRefugeeId(response.data.refugeeId);
        setQrUrl(`http://localhost:3000${response.data.qrUrl}`); // Use the backend's base URL
      }
    } catch (error) {
      console.error("Error processing or submitting form data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Refugee Registration</h1>
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

        {/* Display success message, refugee ID, and QR code */}
        {successMessage && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-bold">{successMessage}</p>
            <p>Refugee ID: {refugeeId}</p>
            {qrUrl && <img src={qrUrl} alt="QR Code" className="mt-4" />}
          </div>
        )}
      </div>
    </>
  );
};

export default RefugeeRegistration;
