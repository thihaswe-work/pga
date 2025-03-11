import { ContentLayout } from "@/components/layouts/content-layout";
import { getColumns, Payment } from "@/features/home/components/columns";
import { DataTable } from "@/features/home/components/data-table";
import { PaymentDialog } from "@/features/home/components/dialog";
import { useEffect, useState } from "react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },

    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    {
      id: "b27f89c1",
      amount: 250,
      status: "completed",
      email: "user2@example.com",
    },
    {
      id: "c38g90d2",
      amount: 500,
      status: "failed",
      email: "user3@example.com",
    },
    {
      id: "d49h01e3",
      amount: 750,
      status: "pending",
      email: "user4@example.com",
    },
    {
      id: "e50i12f4",
      amount: 900,
      status: "completed",
      email: "user5@example.com",
    },
    {
      id: "f61j23g5",
      amount: 300,
      status: "failed",
      email: "user6@example.com",
    },
    {
      id: "g72k34h6",
      amount: 450,
      status: "pending",
      email: "user7@example.com",
    },
    {
      id: "h83l45i7",
      amount: 600,
      status: "completed",
      email: "user8@example.com",
    },
    {
      id: "i94m56j8",
      amount: 150,
      status: "failed",
      email: "user9@example.com",
    },
    {
      id: "j05n67k9",
      amount: 200,
      status: "pending",
      email: "user10@example.com",
    },
    {
      id: "k16o78l0",
      amount: 700,
      status: "completed",
      email: "user11@example.com",
    },
    {
      id: "l27p89m1",
      amount: 850,
      status: "failed",
      email: "user12@example.com",
    },
    {
      id: "m38q90n2",
      amount: 400,
      status: "pending",
      email: "user13@example.com",
    },
    {
      id: "n49r01o3",
      amount: 550,
      status: "completed",
      email: "user14@example.com",
    },
    {
      id: "o50s12p4",
      amount: 950,
      status: "failed",
      email: "user15@example.com",
    },
    {
      id: "p61t23q5",
      amount: 100,
      status: "pending",
      email: "user16@example.com",
    },
    {
      id: "q72u34r6",
      amount: 250,
      status: "completed",
      email: "user17@example.com",
    },
    {
      id: "r83v45s7",
      amount: 500,
      status: "failed",
      email: "user18@example.com",
    },
    {
      id: "s94w56t8",
      amount: 750,
      status: "pending",
      email: "user19@example.com",
    },
    {
      id: "t05x67u9",
      amount: 900,
      status: "completed",
      email: "user20@example.com",
    },
    {
      id: "u16y78v0",
      amount: 300,
      status: "failed",
      email: "user21@example.com",
    },
    {
      id: "v27z89w1",
      amount: 450,
      status: "pending",
      email: "user22@example.com",
    },
    {
      id: "w38a90x2",
      amount: 600,
      status: "completed",
      email: "user23@example.com",
    },
    {
      id: "x49b01y3",
      amount: 150,
      status: "failed",
      email: "user24@example.com",
    },
    {
      id: "y50c12z4",
      amount: 200,
      status: "pending",
      email: "user25@example.com",
    },
    {
      id: "z61d23a5",
      amount: 700,
      status: "completed",
      email: "user26@example.com",
    },
    {
      id: "a72e34b6",
      amount: 850,
      status: "failed",
      email: "user27@example.com",
    },
    {
      id: "b83f45c7",
      amount: 400,
      status: "pending",
      email: "user28@example.com",
    },
    {
      id: "c94g56d8",
      amount: 550,
      status: "completed",
      email: "user29@example.com",
    },
    {
      id: "d05h67e9",
      amount: 950,
      status: "failed",
      email: "user30@example.com",
    },
    {
      id: "e16i78f0",
      amount: 100,
      status: "pending",
      email: "user31@example.com",
    },
    {
      id: "f27j89g1",
      amount: 250,
      status: "completed",
      email: "user32@example.com",
    },
    {
      id: "g38k90h2",
      amount: 500,
      status: "failed",
      email: "user33@example.com",
    },
    {
      id: "h49l01i3",
      amount: 750,
      status: "pending",
      email: "user34@example.com",
    },
    {
      id: "i50m12j4",
      amount: 900,
      status: "completed",
      email: "user35@example.com",
    },
    {
      id: "j61n23k5",
      amount: 300,
      status: "failed",
      email: "user36@example.com",
    },
    {
      id: "k72o34l6",
      amount: 450,
      status: "pending",
      email: "user37@example.com",
    },
    {
      id: "l83p45m7",
      amount: 600,
      status: "completed",
      email: "user38@example.com",
    },
    {
      id: "m94q56n8",
      amount: 150,
      status: "failed",
      email: "user39@example.com",
    },
    {
      id: "n05r67o9",
      amount: 200,
      status: "pending",
      email: "user40@example.com",
    },
    {
      id: "o16s78p0",
      amount: 700,
      status: "completed",
      email: "user41@example.com",
    },
    {
      id: "p27t89q1",
      amount: 850,
      status: "failed",
      email: "user42@example.com",
    },
    {
      id: "q38u90r2",
      amount: 400,
      status: "pending",
      email: "user43@example.com",
    },
    {
      id: "r49v01s3",
      amount: 550,
      status: "completed",
      email: "user44@example.com",
    },
    {
      id: "s50w12t4",
      amount: 950,
      status: "failed",
      email: "user45@example.com",
    },
    {
      id: "t61x23u5",
      amount: 100,
      status: "pending",
      email: "user46@example.com",
    },
    {
      id: "u72y34v6",
      amount: 250,
      status: "completed",
      email: "user47@example.com",
    },
    {
      id: "v83z45w7",
      amount: 500,
      status: "failed",
      email: "user48@example.com",
    },
    {
      id: "w94a56x8",
      amount: 750,
      status: "pending",
      email: "user49@example.com",
    },
    {
      id: "x05b67y9",
      amount: 900,
      status: "completed",
      email: "user50@example.com",
    },
  ];
}
export default function TestPage() {
  // Pass handleViewClick as the onViewClick prop to DataTable

  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }
    // setTimeout(() => {
    fetchData();
    // }, 3000);
  }, []);
  const handleViewClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };
  if (loading) {
    return (
      <div className="text-center py-10 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <ContentLayout title="home">
      <div className="">
        <DataTable columns={getColumns(handleViewClick)} data={data} />
        <PaymentDialog
          payment={selectedPayment}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
    </ContentLayout>
  );
}
