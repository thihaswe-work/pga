import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation } from "react-router";

export function BreadcrumbWithCustomSeparator() {
  const location = useLocation();
  const pathnames = decodeURI(location.pathname).split("/");
  const modifiedPaths = pathnames.slice(2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/app">
              {location.pathname.includes("role-and-permission") ||
              location.pathname.includes("user-maintain")
                ? "Maintenance"
                : "Content & Image"}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {modifiedPaths.map((item, index) => {
          const isLast = index === modifiedPaths.length - 1;
          const isEditPage = item === "edit";

          const linkPath = buildLinkPath(modifiedPaths, item, index);

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isEditPage || isLast ? (
                  <BreadcrumbPage className="cursor-pointer">
                    {formatBreadcrumbText(item)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={linkPath}>{formatBreadcrumbText(item)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const buildLinkPath = (
  modifiedPaths: string[],
  item: string,
  index: number
) => {
  const lastIndex = modifiedPaths.length - 1;
  const isSpecial =
    modifiedPaths[0] === "blog" || modifiedPaths[0] === "career";

  if (isSpecial) {
    return `/app/${modifiedPaths[0]}/${
      item === modifiedPaths[0]
        ? modifiedPaths[index + 1]
        : modifiedPaths[lastIndex] === "edit" &&
          item === modifiedPaths[lastIndex - 1]
        ? modifiedPaths[1] + "/" + item + "/" + "edit"
        : item
    }`;
  }

  return `/app/${
    modifiedPaths[lastIndex] !== "create" &&
    item === modifiedPaths[lastIndex - 1]
      ? modifiedPaths[0] + "/" + item + "/" + modifiedPaths[lastIndex]
      : item
  }`;
};

const formatBreadcrumbText = (item: string) =>
  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
