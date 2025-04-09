import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ngoList = [
  { id: 1, name: "Helping Hands", email: "contact@helpinghands.org", status: "Pending", details: "This NGO provides food and shelter for refugees." },
  { id: 2, name: "Hope Foundation", email: "info@hopefoundation.com", status: "Pending", details: "Focused on healthcare and education for refugees." },
];

const Requests = () => {
  const [ngos, setNgos] = useState(ngoList);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAction = (id, action) => {
    setNgos((prevNgos) =>
      prevNgos.map((ngo) =>
        ngo.id === id ? { ...ngo, status: action } : ngo
      )
    );
  };

  const openDescription = (ngo) => {
    setSelectedNGO(ngo);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">NGO Approval</h1>
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CardContent>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 border">NGO Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Actions</th>
                <th className="p-3 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {ngos.map((ngo) => (
                <tr key={ngo.id} className="border">
                  <td className="p-3 border">{ngo.name}</td>
                  <td className="p-3 border">{ngo.email}</td>
                  <td className="p-3 border flex justify-center gap-2">
                    <Button
                      className="bg-green-600 text-white px-3 py-1"
                      onClick={() => handleAction(ngo.id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-600 text-white px-3 py-1"
                      onClick={() => handleAction(ngo.id, "Denied")}
                    >
                      Deny
                    </Button>
                  </td>
                  <td className="p-3 border">
                    <Button
                      className="bg-gray-600 text-white px-3 py-1"
                      onClick={() => openDescription(ngo)}
                    >
                      Description
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Description Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NGO Details</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">{selectedNGO?.details}</p>
          <Button
            className="mt-4 bg-blue-600 text-white px-3 py-1"
            onClick={() => setIsDialogOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Requests;
