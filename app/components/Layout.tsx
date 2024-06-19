import Nav from "./Nav";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <main className="xl:max-w-screen-2xl m-auto">
      <Nav />
      <section className="px-3 md:px-4 py-3 md:py-4 ">{children}</section>
    </main>
  );
}
