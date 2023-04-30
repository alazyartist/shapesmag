import React from "react";

import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  event_id: string;
  versus: string;
}

const AddBattleModal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    event_id: "",
    versus: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-4">
        <label htmlFor="event_id" className="block text-sm font-medium">
          Event ID
        </label>
        <input
          type="text"
          name="event_id"
          id="event_id"
          value={formData.event_id}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="versus" className="block text-sm font-medium">
          Versus
        </label>
        <input
          type="text"
          name="versus"
          id="versus"
          value={formData.versus}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AddBattleModal;
