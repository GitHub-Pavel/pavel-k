import { Header } from "@/modules";
import { About } from "@/modules/about/About";
import { Preloader } from "@/ui";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Header />
      <About />
    </main>
  );
}
