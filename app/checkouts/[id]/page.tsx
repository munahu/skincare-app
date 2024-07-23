import Layout from "@/app/components/Layout";
import { auth } from "@/app/auth";
import CheckoutForm from "@/app/components/CheckoutForm";

export default async function Page() {
  const session = await auth();
  return (
    <Layout showNav={false} addContainer={false}>
      <div className="bg-neutral-100">
        <CheckoutForm user={session?.user} />
      </div>
    </Layout>
  );
}
