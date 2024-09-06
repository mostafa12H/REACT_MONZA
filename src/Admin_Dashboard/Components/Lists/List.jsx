import React, { useState, useEffect } from "react";
import Pagination from "./../Pagination/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import { useForm } from "react-hook-form";

const List = ({
  columns,
  apiUrl,
  onEdit,
  onDelete,
  itemsPerPage = 5,
  title = "List",
  handleFilterChange,
  filterKey,
  filterValue, 
  filterOptions, 
  addurl,
  showFilters = true, 
  editurl
}) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchItems();
  }, [apiUrl]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [items, searchQuery, sortConfig, filterValue]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();

      setItems(data.users || data[Object.keys(data)[0]].map((item) => ({
        ...item,
        id: item.id || item._id,  
      })));
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching items.");
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let updatedItems = [...items];

    if (filterKey && filterValue) {
      updatedItems = updatedItems.filter(
        (item) =>
          item[filterKey] && item[filterKey].toLowerCase() === filterValue.toLowerCase()
      );
    }

    if (searchQuery) {
      updatedItems = updatedItems.filter((item) =>
        columns.some((col) =>
          item[col.key]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      updatedItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredItems(updatedItems);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter((item) => item.id !== id));

      toast.success("Item deleted successfully.");
      if (onDelete) onDelete(id);
    } catch (error) {
      toast.error("Error deleting.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    columns.forEach((col) => {
      setValue(col.key, item[col.key] || '');
    });
    setIsEditModalOpen(true);
  };

  const onEditSubmit = async (data) => {
  try {
    let response;

    if (!editurl || editurl === "") {
      response = await fetch(`${apiUrl}/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(`${editurl}/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const updatedItem = await response.json();

    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    setIsEditModalOpen(false);
    toast.success("Item updated successfully.");
    if (onEdit) onEdit(updatedItem);
  } catch (error) {
    toast.error("Error updating.");
  }
};


const handleAdd = async (data) => {
  try {
    let response;

    if (!addurl || addurl === "") {
      response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(`${addurl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    if (!response.ok) {
      throw new Error("Failed to add item");
    }

    const addedItem = await response.json();

    setItems([addedItem, ...items]);

    setIsAddModalOpen(false);
    toast.success("Item added successfully.");
  } catch (error) {
    toast.error("Error adding item.");
  }
};


  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "↕";
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={() => {
            reset(); 
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Add New
        </button>
      </div>

      {showFilters && (
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 mt-1 mb-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          />
          <ReusableSelect
            filterOptions={filterOptions}
            filterRole={filterValue}
            handleRoleFilterChange={handleFilterChange} 
          />
        </div>
      )}

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="text-left">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      {col.label}{" "}
                      <span className="ml-2">{getSortIcon(col.key)}</span>
                    </div>
                  </th>
                ))}
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id} 
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-2">
                      {col.render ? (
                        col.render(item)
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
        visiblePages={visiblePages}
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75  zindex flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Edit {title.slice(0, -1)}
            </h3>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              {columns.map((col) => (
                <div className="mb-4" key={col.key}>
                  <label className="block text-gray-900 dark:text-white mb-2">
                    {col.label}
                  </label>
                  <input
                    type={col.type || "text"}
                    {...register(col.key, { required: "This field is required" })}
                    className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors[col.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[col.key].message}</p>
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 zindex flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Add New {title.slice(0, -1)}
            </h3>
            <form onSubmit={handleSubmit(handleAdd)}>
              {columns.map((col) => (
                <div className="mb-4" key={col.key}>
                  <label className="block text-gray-900 dark:text-white mb-2">
                    {col.label}
                  </label>
                  <input
                    type={col.type || "text"}
                    {...register(col.key, { required: "This field is required" })}
                    className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors[col.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[col.key].message}</p>
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
