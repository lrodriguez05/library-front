import { Delete } from "./delete_book";
import { ToEdit } from "./to_edit_book";
import { ToLoan } from "./to_loan_book";
import { ToDetails } from "./to_details_book";

export function columnsGenerator(role) {
  return [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Autor",
      dataIndex: "autor",
      key: "autor",
    },
    {
      title: "Prestado",
      dataIndex: "prestado",
      key: "prestado",
      render: (value) => (
        <span className={value ? "text-red-500" : "text-green-500"}>
          {value ? "Prestado" : "Disponible"}
        </span>
      ),
    },

    {
      title: "Cant. Ejemplares",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Veces Prestado",
      dataIndex: "veces_prestado",
      key: "veces_prestado",
    },
    {
      title: "Sede",
      dataIndex: "sede",
      key: "sede",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (data) => {
        if (role === "admin") {
          return (
            <div className="flex gap-3">
              <Delete id={data.id} />
              <ToEdit id={data.id} />
              <ToLoan id={data.id} title={data.titulo} autor={data.autor} />
              <ToDetails id={data.id} />
            </div>
          );
        }

        return (
          <div className="flex gap-3">
            <ToLoan id={data.id} title={data.titulo} autor={data.autor} />
            <ToDetails id={data.id} />
          </div>
        );
      },
    },
  ];
}
