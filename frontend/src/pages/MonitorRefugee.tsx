import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

interface Refugee {
  name: string;
  nationality: string;
  dob: string;
  biometricSignature: string;
  isSuspect: boolean; // Updated to boolean
}

const MonitorRefugee = () => {
  const [refugees, setRefugees] = useState<Refugee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRefugees = async () => {
      try {
        const res = await fetch("http://localhost:3000/refugees");
        const data = await res.json();
        setRefugees(data);
      } catch (error) {
        console.error("Failed to fetch refugees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefugees();
  }, []);

  const handleCardClick = (refugeeId: string) => {
    navigate(`/refugee/${refugeeId}`); // Navigate to the refugee detail page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">
            Refugee Monitoring Dashboard
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-40 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {refugees.map((refugee, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-xl rounded-2xl p-4 cursor-pointer hover:shadow-2xl transition-shadow"
                  onClick={() => handleCardClick(refugee.id)} // Pass unique identifier
                >
                  <CardContent className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-800">
                      👤 Name: <span className="font-normal">{refugee.name}</span>
                    </p>
                    <p className="text-gray-700">
                      🌍 Nationality: {refugee.nationality}
                    </p>
                    <p className="text-gray-700">🎂 DOB: {refugee.dateOfBirth}</p>
                    <p className="text-gray-700">
                      🔐 Biometric Signature:{" "}
                      <span className="break-words">{refugee.biometricSignature}</span>
                    </p>
                    <p
                      className={`font-semibold ${
                        refugee.isSuspect ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      ⚠️ Suspect Status: {refugee.isSuspect ? "Yes" : "No"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MonitorRefugee;
