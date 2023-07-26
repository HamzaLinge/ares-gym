import Banner from "@/components/Banner";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-screen flex-col items-center">
      <Header />
      <Banner />
    </main>
  );
}
