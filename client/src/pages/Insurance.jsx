import React from 'react'
import Title from '../components/Title'
import { Shield, AlertTriangle, FileText, Phone, Car, AlertCircle } from 'lucide-react'

const Insurance = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 mx-auto xl:px-32 2xl:px-48 mt-16 text-sm max-w-4xl'>
      <Title 
        title={'Insurance'}
        subTitle={'Please read our insurance policy carefully before using our services'}
      />
      
      <div className="mt-8 space-y-8">
        {/* Introduction */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                All <span className="font-semibold">SALVIARO</span> vehicles are insured according to Moroccan laws. 
                Our comprehensive insurance coverage ensures your peace of mind during your rental period.
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Sections */}
        <div className="space-y-6">
          {/* 1. Basic Coverage */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">1. Basic Coverage</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>All SALVIAROvehicles are insured according to Moroccan laws.</p>
              <p>Insurance includes:</p>
              <p>• Civil liability towards third parties</p>
              <p>• Damages resulting from accidents according to the conditions specified in the insurance contract</p>
              <p>• Assistance in case of accident or breakdown</p>
            </div>
          </div>

          {/* 2. What Insurance Does Not Cover */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">2. What Insurance Does Not Cover</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Insurance does not cover the following cases:</p>
              <p>• Damages resulting from driving under the influence of alcohol or drugs</p>
              <p>• Damages resulting from misuse (races, dangerous maneuvers...)</p>
              <p>• Damages caused by an unauthorized driver or one without a valid driving license</p>
              <p>• Loss or theft of personal belongings inside the vehicle</p>
            </div>
          </div>

          {/* 3. Customer Financial Responsibility */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">3. Customer Financial Responsibility</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>In case of an accident or damage, the customer may bear a deductible amount (Franchise) determined when signing the rental contract.</p>
              <p>The deductible value varies depending on the vehicle type and available insurance.</p>
            </div>
          </div>

          {/* 4. Additional Insurance Options */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">4. Additional Insurance Options</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>The customer can request additional comprehensive insurance (Full Coverage) for an additional fee.</p>
              <p>This type of insurance may reduce or eliminate the deductible in case of an accident.</p>
            </div>
          </div>

          {/* 5. Procedures in Case of Accident */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">5. Procedures in Case of Accident</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>In case of an accident, the customer must:</p>
              <p>1. Immediately contact customer service at +212 699 272 226</p>
              <p>2. Notify the relevant authorities when necessary (police/gendarmerie)</p>
              <p>3. Fill out the accident report (Constat) and submit it with the vehicle</p>
            </div>
          </div>

          {/* 6. Roadside Assistance */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Car className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">6. Roadside Assistance</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>All our vehicles are covered by 24/7 assistance service in case of mechanical breakdown or accident.</p>
              <p>A replacement vehicle will be provided if available.</p>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 font-medium">
                By using SALVIARO services, you agree to the insurance terms outlined above.
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

export default Insurance