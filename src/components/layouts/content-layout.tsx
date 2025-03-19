import * as React from "react";
import { BreadcrumbWithCustomSeparator } from "../breadcumb/index";

// import { Head } from "../seo";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  create?: React.ReactElement;
};

export const ContentLayout = ({
  children,
  title,
  create,
}: ContentLayoutProps) => {
  return (
    <>
      {/* <Head title={title} /> */}
      <div className="py-6 w-full overflow-x-auto">
        <div className="mx-auto  px-4 sm:px-6 md:px-8">
          <div className="text-secondaryText text-base mb-3">
            <BreadcrumbWithCustomSeparator />
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {create && create}
          </div>
        </div>
        <div className="mx-auto  px-4 py-6 sm:px-6 md:px-8 overflow-x-auto ">
          {children}
        </div>
      </div>
    </>
  );
};
