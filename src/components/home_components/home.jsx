import { Outlet } from "react-router";
import Aside from "./aside";
import Header from "./header";

function Home() {
  return (
    <section className="grid grid-rows-[auto_1fr] md:grid-cols-[minmax(200px,15%)_1fr] h-screen bg-slate-100">
      <Header />
      <Aside />
      <main className="overflow-y-auto flex flex-col min-h-0 px-5 pt-5">
        <div className="flex-1 space-y-4">
          <Outlet />
        </div>

        <footer className="bg-blue-100 p-5 text-center mt-5 -mx-5">
          <h1>Todos los derechos reservados 2025</h1>
        </footer>
      </main>
    </section>
  );
}

export default Home;
