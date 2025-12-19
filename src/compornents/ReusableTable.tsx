import React from "react";

export type Column<T> = {
  key: string;
  label: string;
  accessor?: (row: T) => React.ReactNode;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

export function ReusableTable<T>({ columns, data }: Props<T>) {
  return (
    <table className="min-w-full border border-gray-400 text-center">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-2 py-2 border border-gray-400"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((col) => {
              const content = col.render
                ? col.render(row)
                : col.accessor
                ? col.accessor(row)
                : null;

              return (
                <td
                  key={col.key}
                  className="px-2 py-2 border border-gray-400"
                >
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
