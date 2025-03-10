import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Folder, Home } from "lucide-react";
import { JSX, ReactNode, useState } from "react";
import { NavLink } from "react-router";
import logo from "@/assets/logo.svg";
import { Link } from "../ui/link/link";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element | ReactNode;
};

type SubSideNavigationItem = {
  name: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element | ReactNode;
  subRoute: [
    {
      name: string;
      to: string;
      icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element | ReactNode;
    }[]
  ];
};

type NavigationItem =
  | SideNavigationItem
  | { title: string }
  | SubSideNavigationItem;

const Logo = () => {
  return (
    <Link
      className="flex items-center text-white justify-center w-full"
      to={paths.app.dashboard.getHref()}
    >
      <img className="h-10 w-auto object-cover" src={logo} alt="Workflow" />
      {/* <span className="text-sm font-semibold text-white ">
        Bulletproof React
      </span> */}
    </Link>
  );
};

export const SideBar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Function to toggle a specific menu
  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navigation: NavigationItem[] = [
    { name: "Dashboard", to: paths.app.dashboard.getHref(), icon: Home },

    { title: "Content & Images" }, // Added at the second place

    { name: "Home Page", to: paths.app.home.getHref(), icon: Folder },
    { name: "About Us", to: paths.app.aboutus.getHref(), icon: Folder },
    { name: "Miles Stone", to: paths.app.milestone.getHref(), icon: Folder },

    {
      name: "Blog",
      icon: Folder,
      subRoute: [
        [
          { name: "Blogs", to: paths.app.blogs.getHref(), icon: Folder },
          {
            name: "Categories",
            to: paths.app.categories.getHref(),
            icon: Folder,
          },
        ],
      ],
    },
    { name: "Banner", to: paths.app.banner.getHref(), icon: Folder },

    { title: "Maintenance" }, // Added at the end
  ];

  return (
    <nav className="grid gap-6 text-lg font-medium px-6">
      <div className="flex h-16 shrink-0 items-center px-4">
        <Logo />
      </div>
      {navigation.map((item, index) => {
        if ("title" in item) {
          // It's a title section
          return (
            <h3 key={index} className="text-secondaryText px-4 text-sm">
              {item.title}
            </h3>
          );
        }

        if ("subRoute" in item) {
          return (
            <div key={index} className="menu-group">
              {/* Header - Click to Toggle */}
              <div
                className="menu-group-header flex items-center p-2 cursor-pointer justify-between group flex-1 w-full rounded-md text-base font-medium"
                onClick={() => toggleMenu(item.name)}
              >
                <div className="flex items-center ">
                  <item.icon className="mr-4 size-6 shrink-0" />
                  <span className=" ">{item.name}</span>
                </div>
                {/* Arrow Icon - Changes Based on Open State */}
                {openMenus[item.name] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>

              {/* Dropdown Items - Expand/Collapse */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out  space-y-6",

                  "",
                  openMenus[item.name]
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {item.subRoute[0].map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.to}
                    end={subItem.name !== "Discussions"}
                    className={({ isActive }) =>
                      cn(
                        " hover:bg-hover hover:text-secondaryText",
                        "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                        isActive && "bg-active text-primaryText",
                        "first:mt-6"
                      )
                    }
                  >
                    <subItem.icon
                      className="mr-4 size-6 shrink-0"
                      aria-hidden="true"
                    />
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        }

        // It's a standard navigation item
        return (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.name !== "Discussions"}
            className={({ isActive }) =>
              cn(
                "",
                " hover:bg-hover hover:text-secondaryText",
                "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                isActive && "bg-active text-primaryText"
              )
            }
          >
            <item.icon
              className={cn(
                // "text-gray-400 group-hover:text-gray-300",
                "mr-4 size-6 shrink-0"
              )}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};
