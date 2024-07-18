import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Component3 = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    credit_limit: "",
    consumed_amount: "",
    remaining_credit: "",
    member_type: "ordinary",
    member_number: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(lowercasedQuery)
    );
    setMembers(filtered);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(members.length / itemsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddMember = () => {
    setIsAdding(true);
    setCurrentPage(Math.ceil(members.length / itemsPerPage));
  };

  const handleConfirmAdd = async () => {
    try {
      await axios.post("http://localhost:5002/api/members", newMember);
      fetchMembers();
      setIsAdding(false);
      setNewMember({
        name: "",
        credit_limit: "",
        consumed_amount: "",
        remaining_credit: "",
        member_type: "ordinary",
        member_number: "",
      });
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewMember({
      name: "",
      credit_limit: "",
      consumed_amount: "",
      remaining_credit: "",
      member_type: "ordinary",
      member_number: "",
    });
  };

  const renderTableRows = () => {
    const rows = [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = members.slice(startIndex, endIndex);

    currentItems.forEach((member) => {
      rows.push(
        <tr key={member.id} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2 text-center">{member.name}</td>
          <td className="border border-gray-200 p-2 text-center">{member.credit_limit}</td>
          <td className="border border-gray-200 p-2 text-center">{member.consumed_amount}</td>
          <td className="border border-gray-200 p-2 text-center">{member.remaining_credit}</td>
          <td className="border border-gray-200 p-2 text-center">{member.member_type}</td>
          <td className="border border-gray-200 p-2 text-center">{member.member_number}</td>
          <td className="border border-gray-200 p-2 text-center">{new Date(member.created_at).toLocaleString()}</td>
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
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="number"
              value={newMember.credit_limit}
              onChange={(e) => setNewMember({ ...newMember, credit_limit: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="number"
              value={newMember.consumed_amount}
              onChange={(e) => setNewMember({ ...newMember, consumed_amount: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="number"
              value={newMember.remaining_credit}
              onChange={(e) => setNewMember({ ...newMember, remaining_credit: e.target.value })}
              className="w-full h-full p-1"
            />
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <select
              value={newMember.member_type}
              onChange={(e) => setNewMember({ ...newMember, member_type: e.target.value })}
              className="w-full h-full p-1"
            >
              <option value="ordinary">ordinary</option>
              <option value="prestige">prestige</option>
            </select>
          </td>
          <td className="border border-gray-200 p-2 text-center">
            <input
              type="text"
              value={newMember.member_number}
              onChange={(e) => setNewMember({ ...newMember, member_number: e.target.value })}
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
            placeholder="请输入会员名"
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
          onClick={handleAddMember}
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
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">会员名</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">总额度</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">消费额度</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">剩余额度</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">会员类型</th>
            <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">会员号</th>
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
            {[...Array(Math.ceil(members.length / itemsPerPage)).keys()].map((page) => (
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
            disabled={currentPage === Math.ceil(members.length / itemsPerPage) - 1}
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

Component3.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default Component3;
