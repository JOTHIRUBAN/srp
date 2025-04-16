import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Assuming Button component is from your UI library
import { Card, CardContent } from "@/components/ui/card"; // Assuming Card component is from your UI library

interface ResponseData {
  [key: string]: any;
  error?: string;
}

const QrReader: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extracts ID from URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3000/verify/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponseData(response.data);
    } catch (error) {
      setResponseData({ error: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <Card className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <CardContent className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Upload Image</h2>
          
          {/* File upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          
          {/* Upload button */}
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleUpload}
          >
            {loading ? "Verifying..." : "Upload & Verify"}
          </Button>

          {/* Response display */}
          {responseData && (
            <div className="mt-6 text-left w-full">
              <h4 className="font-semibold text-blue-600 mb-2">Server Response:</h4>
              <pre className="bg-gray-100 text-gray-900 p-4 rounded-md text-sm overflow-auto">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrReader;
