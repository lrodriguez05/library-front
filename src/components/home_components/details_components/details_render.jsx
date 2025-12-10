function DetailsRender({ dataBook }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="w-full flex justify-center items-center lg:col-span-1">
        <img
          className="rounded-lg w-full max-h-[40rem] object-cover"
          src={dataBook?.imagen}
          alt="Imagen del libro"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  text-gray-700 w-full lg:col-span-2">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">Título:</span>
          <span>{dataBook?.titulo}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">Autor:</span>
          <span>{dataBook?.autor}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">Cantidad:</span>
          <span>{dataBook?.cantidad}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">Sede:</span>
          <span>{dataBook?.sede}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">Edición:</span>
          <span>{dataBook?.edicion}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">
            Fecha de Publicación:
          </span>
          <span>{dataBook?.anio_publicacion}</span>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-900 text-lg">Detalles:</span>
          <p className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50 leading-relaxed">
            {dataBook?.detalles}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsRender;
