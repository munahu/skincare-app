import Layout from "@/app/components/Layout";
import { auth } from "@/app/auth";
import CheckoutForm from "@/app/components/CheckoutForm";
import { getOrderById } from "@/app/actions";
import OrderConfirmation from "@/app/components/OrderConfirmation";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const order = await getOrderById(params.id);

  return (
    <Layout showNav={!!order ?? false} addContainer={false}>
      <div className="bg-neutral-100 h-dvh">
        {order ? (
          <OrderConfirmation order={order} />
        ) : (
          <CheckoutForm user={session?.user} />
        )}
      </div>
    </Layout>
  );
}
