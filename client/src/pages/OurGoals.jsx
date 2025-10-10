import React from 'react'
import Title from '../components/Title'
import { MapPin, Globe2, Rocket, Star, Flag, Target } from 'lucide-react'

const OurGoals = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 mx-auto xl:px-32 2xl:px-48 mt-16 text-sm max-w-4xl'>
      <Title 
        title={'Our Goals'}
        subTitle={'Geographical Expansion Plan – 5-Year Vision (2025–2030)'}
      />

      <div className="mt-8 space-y-8">

        {/* Phase 1 */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Phase 1: Strengthening the Moroccan Market (2025–2026)
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-700" />
              <p className="font-semibold">Objectives:</p>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Consolidate brand presence in major Moroccan cities (Casablanca, Marrakech, Tangier, Agadir, Rabat).</li>
              <li>Build strong partnerships with local car rental agencies.</li>
              <li>Launch mobile app (iOS & Android) for easier bookings.</li>
              <li>Introduce loyalty programs for frequent customers.</li>
            </ul>
            <p className="mt-3 font-medium text-gray-800">
              <Flag className="inline w-4 h-4 mr-1" />
              Goal: Become the most trusted digital car rental platform in Morocco.
            </p>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe2 className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Phase 2: North African Expansion (2026–2027)
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-700" />
              <p className="font-semibold">Target Countries: Mauritania & Tunisia</p>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Establish local partnerships with verified agencies.</li>
              <li>Adapt the platform to local currencies and regulations.</li>
              <li>Launch bilingual support (Arabic/French).</li>
              <li>Implement regional marketing campaigns focused on trust and accessibility.</li>
            </ul>
            <p className="mt-3 font-medium text-gray-800">
              <Flag className="inline w-4 h-4 mr-1" />
              Goal: Build regional awareness and credibility across North Africa.
            </p>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Rocket className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Phase 3: Entry into Southern Europe (2027–2028)
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-700" />
              <p className="font-semibold">Target Countries: Spain & France</p>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Partner with small and medium rental companies in tourist regions.</li>
              <li>Focus on cross-border rentals (Morocco ↔ Europe).</li>
              <li>Add multilingual platform (Arabic, French, English, Spanish).</li>
              <li>Begin digital marketing campaigns aimed at travelers and expatriates.</li>
            </ul>
            <p className="mt-3 font-medium text-gray-800">
              <Flag className="inline w-4 h-4 mr-1" />
              Goal: Position <span className="font-semibold">SALVIARO.autos</span> as a bridge between North Africa and Europe.
            </p>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Phase 4: Premium Market & Brand Growth (2028–2029)
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-700" />
              <p className="font-semibold">Target Country: Monaco</p>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Introduce a premium segment (luxury & business rentals).</li>
              <li>Develop partnerships with high-end rental agencies and concierge services.</li>
              <li>Launch brand rebranding for international prestige.</li>
            </ul>
            <p className="mt-3 font-medium text-gray-800">
              <Flag className="inline w-4 h-4 mr-1" />
              Goal: Build a luxury image for <span className="font-semibold">SALVIARO</span> as a trusted international brand.
            </p>
          </div>
        </div>

        {/* Final Vision */}
        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="flex items-start space-x-3">
            <Flag className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 font-medium">
                This 5-year roadmap represents our journey to become the leading car rental platform 
                connecting Africa and Europe — accessible, innovative, and customer-focused.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OurGoals
