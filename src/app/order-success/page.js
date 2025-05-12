import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
