// components/EventForm.js
import type { Events } from "@prisma/client";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { api } from "~/utils/api";

const AddEventModal = ({ setActiveView, events }) => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    location: "",
    host: "",
    contactinfo: "",
    ticketlink: "",
    details: "",
  });
  const { mutate: createEvent } = api.events.createEvent.useMutation();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEvent({ ...formData });
    // Handle form submission logic here (e.g., send data to API)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div className="grid grid-cols-[1fr,5fr]">
        <div className="bg-zinc-900">
          {events &&
            events?.map((event: Events) => {
              return (
                <div key={event?.event_id} className="flex justify-between">
                  <div>{event?.name}</div>
                  <div>{new Date(event?.date).getFullYear()}</div>
                </div>
              );
            })}
        </div>

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
            <label className={"grid grid-cols-2"} htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
          <div>
            <button
              className="rounded-md bg-zinc-300 p-2 text-zinc-800"
              type="submit"
            >
              Create Athlete
            </button>

            <button
              onClick={() => setActiveView(null)}
              className="rounded-md bg-red-300 p-2 text-red-800"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
