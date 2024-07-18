import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Component4 = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    start_date: "",
    end_date: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(lowercasedQuery)
    );
    setEmployees(filtered);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(employees.length / itemsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddEmployee = () => {
    setIsAdding(true);
    setCurrentPage(Math.ceil(employees.length / itemsPerPage));
  };

  const handleConfirmAdd = async () => {
    try {
      await axios.post("http://localhost:5002/api/employees", newEmployee);
      fetchEmployees();
      setIsAdding(false);
      setNewEmployee({
        name: "",
        start_date: "",
        end_date: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewEmployee({
      name: "",
      start_date: "",
      end_date: "",
      salary: "",
    });
  };

  const renderTableRows = () => {
    const rows = [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = employees.slice(startIndex, endIndex);

    currentItems.forEach((employee) => {
      rows.push(
        <tr key={employee.id} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2 text-center">{employee.name}</td>
          <td className="border border-gray-200 p-2 text-center">{new Date(employee.start_date).toLocaleString()}</td>
          <td className="border border-gray-200 p-2 text-center">{new Date(employee.end_date).toLocaleString()}</td>
          <td className="border border-gray-200 p-2 text-center">{employee.salary}</td>
          <td className="border border-gray-200 p-2 text-center">{new Date(employee.created_at).toLocaleString()}</td>
          <td className="border border-gray-200 p-2 text-center">操作</td>
        </tr>
      );
    });

    if (isAdding) {
      rows.push(
        <tr key="new" className="border-b border-gray-200">
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="date"
              value={newEmployee.start_date}
              onChange={(e) => setNewEmployee({ ...newEmployee, start_date: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="date"
              value={newEmployee.end_date}
              onChange={(e) => setNewEmployee({ ...newEmployee, end_date: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="number"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">{new Date().toLocaleString()}</td>
          <td className="border border-gray-200 p-2 text-center">
            <div className="flex flex-row gap-2">
              <button
                className="h-full cursor-pointer py-2 px-4 bg-background-brand-default rounded-radius-200 text-white border border-solid border-background-brand-default"
                onClick={handleConfirmAdd}
              >
                确定
              </button>
              <button
                className="h-full cursor-pointer py-2 px-4 bg-background-brand-default rounded-radius-200 text-white border border-solid border-background-brand-default"
                onClick={handleCancelAdd}
              >
                取消
              </button>
            </div>
          </td>
        </tr>
      );
    }

    while (rows.length < itemsPerPage) {
      rows.push(
        <tr key={`empty-${rows.length}`} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 max-w-full shrink-0 text-darkslategray font-rubik mt-4 bg-white p-4 rounded-xl">
      <div className="w-full flex flex-row items-start justify-start gap-4 max-w-full text-2xl">
        <div className="flex-1 rounded-3xs bg-background-default-default box-border flex flex-row items-center justify-between py-2.5 px-4 min-w-40 max-w-full z-3 border border-solid border-black-100">
          <input
            type="text"
            className="w-full h-full bg-background-default-default border-none focus:outline-none"
            placeholder="请输入员工名"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="h-full cursor-pointer py-2.5 px-8 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-start gap-2 z-3 border border-solid border-background-brand-default"
          onClick={handleSearch}
          style={{ height: "42px" }}
        >
          <div className="relative text-base leading-normal font-body-base text-text-brand-on-brand text-left">
            搜索
          </div>
        </button>
        <button
          className="h-full cursor-pointer py-2.5 px-8 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-start gap-2 z-3 border border-solid border-background-brand-default"
          onClick={handleAddEmployee}
          style={{ height: "42px" }}
        >
          <div className="relative text-base leading-normal font-body-base text-text-brand-on-brand text-left">
            添加
          </div>
        </button>
      </div>
      <table className="self-stretch table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">员工名</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">上岗时间</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">离岗时间</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">薪水</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">创建时间</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">操作</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-text-default-default mt-2">
        <div className="w-full flex flex-row items-center justify-between gap-2 max-w-full z-3">
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-2 px-3 gap-2 opacity-50 text-text-default-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-4"
              loading="lazy"
              alt=""
              src="arrow-left.svg"
            />
            <div className="relative leading-normal inline-block min-w-12">上一页</div>
          </button>
          <div className="flex-1 flex flex-row items-center justify-center gap-2 min-w-[270px]">
            {[...Array(Math.ceil(employees.length / itemsPerPage)).keys()].map((page) => (
              <div
                key={page}
                className={`rounded-radius-200 flex flex-col items-center justify-center py-2 px-3 ${
                  currentPage === page ? "bg-background-brand-default text-text-brand-on-brand" : ""
                }`}
              >
                <div
                  className="relative leading-normal inline-block min-w-2 cursor-pointer"
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </div>
              </div>
            ))}
          </div>
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-2 px-3 gap-2"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(employees.length / itemsPerPage) - 1}
          >
            <div className="relative leading-normal inline-block min-w-12">下一页</div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-4"
              loading="lazy"
              alt=""
              src="arrow-right.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

Component4.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default Component4;
