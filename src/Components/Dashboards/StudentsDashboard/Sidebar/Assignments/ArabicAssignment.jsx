import React from "react";
import close from "../../../../../images/close.svg";
import DataTable from "react-data-table-component";
import { Link, Outlet } from "react-router-dom";

function ArabicAssignment({
  data,
  customStyles,
  goToTable,
  backFromTable,
  columns,
  pending,
  open,
  sideWidth,
  location,
  id,
  move,
}) {
  return (
    <div className="Assignments flex">
      <div
        className="left"
        style={{ width: open && `calc(100% - ${sideWidth}px )` }}
      >
        <h1 className="capitalize text-3xl my-6">Assignments</h1>
        <div className="assignment-table">
          <DataTable
            columns={columns}
            data={data}
            highlightOnHover
            progressPending={pending}
            customStyles={customStyles}
            onRowClicked={(e) => goToTable(e)}
          />
        </div>
      </div>
      <div className={`show-table w-[632px] ${open && "!right-0"}`}>
        <div className="close">
          <img src={close} alt="close" onClick={() => backFromTable()} />
        </div>
        <div className="unit">
          <span className="capitalize">unit 2</span>
          <h2 className="capitalize">unit test</h2>
        </div>
        <div className="move after:bg-grayD flex items-center">
          {move.map((e, idx) => (
            <Link
              key={idx}
              to={e + "/" + id}
              className={
                location.pathname.includes(e)
                  ? "text-primary-100 active mr-3 capitalize after:bg-primary-100"
                  : "text-normalColor mr-3 capitalize "
              }
            >
              {e}
            </Link>
          ))}
        </div>
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ArabicAssignment;
