import React from 'react'

const MapCart = () => {
  return (
    <>
      {/* MapCart Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
        
        <div className="border border-borderColor rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d827.8065052921193!2d-5.543668730462128!3d33.909581998325685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDU0JzM0LjUiTiA1wrAzMiczNC45Ilc!5e0!3m2!1sfr!2sma!4v1760106282915!5m2!1sfr!2sma"
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