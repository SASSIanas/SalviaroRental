import React, { useState } from 'react'
import Title from '../components/Title'
import { MapPin, Phone, Mail, Clock, Send, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:3000/api/contact/send", {
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


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title 
        title={'Contact Us'}
        subTitle={'Get in touch with us for any inquiries'}
      />
      
      <div className="mt-8 space-y-8">
        {/* Contact Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>
            <p className="text-gray-600 text-sm">
              We're here to help you with any questions about our car rental services.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Address</h4>
                  <p className="text-gray-600 text-sm">123 Automotive Street<br />Casablanca, Morocco</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
                  <p className="text-gray-600 text-sm">+212 522 123 456</p>
                </div>
                <button onClick={() => copyToClipboard('+212522123456')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Email</h4>
                  <p className="text-gray-600 text-sm">contact@salviaro.autos</p>
                </div>
                <button onClick={() => copyToClipboard('contact@salviaro.autos')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Business Hours</h4>
                  <p className="text-gray-600 text-sm">
                    Mon - Fri: 8:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
            <img 
              src={assets.raktma} 
              alt="Our contact office" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

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

        {/* Map Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
          <div className="border border-borderColor rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26505.900882506492!2d-5.576992906312063!3d33.857766789837704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sma!4v1759743314590!5m2!1sfr!2sma" 
              width="100%" 
              height="300" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="SALVIARO Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
