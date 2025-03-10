import * as React from "react";

// import { Head } from "../seo";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      {/* <Head title={title} /> */}
      <div className="">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mx-auto   py-6">{children}</div>
      </div>
    </>
  );
};
