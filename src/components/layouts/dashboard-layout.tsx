import { Outlet } from "react-router";
import { SideBar } from "@/components/navigation";
import { AppBar } from "@/components/navigation";

export function DashboardLayout() {
  return (
    <div className="flex ">
      <aside className="w-[280px] bg-amber-100">
        <SideBar />
      </aside>
      <div className="flex flex-col w-full">
        <nav>
          <AppBar />
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
