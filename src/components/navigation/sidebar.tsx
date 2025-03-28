import logo from "@/assets/logo.svg";
import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import {
  BookOpenText,
  ChevronDown,
  ChevronUp,
  GitFork,
  Home,
  LayoutGrid,
  Mail,
  Trophy,
  WholeWordIcon,
} from "lucide-react";
import { JSX, ReactNode, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaPenNibSolid } from "react-icons/lia";
import { PiScrewdriverBold } from "react-icons/pi";
import { NavLink } from "react-router";
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
      // icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element | ReactNode;
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
    {
      name: "Dashboard",
      to: paths.app.dashboard.getHref(),
      icon: LayoutGrid,
    },
    {
      name: "Job Applied Forms",
      to: paths.app.jobAppliedForm.getHref(),
      icon: GitFork,
    },
    {
      name: "Contact Messages",
      to: paths.app.contactMessages.getHref(),
      icon: Mail,
    },

    { title: "Content & Images" }, // Added at the second place

    { name: "Home Page", to: paths.app.home.root.getHref(), icon: Home },
    {
      name: "About Us",
      to: paths.app.aboutus.root.getHref(),
      icon: HiOutlineUserGroup,
    },
    {
      name: "Milestones",
      to: paths.app.milestone.root.getHref(),
      icon: Trophy,
    },
    {
      name: "Blog",
      icon: BookOpenText,
      subRoute: [
        [
          {
            name: "Blogs",
            to: paths.app.blog.blogs.root.getHref(),
            // icon: Folder
          },
          {
            name: "Categories",
            to: paths.app.blog.categories.root.getHref(),
            // icon: Folder,
          },
        ],
      ],
    },
    {
      name: "Banner",
      to: paths.app.banner.root.getHref(),
      icon: WholeWordIcon,
    },
    {
      name: "Career",
      icon: LiaPenNibSolid,
      subRoute: [
        [
          {
            name: "Categories",
            to: paths.app.career.categories.root.getHref(),
            // icon: Folder,
          },
          {
            name: "Related Fields",
            to: paths.app.career.relatedFields.root.getHref(),
            // icon: Folder,
          },
          {
            name: "Regions",
            to: paths.app.career.regions.root.getHref(),
            // icon: Folder,
          },
          {
            name: "Hiring Post",
            to: paths.app.career.hiringPost.root.getHref(),
            // icon: Folder,
          },
        ],
      ],
    },
    // {
    //   name: "FeedBack",
    //   to: paths.app.feedback.getHref(),
    //   icon: MessageCircleMore,
    // },

    { title: "Maintenance" }, // Added at the end
    {
      name: "Role & Permission",
      to: paths.app.roleAndPermission.getHref(),
      icon: PiScrewdriverBold,
    },

    {
      name: "User Maintain",
      to: paths.app.userMaintain.getHref(),
      icon: FiUserPlus,
    },
  ];

  return (
    <nav className="grid gap-6 text-lg font-medium px-6 overflow-y-auto pb-10">
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
                  <ChevronUp className="w-4 h-4 text-primaryText" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primaryText" />
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
                    end={subItem.name === "Dashboard"}
                    className={({ isActive }) =>
                      cn(
                        " hover:bg-hover hover:text-secondaryText",
                        "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium ",
                        isActive &&
                          "bg-primaryText text-background hover:bg-primaryText hover:text-background",
                        "first:mt-6"
                      )
                    }
                  >
                    {/* <subItem.icon
                      className="mr-4 size-6 shrink-0"
                      aria-hidden="true"
                    /> */}
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        }

        // It's a standard navigation item
        else {
          // const isActiveLink = (path: string) => {
          //   return location.pathname.includes(path); // Check if current path includes 'home'
          // };
          return (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.name === "Dashboard"}
              className={({ isActive }) =>
                cn(
                  "",
                  " hover:bg-hover hover:text-secondaryText",
                  "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                  isActive &&
                    "bg-primaryText text-background  hover:bg-primaryText hover:text-background"
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
        }
      })}
    </nav>
  );
};
