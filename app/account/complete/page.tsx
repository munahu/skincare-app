import { updateUser } from "@/app/actions";
import { auth } from "@/app/auth";
import { Button } from "@/app/components/Button";
import { FormHeading, FormInput } from "@/app/components/FormElements";
import Layout from "@/app/components/Layout";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const updateUserWithId = updateUser.bind(null, String(session?.user?.id));
  return (
    <Layout>
      <div className="flex justify-center">
        <form
          className="mt-28 max-w-[460px] w-full"
          action={async (formData) => {
            "use server";
            await updateUserWithId(formData);
            redirect("/account");
          }}
        >
          <FormHeading text="Complete your profile" />
          <FormInput label="First name" name="firstName" type="text" />
          <FormInput label="Last name" name="lastName" type="text" />
          <div>
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
}
