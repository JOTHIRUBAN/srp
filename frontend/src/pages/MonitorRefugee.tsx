import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

interface Refugee {
  name: string;
  nationality: string;
  dob: string;
  biometricSignature: string;
  suspectStatus: string;
}

const MonitorRefugee = () => {
  const [refugees, setRefugees] = useState<Refugee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefugees = async () => {
      try {
        const res = await fetch("http://localhost:5000/refugees");
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
                <Card key={index} className="bg-white shadow-xl rounded-2xl p-4">
                  <CardContent className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-800">
                      👤 Name: <span className="font-normal">{refugee.name}</span>
                    </p>
                    <p className="text-gray-700">
                      🌍 Nationality: {refugee.nationality}
                    </p>
                    <p className="text-gray-700">🎂 DOB: {refugee.dob}</p>
                    <p className="text-gray-700">
                      🔐 Biometric Signature:{" "}
                      <span className="break-words">{refugee.biometricSignature}</span>
                    </p>
                    <p className={`font-semibold ${refugee.suspectStatus === "Yes" ? "text-red-600" : "text-green-600"}`}>
                      ⚠️ Suspect Status: {refugee.suspectStatus}
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
