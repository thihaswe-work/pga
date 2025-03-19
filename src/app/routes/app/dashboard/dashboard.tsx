import dashboardbg from "@/assets/dashboard.svg";
export default function Page() {
  return (
    // <ContentLayout title="Dashboard">
    <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-86px)]">
      <img
        src={dashboardbg}
        alt="background"
        className="w-[462px] h-[527px] object-cover"
      />
    </div>
    /* </ContentLayout> */
  );
}
