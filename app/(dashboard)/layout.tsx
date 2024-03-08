import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="grid lg:grid-cols-5">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:cols-span-4">
        <Navbar />
        <div className="py-6 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
