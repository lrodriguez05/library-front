import Content from "./home_components/content";
import Footer from "./home_components/footer";
import Header from "./home_components/header";

function Home() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] grid-cols-[20%_80%] min-h-screen">
      <header className="col-span-2 sticky top-0 z-50 bg-amber-100 shadow">
        <nav className="flex px-9 py-5 justify-between">
          <h1>Juancito</h1>
          <ul className="flex">
            <li>Mi perfil</li>
            <li>Libros</li>
            <li>Sedes</li>
          </ul>
        </nav>
      </header>
      <aside className="overflow-y-auto h-full border-r border-gray-300 p-5">
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Juancito</h2>
          <ul className="space-y-2">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
          </ul>
        </div>
      </aside>
      <section name="content" className="p-5">
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
        <h1>Periquito perez</h1>
      </section>
      <footer className="p-5">
        <h1 className="text-center">Todos los derechos reservados 2025</h1>
      </footer>
    </section>
  );
}

export default Home;


import Content from "./home_components/content";
import Footer from "./home_components/footer";
import Header from "./home_components/header";

function Home() {
  return (
    <section className="grid grid-rows-[auto_auto_1fr] grid-cols-1 md:grid-cols-[15%_85%] h-screen bg-slate-100">
      {/* Header sticky */}
      <header className="col-span-2 sticky top-0 z-50 bg-blue-100 shadow">
        <nav className="flex px-9 py-5 justify-between">
          <h1>Juancito</h1>
          <ul className="flex gap-4">
            <li>Mi perfil</li>
            <li>Libros</li>
            <li>Sedes</li>
          </ul>
        </nav>
      </header>
      <div className="p-4 col-span-2"></div>
      {/* Sidebar con scroll independiente y sticky interno */}
      <aside className="hidden md:block overflow-y-auto h-full border-r border-slate-300 p-5 row-span-2">
        <div className="sticky top-0 bg-yellow-200 mb-10">
          <h2 className="font-bold text-lg mb-4">Juancito</h2>
          <ul className="space-y-2"></ul>
        </div>
      </aside>

      {/* Main content con scroll independiente */}
      <section className="overflow-y-auto h-full px-5 pt-5 relative">
        <div className="space-y-4">
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
          <h3>asd</h3>
        </div>
        <footer className=" bg-blue-100 p-5 w-screen absolute bottom-0 left-[-10%] mt-5">
          <h1 className="text-center">Todos los derechos reservados 2025</h1>
        </footer>
      </section>
    </section>
  );
}

export default Home;