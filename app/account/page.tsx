import Layout from "@/app/components/Layout";
import { auth, signOut } from "@/app/auth";
import { Button } from "@/app/components/Button";
import { Link } from "@/app/components/Link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const { name, email } = session?.user || {};

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
          <div className="pt-16 pb-10 flex flex-col items-center">
            <p className="capitalize text-lg lg:text-xl mb-2">No orders yet</p>
            <p className="text-sm px-4 text-center max-w-[450px]">
              Looks like you haven&apos;t placed any orders yet! When you do,
              details of all your Glossier orders will be available here.
            </p>
            <Link
              className="mt-4"
              text="Back to shopping"
              href="/"
              type="primary"
            />
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
