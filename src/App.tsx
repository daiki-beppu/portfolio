import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { About } from "./components/sections/About";
import { Career } from "./components/sections/Career";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-14">
        <Hero />
        <About />
        <Projects />
        <Career />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;
