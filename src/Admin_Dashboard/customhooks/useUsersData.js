import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, selectUser } from "../../features/userSlice";
import { toast } from "react-toastify";

export const useUsersData = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("");
  const filterOptions = [
    { label: "All", value: "" },
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "User", value: "user" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        dispatch(setUsers(data.users));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleRoleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const userGrowthData = [
    { name: "Jan", users: 30 },
    { name: "Feb", users: 50 },
    { name: "Mar", users: 80 },
    { name: "Apr", users: 120 },
    { name: "May", users: 150 },
    { name: "Jun", users: 200 },
  ];

  const roleDistributionData = [
    {
      name: "Admin",
      value: users.filter((user) => user.role === "admin").length,
      color: "#4f46e5",
    },
    {
      name: "Moderator",
      value: users.filter((user) => user.role === "moderator").length,
      color: "#10b981",
    },
    {
      name: "User",
      value: users.filter((user) => user.role === "user").length,
      color: "#fbbf24",
    },
  ];

  return {
    loading,
    users,
    filterRole,
    filterOptions,
    userGrowthData,
    roleDistributionData,
    handleRoleFilterChange,
  };
};
