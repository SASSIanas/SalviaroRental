import React from 'react'
import Title from '../components/Title'
import { Car, Shield, Clock, Heart, Target, Users } from 'lucide-react'
import { assets } from '../assets/assets'

const AboutUs = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title 
        title={'About Us'}
        subTitle={'Your trusted partner for car rental services in Morocco'}
      />
      
      <div className="mt-8 space-y-8">
        {/* Hero Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Welcome to <span className="text-primary">SALVIARO</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Your trusted car rental platform in Morocco. We strive to provide professional service 
              that combines ease, speed, and quality to make your travel and transportation experience 
              more comfortable and secure.
            </p>
            <p className="text-gray-600">
              Through our platform, we enable you to book the perfect car for your needs with complete 
              confidence, while guaranteeing diverse fleet, transparent pricing, easy booking process, 
              and continuous customer support.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <img 
              src={assets.tswira1}
              alt="SALVIARO.autos fleet" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Car className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-sm mb-2">Diverse Fleet</h3>
            <p className="text-gray-600 text-xs">
              Wide selection of well-maintained vehicles
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-sm mb-2">Transparent Pricing</h3>
            <p className="text-gray-600 text-xs">
              Clear prices with no hidden fees
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-sm mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-xs">
              Simple online reservation process
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-sm mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-xs">
              Round-the-clock customer service
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700">
              At <strong className="text-primary">SALVIARO</strong>, we believe that customer comfort is our top priority. 
              That's why we always strive to provide the best solutions and services to make every journey 
              an exceptional experience.
            </p>
          </div>
        </div>

        {/* Team/Service Image Section */}
        <div className="bg-gray-200 rounded-lg h-100 flex items-center justify-center">
          <img 
            src={assets.tiwtiw} 
            alt="Our professional team" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Car className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-medium text-lg mb-3">Quality Vehicles</h3>
            <p className="text-gray-600 text-sm">
              Regular maintenance and thorough inspections for your safety
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-medium text-lg mb-3">Professional Service</h3>
            <p className="text-gray-600 text-sm">
              Exceptional customer service and personalized solutions
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-medium text-lg mb-3">Nationwide Trust</h3>
            <p className="text-gray-600 text-sm">
              Reliable transportation across Morocco
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs