import React from "react";
import Sidebar from "parts/Admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
}
