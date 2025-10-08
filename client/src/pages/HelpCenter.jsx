import React, { useState } from 'react'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import { Calendar, Car, MapPin, Copy, FileText, Wallet, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react'

const HelpCenter = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const faqSections = [
    {
      id: 'bookings',
      icon: Calendar,
      title: 'Bookings',
      questions: [
        {
          q: 'How can I book a car through the website?',
          a: 'Select your car, choose dates, and complete booking online.'
        },
        {
          q: 'Do I need a bank card for booking?',
          a: 'Yes, for security deposit.'
        },
        {
          q: 'Can I modify or cancel my booking?',
          a: 'Yes, up to 24 hours before pickup.'
        }
      ]
    },
    {
      id: 'vehicles',
      icon: Car,
      title: 'Vehicles',
      questions: [
        {
          q: 'What types of vehicles are available?',
          a: 'Economy, sedans, SUVs, luxury vehicles.'
        },
        {
          q: 'Are the vehicles fully insured?',
          a: 'Yes, comprehensive insurance included.'
        },
        {
          q: 'What is included in the rental price?',
          a: 'Insurance, unlimited kilometers, and taxes.'
        }
      ]
    },
    {
      id: 'delivery-return',
      icon: MapPin,
      title: 'Delivery & Return',
      questions: [
        {
          q: 'Where can I pick up the vehicle?',
          a: 'At our locations in major cities.'
        },
        {
          q: 'Can I return the vehicle in a different city?',
          a: 'Yes, with additional fees.'
        },
        {
          q: 'What happens if I return the vehicle late?',
          a: 'Additional charges after 1 hour grace period.'
        }
      ]
    },
    {
      id: 'terms-policies',
      icon: FileText,
      title: 'Terms & Policies',
      questions: [
        {
          q: 'What are the rental requirements?',
          a: 'Minimum 21 years with valid license for 1 year.'
        },
        {
          q: 'Is there limited or unlimited mileage?',
          a: 'Most rentals include unlimited mileage.'
        },
        {
          q: 'How are accidents or damages handled?',
          a: 'Contact our 24/7 support immediately.'
        }
      ]
    },
    {
      id: 'payment',
      icon: Wallet,
      title: 'Payment',
      questions: [
        {
          q: 'What payment methods are available?',
          a: 'Credit cards, debit cards, bank transfers.'
        },
        {
          q: 'Can I pay upon pickup?',
          a: 'Yes, available.'
        },
        {
          q: 'Is the displayed price inclusive of all fees?',
          a: 'Yes, includes all mandatory fees.'
        }
      ]
    }
  ]

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title
        title={'Help Center'}
        subTitle={'Find answers to your questions'}
      />

      <div className="mt-8 space-y-4">
        {faqSections.map((section) => {
          const IconComponent = section.icon
          return (
            <div key={section.id} className="border border-borderColor rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                </div>
                {openSections[section.id] ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {openSections[section.id] && (
                <div className="border-t border-borderColor">
                  {section.questions.map((item, index) => (
                    <div key={index} className="border-b border-borderColor last:border-b-0">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 text-sm mb-2">{item.q}</h4>
                        <p className="text-gray-600 text-sm">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="bg-gray-50 rounded-lg p-6 mt-8">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 mb-4">Still Need Help?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-gray-600 text-sm">contact@salviaro.autos</p>
                </div>
                <button onClick={() => copyToClipboard('contact@salviaro.autos')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-gray-600 text-sm">+212 522 123 456</p>
                </div>
                <button onClick={() => copyToClipboard('+212522123456')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter