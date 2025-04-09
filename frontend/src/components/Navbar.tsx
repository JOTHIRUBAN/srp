import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky bg-blue-500 w-full flex flex-row px-8 py-4 justify-between">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/admin-dashboard")}
      >
        Refugee System - Admin
      </h1>
      <div className="flex gap-5">
        <Button onClick={() => navigate("/refugee-register")}>
          Register Refugee
        </Button>
        <Button onClick={() => navigate("/monitor-refugee")}>
          Monitor
        </Button>
        <Button onClick={() => navigate("/requests")}>
          Reuqests
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
