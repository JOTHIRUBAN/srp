import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {QRCode} from "qrcode.react";

interface Refugee {
  id: string;
  name: string;
  nationality: string;
  dob: string;
  biometricSignature: string;
  suspectStatus: string;
}

const RefugeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [refugee, setRefugee] = useState<Refugee | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingSuspect, setMarkingSuspect] = useState(false);

  useEffect(() => {
    const fetchRefugee = async () => {
      try {
        const res = await fetch(`http://localhost:3000/refugees/${id}`);
        const data = await res.json();
        setRefugee(data);
      } catch (error) {
        console.error("Failed to fetch refugee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefugee();
  }, [id]);

  const handleMarkAsSuspect = async () => {
    const confirmation = prompt("Type 'confirm' to mark this refugee as a suspect:");
    if (confirmation !== "confirm") {
      alert("Action cancelled.");
      return;
    }

    try {
        setMarkingSuspect(true);
        const res = await fetch(`http://localhost:3000/refugees/${id}/suspect`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Officer-Address": "0x20b5877AB59fF86cfA7E9fe2FB5078F4f1FbDb55", // Add officer-address header
          },
        });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        navigate("/monitor-refugee"); // Redirect back to the monitor page
      } else {
        console.error("Failed to mark as suspect:", await res.text());
        alert("Failed to mark refugee as suspect.");
      }
    } catch (error) {
      console.error("Error marking refugee as suspect:", error);
      alert("An error occurred.");
    } finally {
      setMarkingSuspect(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading refugee details...</p>
        </div>
      </>
    );
  }

  if (!refugee) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Refugee not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">
            Refugee Details
          </h1>
          <Card className="bg-white shadow-xl rounded-2xl p-4">
            <CardContent className="flex flex-col gap-4">
              <p className="text-lg font-semibold text-gray-800">
                👤 Name: <span className="font-normal">{refugee.name}</span>
              </p>
              <p className="text-gray-700">🌍 Nationality: {refugee.nationality}</p>
              <p className="text-gray-700">🎂 DOB: {refugee.dateOfBirth}</p>
              <p className="text-gray-700">
                🔐 Biometric Signature:{" "}
                <span className="break-words">{refugee.biometricSignature}</span>
              </p>
              <p className={`font-semibold ${refugee.isSuspect ? "text-red-600" : "text-green-600"}`}>
  ⚠️ Suspect Status: {refugee.isSuspect ? "Yes" : "No"}
</p>
              <div className="flex justify-center mt-4">
              <img
        src={`http://localhost:3000/qr/${refugee.id}.png`} // Adjust the URL to your QR code endpoint
        alt="QR Code"
        className="mt-4 mx-auto"
        style={{ width: "150px", height: "150px" }} // Optional styling for size
      /> </div>
              <button
  onClick={handleMarkAsSuspect}
  disabled={markingSuspect || refugee.isSuspect} // Disable if already a suspect or marking in progress
  className={`mt-6 px-4 py-2 rounded-lg text-white ${
    markingSuspect || refugee.isSuspect
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  {markingSuspect ? "Marking..." : refugee.isSuspect ? "Already Marked as Suspect" : "Mark as Suspect"}
</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RefugeeDetail;
