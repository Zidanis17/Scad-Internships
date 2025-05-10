import React from 'react';

// Table Component
const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b text-sm text-gray-700">
                  {col.render ? col.render(row) : row[col.dataKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;