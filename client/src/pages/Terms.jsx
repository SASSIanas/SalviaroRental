import React from 'react'
import Title from '../components/Title'
import { FileText, Shield, CreditCard, Car, UserCheck, AlertCircle, Lock, Scale, Edit3, BookOpen } from 'lucide-react'

const Terms = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 mx-auto xl:px-32 2xl:px-48 mt-16 text-sm max-w-4xl'>
      <Title 
        title={'Terms of Service'}
        subTitle={'Please read these terms and conditions carefully before using our services'}
      />
      
      <div className="mt-8 space-y-8">
        {/* Introduction */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                Welcome to <span className="font-semibold">SALVIARO</span>. 
                By using our platform, you fully agree to all the terms and conditions outlined below. 
                Please read them carefully before making any reservation or using our services.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* 1. Definitions */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">1. Definitions</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Website:</strong> Refers to the SALVIARO platform.</p>
              <p><strong>User / Client:</strong> Any person who visits the website, uses its services, or makes a reservation.</p>
            </div>
          </div>

          {/* 2. Services */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Car className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">2. Services</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The website provides car rental services in Morocco online.</p>
              <p>All reservations are subject to availability and company confirmation.</p>
            </div>
          </div>

          {/* 3. Booking & Payment */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">3. Booking & Payment</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The reservation becomes valid only after confirmation by the company via email or phone.</p>
              <p>Payment can be made electronically through available payment methods or upon vehicle pickup (if the service is available).</p>
              <p>All prices are displayed in Moroccan Dirham and include/exclude taxes and insurance as shown on the booking page.</p>
            </div>
          </div>

          {/* 4. Cancellation & Modification */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Edit3 className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">4. Cancellation & Modification</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The client can cancel or modify the reservation at least 48 hours before the pickup time.</p>
              <p>Any cancellation made within the specified period may be subject to cancellation fees.</p>
            </div>
          </div>

          {/* 5. Vehicle Usage Conditions */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">5. Vehicle Usage Conditions</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The client must have a valid driving license.</p>
              <p>The minimum rental age is 21 years (or as stipulated by local laws).</p>
              <p>Using the vehicle for illegal activities, racing competitions, or any unsafe use is prohibited.</p>
              <p>The client is responsible for any damages resulting from misuse.</p>
            </div>
          </div>

          {/* 6. Insurance & Liability */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">6. Insurance & Liability</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>All vehicles are insured according to Moroccan laws.</p>
              <p>In case of an accident or damage, the client must immediately notify the company and cooperate with the insurance company.</p>
              <p>The client may bear part of the financial responsibility in case of accidents according to insurance terms.</p>
            </div>
          </div>

          {/* 7. Privacy & Data Protection */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">7. Privacy & Data Protection</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>We collect personal information only for transaction, reservation, and customer service purposes.</p>
              <p>Customer data is not shared with any third party unless necessary to complete the service or required by law.</p>
            </div>
          </div>

          {/* 8. Liability Limitation */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">8. Liability Limitation</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The website is not responsible for any technical failures or circumstances beyond its control.</p>
              <p>In all cases, the maximum liability of the company is limited to the amount of the paid reservation only.</p>
            </div>
          </div>

          {/* 9. Terms Modifications */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Edit3 className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">9. Terms Modifications</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The company reserves the right to modify or update these terms at any time, and they become effective immediately upon publication on the website.</p>
            </div>
          </div>

          {/* 10. Applicable Law */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">10. Applicable Law</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>All terms are subject to the applicable laws of the Kingdom of Morocco.</p>
              <p>Moroccan courts are the competent authority to settle any disputes arising from the use of the website or its services.</p>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 font-medium">
                By using the SALVIARO website, you acknowledge and agree to fully comply with these terms and conditions.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms