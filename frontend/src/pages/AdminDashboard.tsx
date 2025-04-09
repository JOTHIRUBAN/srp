import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [selectedRefugee, setSelectedRefugee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const refugees = [
    { id: 1, name: "John Doe", country: "Syria", dob: "1990-05-14", gender: "Male", maritalStatus: "Single" },
    { id: 2, name: "Jane Smith", country: "Sudan", dob: "1985-08-20", gender: "Female", maritalStatus: "Married" },
  ];

  const handleViewDetails = (refugee) => {
    setSelectedRefugee(refugee);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Refugee List</h1>
      <Card className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Country</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refugees.map((refugee) => (
                <tr key={refugee.id} className="text-center">
                  <td className="border border-gray-300 p-2">{refugee.id}</td>
                  <td className="border border-gray-300 p-2">{refugee.name}</td>
                  <td className="border border-gray-300 p-2">{refugee.country}</td>
                  <td className="border border-gray-300 p-2">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleViewDetails(refugee)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refugee Details</DialogTitle>
          </DialogHeader>
          {selectedRefugee && (
            <div className="p-4">
              <p><strong>Name:</strong> {selectedRefugee.name}</p>
              <p><strong>Country of Origin:</strong> {selectedRefugee.country}</p>
              <p><strong>Date of Birth:</strong> {selectedRefugee.dob}</p>
              <p><strong>Gender:</strong> {selectedRefugee.gender}</p>
              <p><strong>Marital Status:</strong> {selectedRefugee.maritalStatus}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
