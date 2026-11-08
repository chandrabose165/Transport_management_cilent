import React from 'react';
import { Check } from 'lucide-react';

const steps = ['Your details', 'Choose service', 'Select seats', 'Payment'];

const BookingProgress = ({ currentStep }) => (
  <ol aria-label="Booking progress" className="mt-7 grid grid-cols-4 gap-2">
    {steps.map((step, index) => {
      const stepNumber = index + 1;
      const isComplete = stepNumber < currentStep;
      const isCurrent = stepNumber === currentStep;

      return (
        <li key={step} aria-current={isCurrent ? 'step' : undefined} className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                isComplete
                  ? 'bg-brand-500 text-white'
                  : isCurrent
                    ? 'bg-white text-brand-700'
                    : 'border border-white/25 bg-white/10 text-white/65'
              }`}
            >
              {isComplete ? <Check size={14} /> : stepNumber}
            </span>
            <span className={`hidden truncate text-xs font-semibold sm:block ${isCurrent ? 'text-white' : 'text-white/65'}`}>
              {step}
            </span>
          </div>
          <span
            className={`mt-2 block h-1 rounded-full ${
              isComplete || isCurrent ? 'bg-brand-400' : 'bg-white/15'
            }`}
          />
          <span className={`mt-1 block truncate text-[10px] font-semibold sm:hidden ${isCurrent ? 'text-white' : 'text-white/65'}`}>
            {step}
          </span>
        </li>
      );
    })}
  </ol>
);

export default BookingProgress;
