import FormAuth from "@/app/auth/_components/FormAuth";

export default async function AuthPage() {
  return (
    <section
      className={"bg-background flex flex-1 items-center justify-center"}
    >
      <FormAuth />
    </section>
  );
}
