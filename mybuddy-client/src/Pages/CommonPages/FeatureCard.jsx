import React from 'react';

const FeatureCard = ({isFirst,description,title}) => {
    return (
        <div className="flex w-full min-h-[120px] items-center border border-white/20 backdrop-blur-sm bg-white/5 rounded-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full p-2 md:p-5 lg:p-10 gap-4 md:gap-0">
          <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center md:text-left lg:w-6/12 xl:w-5/12 md:pb-5 lg:pb-0">
            {title}
          </div>
          <div className="text-gray-700 text-[14px] md:text-xl font-normal text-center md:text-left lg:w-6/12  xl:w-7/12">
            {description}
          </div>
        </div>
        
        {/* Add a subtle glow effect for the first card to match the design */}
        {isFirst && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent pointer-events-none"></div>
        )}
      </div>
    );
};

export default FeatureCard;