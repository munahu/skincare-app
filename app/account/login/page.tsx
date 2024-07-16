import Layout from "@/app/components/Layout";
import { FormInput, FormHeading } from "@/app/components/FormElements";
import { Button } from "@/app/components/Button";
import { Link } from "@/app/components/Link";
import { auth, signIn } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const { name, email } = session?.user || {};

  if (email) {
    return redirect(name ? "/account" : "/account/complete");
  } else {
    return (
      <Layout>
        <div className="flex justify-center">
          <form
            className="mt-28 max-w-[460px] w-full"
            action={async (formData: FormData) => {
              "use server";
              await signIn("nodemailer", formData);
            }}
          >
            <FormHeading text="Login" />
            <FormInput label="Email address" name="email" type="email" />
            <div>
              <Button text="Sign in" className="mt-4 mr-4" />
              <Link
                text="Create account"
                href="/account/register"
                className="mt-4"
                type="secondary"
              />
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}
