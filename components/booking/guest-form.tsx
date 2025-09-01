import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { useAppContext } from "@/app/context/context";

export default function GuestInfoForm() {
  const { searchParams } = useAppContext();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit() {

    try {
      const result = await fetch(
        "http://localhost:3001/api/order/confirm-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({form, searchParams}),
        }
      );

      console.log(result);
      // Reload the list
    } catch (error) {
      console.error("Property creation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create property"
      );
    }
  }

  return (
    <>
      <h1 className="font-bold text-4xl m-8">
        Almost there enter your details
      </h1>
      {/* {isError && <p className="m-auto">{isError?.message}</p>} */}
      <div className="grid grid-cols-1 w-2/3 md:grid-cols-2 gap-6 shadow-md p-16">
        <div>
          <label className="block text-sm font-semibold mb-2">First Name</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Last Name</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">email</label>
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Mobile no:</label>
          <input
            name="mobile"
            type="text"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <Button
          className="w-full bg-teal-500 hover:bg-teal-700"
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </div>
    </>
  );
}
