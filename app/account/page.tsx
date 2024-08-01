import Layout from "@/app/components/Layout";
import { auth, signOut } from "@/app/auth";
import { Button } from "@/app/components/Button";
import { Link as CustomLink } from "@/app/components/Link";
import { redirect } from "next/navigation";
import { getUserOrders } from "../actions";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const { name, email } = session?.user || {};
  const orders = await getUserOrders(session?.user?.id ?? "");

  if (email) {
    return name ? (
      <Layout>
        <div className="mt-28 w-full">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-[28px] lg:text-3xl tracking-wide">Account</h2>
            <Button
              text="Sign out"
              onClick={async () => {
                "use server";
                await signOut();
              }}
              className="mt-1"
            />
          </div>
          <Heading text="Order history" />
          <div className="pb-10">
            {orders.length > 0 ? (
              <ul className="pt-10 flex flex-wrap gap-4">
                {orders.map((order) => (
                  <li key={order.id} className="text-sm">
                    <Link
                      href={`/checkouts/${order.id}`}
                      className="uppercase underline"
                    >
                      Order #{order.id.substring(0, 8)}
                    </Link>
                    <div className="flex mt-0.5">
                      <p>{order.orderDate.toLocaleDateString("en-US")}</p>
                      <span className="mx-1">-</span>
                      <p>
                        {order.orderDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                    <div className="my-1">
                      <p>
                        {order.productCount}
                        <span className="ml-1">
                          {order.productCount > 1 ? `items` : `item`}
                        </span>
                      </p>
                    </div>
                    <p>${order.totalCost}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <div className="pt-16 flex flex-col items-center">
                  <p className="capitalize text-lg lg:text-xl mb-2">
                    No orders yet
                  </p>
                  <p className="text-sm px-4 text-center max-w-[450px]">
                    Looks like you haven&apos;t placed any orders yet! When you
                    do, details of all your Glossier orders will be available
                    here.
                  </p>
                  <CustomLink
                    className="mt-4"
                    text="Back to shopping"
                    href="/"
                    type="primary"
                  />
                </div>
              </>
            )}
          </div>
          <Heading text="Account details" />
          <div className="text-sm">
            <p className="mt-6 mb-1">{name}</p>
            <p>{email}</p>
          </div>
        </div>
      </Layout>
    ) : (
      redirect("/account/complete")
    );
  } else {
    redirect("/account/login");
  }
}

function Heading({ text }: { text: string }) {
  return (
    <h3 className="uppercase text-xs pb-4 border-b border-black">{text}</h3>
  );
}
