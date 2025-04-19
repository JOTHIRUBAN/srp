import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression"; // Import the library
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

    try {
      setLoading(true);

      // Compress the image
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 800, // Resize to 800x800
        useWebWorker: true, // Use web workers for better performance
      };
      const compressedFile = await imageCompression(selectedFile, options);

      // Convert the compressed file to a base64 string
      const base64Image = await imageCompression.getDataUrlFromFile(compressedFile);

      // Send the verification request
      const response = await axios.post(`http://localhost:3000/verify/${id}`, {
        image: base64Image,
      });

      const data = response.data;

      // Handle response based on isSuspect or isMatch
      if (data.isSuspect) {
        alert("⚠️ This individual is marked as a suspect!");
      } else if (data.match) {
        alert("✅ Verification successful!");
      } else {
        alert("❌ Verification failed. No match found.");
      }

      setResponseData(data);
    } catch (error) {
      alert("❌ Wrong User");
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
