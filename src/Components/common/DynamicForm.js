import React from "react";

const DynamicForm = ({ formData, handleChange, handleNestedChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {formData.map((field) => {
        if (field.type === "nested") {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium">{field.label}</label>
              {Object.keys(field.value).map((nestedField) => (
                <input
                  key={nestedField}
                  type="text"
                  name={nestedField}
                  value={field.value[nestedField]}
                  onChange={(e) => handleNestedChange(e, field.name)}
                  className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md w-full"
                  placeholder={field.placeholder || ""}
                />
              ))}
            </div>
          );
        }
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md w-full"
              placeholder={field.placeholder || ""}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicForm;
