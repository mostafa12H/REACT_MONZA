import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import DynamicForm from "../../../Components/common/DynamicForm";
import Modal from "../../../Components/common/Modal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    maidenName: "Smith",
    age: 28,
    gender: "female",
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
    username: "emilys",
    password: "emilyspass",
    birthDate: "1996-5-30",
    image: "favicon.ico",
    bloodGroup: "O-",
    height: 193.24,
    weight: 63.16,
    eyeColor: "Green",
    hair: {
      color: "Brown",
      type: "Curly",
    },
    address: {
      address: "626 Main Street",
      city: "Phoenix",
      state: "Mississippi",
      stateCode: "MS",
      postalCode: "29112",
      country: "United States",
    },
    university: "University of Wisconsin--Madison",
    company: {
      department: "Engineering",
      name: "Dooley, Kozey and Cronin",
      title: "Sales Manager",
    },
    role: "admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNestedInputChange = (e, parentKey) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [parentKey]: { ...profile[parentKey], [name]: value },
    });
  };

  const handleSave = () => {
    fetch(`https://dummyjson.com/users/${profile.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(t("profile_updated_successfully"));
        setProfile(data);
        dispatch(setUser(data));
        setIsModalOpen(false);
      })
      .catch((error) => {
        toast.error(t("error_updating_profile"));
        console.error("Error:", error);
      });
  };

  const formData = [
    { label: t("first_name"), name: "firstName", value: profile.firstName },
    { label: t("last_name"), name: "lastName", value: profile.lastName },
    { label: t("email"), name: "email", value: profile.email, type: "email" },
    { label: t("phone"), name: "phone", value: profile.phone },
    { label: t("username"), name: "username", value: profile.username },
    { label: t("role"), name: "role", value: profile.role },
    {
      label: t("company"),
      name: "company",
      value: profile.company,
      type: "nested",
    },
    {
      label: t("address"),
      name: "address",
      value: profile.address,
      type: "nested",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <FaUser className="text-2xl mr-4 text-blue-500 dark:text-purple-500" />
        <div>
          <h2 className="text-lg font-medium">{t("profile")}</h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <img
          src={profile.image}
          alt="User Avatar"
          className="rounded-full h-12 w-12 sm:h-16 sm:w-16"
        />
        <div className="flex flex-col">
          <h3 className="text-md sm:text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 sm:mt-1">
            {profile.email}
          </p>
          <button
            className="mt-2 sm:mt-0 bg-blue-500 dark:bg-purple-600 text-white py-2 px-4 rounded-md sm:self-start"
            onClick={() => setIsModalOpen(true)}
          >
            {t("edit_profile")}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DynamicForm
          formData={formData}
          handleChange={handleInputChange}
          handleNestedChange={handleNestedInputChange}
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 dark:bg-purple-600 text-white py-2 px-4 rounded-md"
          >
            {t("save_profile")}
          </button>
        </div>
      </Modal>
    </div>
  );
}
