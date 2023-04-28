// components/EventForm.js
import { FormEvent, ChangeEvent, useState } from "react";

const AddEventModal = () => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    host: "",
    contactinfo: "",
    ticketlink: "",
    details: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-2">
      <div>
        <label className={"grid grid-cols-2"} htmlFor="date">
          Date:
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className={"grid grid-cols-2"} htmlFor="location">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className={"grid grid-cols-2"} htmlFor="host">
          Host:
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className={"grid grid-cols-2"} htmlFor="contactinfo">
          Contact Info:
          <input
            type="text"
            id="contactinfo"
            name="contactinfo"
            value={formData.contactinfo}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className={"grid grid-cols-2"} htmlFor="ticketlink">
          Ticket Link:
          <input
            type="text"
            id="ticketlink"
            name="ticketlink"
            value={formData.ticketlink}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className={"grid grid-cols-2"} htmlFor="details">
          Details:
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEventModal;
