import React, { useState, useContext } from "react";
import "./Navigation.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import toast from "react-hot-toast";
import useAuthContext from "../../../hooks/useAuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLoading, logout } = useAuthContext();
  const pathname = useLocation().pathname;

  const menuItems = ["Home", "About", "Appointment"];

  // logout
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((err) => toast.error(err?.code));
  };

  // for dashboard nav class
  const isDashboard = pathname.includes("dashboard");

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`py-4 absolute top-0 bg-[var(--pri-color)] text-[#f3f3f3] z-10 ${
        isDashboard && "dashboard-nav"
      }`}
      shouldHideOnScroll
    >
      {/* brand logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src={logo} alt="logo" className="h-[50px]" />
          <p className="font-bold text-[30px] pl-3">
            <span className="text-[var(--sec-color)]">Doc</span> House
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* lg device navbar links */}
      <NavbarContent
        className="hidden sm:flex gap-8 text-[18px] w-[90%]"
        justify="end"
      >
        <NavbarItem>
          <Link color="foreground" to="/" className="text-lg">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/" className="text-lg">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/appointment" className="text-lg">
            Make Appointment
          </Link>
        </NavbarItem>

        {isLoading ? (
          <Spinner color="success" />
        ) : (
          <>
            {user?.uid ? (
              <NavbarItem className="flex">
                <p className="text-lg flex items-center space-x-3">
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar src={user?.photoURL} className="cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dropdown">
                      <DropdownItem key={"my_appointments"}>
                        <Link to="/dashboard/myAppointments">
                          My Appointments
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Button
                    color="success"
                    variant="bordered"
                    onClick={handleLogout}
                    type="button"
                  >
                    Log Out
                  </Button>
                </p>
              </NavbarItem>
            ) : (
              <>
                {pathname.includes("login") ? (
                  <NavbarItem className="flex">
                    <Link to="/register" className="text-lg">
                      Register
                    </Link>
                  </NavbarItem>
                ) : (
                  <NavbarItem className="flex">
                    <Link to="/login" className="text-lg">
                      Login
                    </Link>
                  </NavbarItem>
                )}
              </>
            )}
          </>
        )}
      </NavbarContent>

      {/* dropdown menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to="/"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}

        {isLoading ? (
          <Spinner color="success" />
        ) : (
          <>
            {user?.uid ? (
              <NavbarItem className="flex">
                <p className="text-lg flex items-center space-x-3">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar src={user?.photoURL} className="cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key={"my_appointments"}>
                        <Link to="/dashboard/myAppointments">
                          My Appointments
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Button
                    color="success"
                    variant="solid"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </p>
              </NavbarItem>
            ) : (
              <>
                {pathname.includes("login") ? (
                  <NavbarItem className="flex">
                    <Link to="/login" className="text-lg">
                      Login
                    </Link>
                  </NavbarItem>
                ) : (
                  <NavbarItem className="flex">
                    <Link to="/register" className="text-lg">
                      Register
                    </Link>
                  </NavbarItem>
                )}
              </>
            )}
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
