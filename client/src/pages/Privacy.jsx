import React from 'react'
import Title from '../components/Title'
import { Shield, User, Lock, Cookie, FileText, Clock, Mail, Phone, AlertCircle } from 'lucide-react'

const Privacy = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 mx-auto xl:px-32 2xl:px-48 mt-16 text-sm max-w-4xl'>
      <Title 
        title={'Privacy Policy'}
        subTitle={'Please read our privacy policy carefully before using our services'}
      />
      
      <div className="mt-8 space-y-8">
        {/* Introduction */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                Welcome to <span className="font-semibold">SALVIARO</span>. 
                We are committed to protecting your personal information and being transparent about 
                how we collect, use, and safeguard your data.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {/* 1. Information Collection */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">1. Information Collection</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>We collect some personal information from customers when using the website or making a reservation, such as:</p>
              <p>• Full name</p>
              <p>• Phone number</p>
              <p>• Email address</p>
              <p>• Driving license information</p>
              <p>• Payment details (if payment is electronic)</p>
            </div>
          </div>

          {/* 2. Information Usage */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">2. Information Usage</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The collected information is used only for the following purposes:</p>
              <p>• Processing and confirming reservations</p>
              <p>• Communicating with customers regarding their requests</p>
              <p>• Improving service quality and user experience</p>
              <p>• Sending notifications or special offers (if the customer agrees)</p>
            </div>
          </div>

          {/* 3. Data Protection */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">3. Data Protection</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>We take all necessary security measures to protect customer data from unauthorized access, modification, or deletion.</p>
              <p>Data is not shared with any third party except in the following cases:</p>
              <p>• Trusted partners to help provide the service (such as insurance companies)</p>
              <p>• If required by law or court order</p>
            </div>
          </div>

          {/* 4. Cookies */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">4. Cookies</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The website uses cookies to improve browsing experience and facilitate the booking process.</p>
              <p>Users can disable cookies from browser settings, but this may affect some website functions.</p>
            </div>
          </div>

          {/* 5. User Rights */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">5. User Rights</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The customer has the right to request access, correction, or deletion of their personal data at any time.</p>
              <p>The customer can contact us via email to request these actions.</p>
            </div>
          </div>

          {/* 6. Data Retention */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">6. Data Retention</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>We retain customer data only for the period necessary to provide services or as required by law.</p>
            </div>
          </div>

          {/* 7. Policy Modifications */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">7. Policy Modifications</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The website reserves the right to modify this policy when needed, and any changes will be published on this page with the update date.</p>
            </div>
          </div>

          {/* 8. Contact Us */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">8. Contact Us</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>If you have any questions regarding the privacy policy, you can contact us via:</p>
              <p>• Email: salviaro.autos@gmail.com</p>
              <p>• Phone: +212 699 272 226</p>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 font-medium">
                By using the SALVIARO website, you agree to this privacy policy.
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

export default Privacy