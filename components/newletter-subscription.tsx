"use client";
import { postEnquiryData } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsLetter({ email, name }: { email: string; name: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: name||"",
    email: email||"",
    phone: "00000000000",
    subject: "SUBSCRIBED",
    message: "this email just subscribed for the newsletter",
    subscribe: true
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // const data = { ...formData, subscribe: marketing };

    console.log(formData);
    const response = await postEnquiryData(formData);


    console.log(response)

    if (response.ok) {
      toast.success("Thank you for subscribing, we will get back to you soon");
    } else {
      toast.error("Something went wrong");
    }

    setIsLoading(false);

    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   subject: "",
    //   message: "",
    // });
    // setMarketing(false);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Newsletter</h3>
      <p className="text-gray-300 mb-4">
        Subscribe to our newsletter for special offers and updates.
      </p>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          id="email"
          name="email"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
