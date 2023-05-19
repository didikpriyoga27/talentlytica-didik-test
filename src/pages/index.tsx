import { useCallback, useState } from "react";

export default function Home() {
  const n = 10;
  const [columns, setColumns] = useState(Array(4).fill(Array(n).fill(1)));

  const handleSelectChange = useCallback(
    (event: any, cIndex: number, rIndex: number) => {
      const newRows = [...columns[cIndex]];
      newRows[rIndex] = Number(event.target.value);

      const newColumns = [...columns];
      newColumns[cIndex] = newRows;

      setColumns(newColumns);
    },
    [columns]
  );

  const headers = Array.from(Array(4).keys()).map((item) => {
    return {
      key: `aspek_penilaian_${item + 1}`,
      text: `Aspek Penilaian ${item + 1}`,
    };
  });

  const options = Array.from(Array(10).keys(), (x) => x + 1);

  const rows = Array.from(Array(10).keys()).map((item) => {
    return {
      key: `mahasiswa_${item + 1}`,
      text: `Mahasiswa ${item + 1}`,
    };
  });

  const renderOptions = useCallback(
    (rowIndex: number) => {
      return (
        <>
          {columns.map((column, columnIndex) => {
            return (
              <td key={columnIndex}>
                <select
                  value={column[columnIndex][rowIndex]}
                  onChange={(e) => handleSelectChange(e, columnIndex, rowIndex)}
                  className="select select-bordered w-full max-w-xs"
                >
                  {options.map((i, optionIndex) => (
                    <option key={optionIndex}>{i}</option>
                  ))}
                </select>
              </td>
            );
          })}
        </>
      );
    },
    [columns, handleSelectChange, options]
  );

  return (
    <main className={`flex min-h-screen flex-col p-4 lg:p-24`}>
      <h1 className={`text-2xl font-mono text-center mb-8`}>
        Aplikasi Penilaian Mahasiswa
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="h-16">
              <th></th>
              {headers.map((item) => (
                <th key={item.key}>{item.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              return (
                <tr key={row.key}>
                  <th>{row.text}</th>
                  {renderOptions(rowIndex)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button className="btn btn-active btn-primary self-end mt-8 px-32">Simpan</button>
    </main>
  );
}
