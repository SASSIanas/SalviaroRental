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
          q: 'What does the rental price include?',
          a: 'Insurance, unlimited mileage depending on the company and its regulations, and taxes.'
        }
      ]
    },
    {
      id: 'delivery-return',
      icon: MapPin,
      title: 'Delivery & Return',
      questions: [
        {
          q: 'Where can I pick up my car? ',
          a: "At our branches in any city in Morocco, we'll deliver it to the airport or wherever you need it. We're at your service. Your comfort is our priority."
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
          q: 'What are the rental conditions?',
          a: 'A valid license for two years or more.'
        },
        {
          q: 'Is there limited or unlimited mileage?',
          a: 'Most rentals include unlimited mileage.'
        },
        {
          q: 'How are accidents or damages handled?',
          a: 'Contact the rental company owner immediately, and they will guide you through everything.'
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
          a: 'Immediate payment in cash at the rental company, credit cards, debit cards, and bank transfers.'
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
                  <p className="text-gray-600 text-sm">salviaro.autos@gmail.com</p>
                </div>
                <button onClick={() => copyToClipboard('salviaro.autos@gmail.com')} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-gray-600 text-sm">+212 602 867 321</p>
                </div>
                <button onClick={() => copyToClipboard('+212602867321')} className="p-1 hover:bg-gray-100 rounded">
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