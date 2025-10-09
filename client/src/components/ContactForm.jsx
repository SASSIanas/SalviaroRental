import { Send } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ContactForm = () => {

    const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
   const backendUrl = import.meta.env.VITE_BASE_URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(backendUrl+"/api/contact/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Message sent successfully!");
      e.target.reset();
    } else {
      toast.error(result.error || "Failed to send message");
    }
  } catch (err) {
    toast.error("Server error");
  }
};

  return (
    <>
            {/* Contact Form */}
        <div className="border border-borderColor rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-borderColor rounded text-sm"
                required
              />
              
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-borderColor rounded text-sm"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-borderColor rounded text-sm"
              />
              
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-borderColor rounded text-sm"
              >
                <option value="">Select subject</option>
                <option value="general">General Inquiry</option>
                <option value="rental">Car Rental</option>
                <option value="support">Customer Support</option>
              </select>
            </div>
            
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your message"
              className="w-full px-3 py-2 border border-borderColor rounded text-sm"
              required
            ></textarea>
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dull text-white px-4 py-2 rounded text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
    </>
  )
}

export default ContactForm