import React from 'react'

const MapCart = () => {
  return (
    <>
      {/* MapCart Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
        
        <div className="border border-borderColor rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1655.669299964016!2d-5.543670958697188!3d33.906683997703304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDU0JzI0LjEiTiA1wrAzMiczNC41Ilc!5e0!3m2!1sfr!2sma!4v1759919055340!5m2!1sfr!2sma" 
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SALVIARO Location"
          ></iframe>
        </div>
      </div>
    </>
  )
}

export default MapCart