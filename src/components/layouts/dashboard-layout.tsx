import { PanelLeft, User2 } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { paths } from "@/config/paths";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { SideBar } from "../navigation/index";

import useAuth from "@/store/store";
import { toast } from "sonner";
import { IoMdCheckmark } from "react-icons/io";

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === "loading") {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== "loading") {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  // const logout = useLogout({
  //   onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
  // });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-72 flex-col border-r sm:flex">
        <SideBar />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Progress />
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-black pt-10 text-white sm:max-w-60">
              <SideBar />
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <div className="flex gap-2">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <span className="sr-only">Open user menu</span>
                  <User2 className="size-6 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <div className="flex flex-col">
                <div className="text-sm">hello world</div>
                <span className="text-secondaryText text-xs">Admin</span>
              </div>
            </div>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(paths.app.aboutus.getHref())}
                className={cn("block px-4 py-2 text-sm text-gray-700")}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn("block px-4 py-2 text-sm text-gray-700 w-full")}
                onClick={() => {
                  removeToken();
                  navigate("/auth/login");
                  toast(
                    <div className="flex items-center gap-2">
                      <div className="p-3 rounded-full bg-background">
                        <IoMdCheckmark className="text-primaryText text-xl font-bold" />
                      </div>
                      <span>You are now logged Out</span>
                    </div>
                  );
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 lg:py-0 sm:px-6 sm:py-0 md:gap-8 bg-secondaryBackground min-h-[calc(100vh-86px)] ">
          {children}
        </main>
      </div>
    </div>
  );
}
