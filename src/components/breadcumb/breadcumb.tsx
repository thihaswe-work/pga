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
  const modifiedPaths = pathnames.slice(2); // Use `slice` instead of `splice`

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/app">Content & Image</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {modifiedPaths.map((item, index) => {
          const lastIndex = modifiedPaths.length - 1;
          const isLast = index === modifiedPaths.length - 1;
          const isEditPage = item === "edit";

          const isSpecial =
            modifiedPaths[0] === "blog" || modifiedPaths[0] === "career";
          const linkPath = isSpecial
            ? `/app/${modifiedPaths[0]}/${
                item === modifiedPaths[0]
                  ? modifiedPaths[index + 1]
                  : modifiedPaths[lastIndex] === "edit" &&
                    item === modifiedPaths[lastIndex - 1]
                  ? modifiedPaths[1] + "/" + item + "/" + "edit"
                  : item
              }`
            : `/app/${
                modifiedPaths[modifiedPaths.length - 1] !== "create" &&
                item === modifiedPaths[modifiedPaths.length - 2]
                  ? modifiedPaths[0] +
                    "/" +
                    item +
                    "/" +
                    modifiedPaths[modifiedPaths.length - 1]
                  : item
              }`;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isEditPage || isLast ? (
                  <BreadcrumbPage className="cursor-pointer">
                    {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={linkPath}>{item}</Link>
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
