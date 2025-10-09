import React, { useState } from 'react'
import Title from '../components/Title'
import { MapPin, Phone, Mail, Clock,  Copy, MessageCircleMoreIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'
import ContactForm from '../components/ContactForm'
import MapCart from '../components/MapCart'

const ContactUs = () => {

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
                  <p className="text-gray-600 text-sm">Hamria<br />Meknes, Morocco</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
                  <p className="text-gray-600 text-sm">+212 602867321</p>
                </div>
                <button onClick={() => copyToClipboard('+212602867321')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircleMoreIcon className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Message & Whatsapp </h4>
                  <p className="text-gray-600 text-sm">+212 699272226</p>
                </div>
                <button onClick={() => copyToClipboard('+212699272226')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Email</h4>
                  <p className="text-gray-600 text-sm">salviaro.autos@gmail.com</p>
                </div>
                <button onClick={() => copyToClipboard('salviaro.autos@gmail.com')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Business Hours</h4>
                  <p className="text-gray-600 text-sm">
                    24/7<br />
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

        <ContactForm/>
        <MapCart/>
      </div>
    </div>
  )
}

export default ContactUs
