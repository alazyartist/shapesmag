// components/EventForm.js
import type { Events } from "@prisma/client";
import { useRef, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { api } from "~/utils/api";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

const AddEventModal = ({ setActiveView, events }) => {
  const ref = useRef();
  useClickOutside(ref, () => setActiveView(null));
  const [formData, setFormData] = useState({
    event_id: "",
    date: "",
    name: "",
    location: "",
    host: "",
    contactinfo: "",
    ticketlink: "",
    details: "",
  });
  const { mutate: createEvent } = api.events.createEvent.useMutation();
  const { mutate: updateEvent } = api.events.updateEvent.useMutation();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateEvent = (event: Events) => {
    console.log({ date: formatDate(event.date), ...event });
    setFormData({
      ...event,
      date: formatDate(event.date),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.event_id
      ? updateEvent({ ...formData })
      : createEvent({ ...formData });
    // Handle form submission logic here (e.g., send data to API)
    setActiveView(null);
    console.log("Form submitted:", formData);
  };
  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div ref={ref} className="grid grid-cols-[1fr,3fr]">
        <div className="rounded-l-md  bg-zinc-900 text-zinc-300">
          {events &&
            events?.map((event: Events) => {
              return (
                <div
                  key={event?.event_id}
                  className="flex justify-between gap-2 p-2"
                >
                  <p className="">{event?.name}</p>
                  <div className="flex place-items-center gap-2">
                    <button
                      onClick={() => {
                        handleUpdateEvent(event);
                      }}
                      className="rounded-md bg-zinc-800 p-1 text-xs"
                    >
                      edit
                    </button>
                    <div>{new Date(event?.date).getFullYear()}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-r-md bg-zinc-300 bg-opacity-70 p-2"
        >
          <div>
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="date">
              Date:
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="name">
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
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="location">
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
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="host">
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
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="contactinfo">
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
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="ticketlink">
              <div>
                Ticket Link:{" "}
                <div className="">
                  <p className="text-xs">do not include https://www.</p>
                  <p className="text-xs">websites only.</p>
                </div>
              </div>
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
            <label className={"grid grid-cols-[1fr,2fr]"} htmlFor="details">
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
          <div className="flex gap-2">
            <button
              className="rounded-md bg-zinc-300 p-2 text-zinc-800"
              type="submit"
            >
              {formData.event_id ? "Update" : "Create"} Event
            </button>
            {formData.event_id && (
              <button
                className="rounded-md bg-zinc-300 p-2 text-zinc-800"
                type="button"
                onClick={() =>
                  setFormData({
                    event_id: "",
                    date: "",
                    name: "",
                    location: "",
                    host: "",
                    contactinfo: "",
                    ticketlink: "",
                    details: "",
                  })
                }
              >
                Clear
              </button>
            )}

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
