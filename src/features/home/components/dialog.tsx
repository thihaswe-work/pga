import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Home } from "./columns";

interface Prop {
  payment: Home | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function HomeDialog({ payment, open, setOpen }: Prop) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>ID:</strong> {payment?.id}
          </p>
          <p>
            <strong>Email:</strong> {payment?.email}
          </p>
          <p>
            <strong>Amount:</strong> ${payment?.amount}
          </p>
          <p>
            <strong>Status:</strong> {payment?.status}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
