
import HeaderDashboard from "@/ui/HeaderDashboard";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // const session = use(unstable_getServerSession(authOptions))
  return (
    <React.Fragment>
      <HeaderDashboard/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </React.Fragment>
  );
}
