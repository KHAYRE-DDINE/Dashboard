import React from "react";
import "./DataTable.css";
import { FiCalendar } from "react-icons/fi";

function DataTable({ data, goToTable }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="w-[250px]">Assignment</th>
            <th className="w-[7.75rem]">status</th>
            <th className="w-[7.75rem]">date</th>
            <th className="w-[4rem]">teacher</th>
            <th className="w-[6.25rem]">updates</th>
            <th className="w-[2rem]"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, id) => (
            <tr onClick={() => goToTable(id + 1)}>
              <td className="w-[250px]">{d.assignment}</td>
              <td className="w-[7.75rem]">
                <td>{d.status}</td>
              </td>
              <td className="w-[7.75rem]">
                <td>
                  <FiCalendar />
                  {d.date}
                </td>
              </td>
              <td className="w-[4rem]">
                <img src={d.teacher} alt="teacher" />
              </td>
              <td className="w-[6.25rem]">{d.updates}</td>
              <td className="w-[2rem]">{d.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
