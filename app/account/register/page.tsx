import Layout from "@/app/components/Layout";
import { FormInput, FormHeading } from "@/app/components/FormElements";
import { auth, signIn } from "@/app/auth";
import { redirect } from "next/navigation";
import { Button } from "@/app/components/Button";
import { Link } from "@/app/components/Link";

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
            <FormHeading text="Create account" />
            <FormInput label="Email address" name="email" type="email" />
            <div>
              <Button text="Create account" className="mt-4 mr-4" />
              <Link text="Sign in" href="/account/login" type="secondary" />
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}
