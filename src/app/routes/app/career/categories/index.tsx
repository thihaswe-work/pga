import { toast } from "sonner";

import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-86px)]">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            // description: "Sunday, December 03, 2023 at 9:00 AM",
            // action: {
            //   label: "Undo",
            //   onClick: () => console.log("Undo"),
            // },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}
