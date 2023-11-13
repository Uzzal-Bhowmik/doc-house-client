import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FiUsers } from "react-icons/fi";
import { FaUserDoctor, FaUserPlus } from "react-icons/fa6";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        {/* Sidebar  */}
        <div
          className={`fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64  h-full text-white transition-all duration-300 border-none sidebar ${
            isAdmin ? "bg-[#2828bc]" : "bg-[#07332f]"
          }`}
        >
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow mt-24">
            {isAdmin ? (
              // ADMIN only route
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      Main
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to={"/dashboard/adminhome"}
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover: pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/allUsers"}
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FiUsers className="w-5 h-5" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Manage Users
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/allDoctors"}
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FaUserDoctor className="w-4 h-4" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Manage Doctors
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/addDoctor"}
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FaUserPlus className="w-5 h-5" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Add a Doctor
                    </span>
                  </Link>
                </li>

                {/* Homepage Divider */}
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center mt-5 h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      HOMEPAGE
                    </div>
                  </div>
                </li>

                <li>
                  <Link
                    to="/"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/appointment"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-600  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Make Appointment
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              // USER only routes
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      Main
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/dashboard/userhome"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952] text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      User Home
                    </span>
                  </Link>
                </li>
                {/* --------------------------- */}
                <li>
                  <Link
                    to="/dashboard/myAppointments"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952] text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      My Appointments
                    </span>
                  </Link>
                </li>
                {/* --------------------- */}
                <li>
                  <Link
                    to="/dashboard/paymentHistory"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952] text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Payment History
                    </span>
                  </Link>
                </li>
                {/* ------------------------------- */}
                <li>
                  <Link
                    to="/dashboard/myReview"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952] text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Add Review
                    </span>
                  </Link>
                </li>

                {/* --------------- Divider ------------------ */}
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center mt-5 h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      HOMEPAGE
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952]  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/appointment"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#0c5952]  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-[#20f1de] pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Make Appointment
                    </span>
                  </Link>
                </li>
              </ul>
            )}

            <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright &copy; Uzzal Bhowmik 2023
            </p>
          </div>
        </div>
        {/* Sidebar */}

        {/*--------------- Content -----------------*/}
        <div className="min-h-screen ml-14 pt-32 md:ml-64 bg-[#f1f5f9] p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
