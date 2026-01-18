import React from 'react';
import AppointmentFormV1 from '../form/AppointmentFormV1';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`te-quote-modal-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      />
      <div className={`te-quote-modal-wrapper ${isOpen ? 'active' : ''}`}>
        <div className="te-quote-modal-inner">
          <div className="te-quote-modal-content">
            <div className="te-quote-modal-header">
              <h3>Get A Quote</h3>
              <button 
                className="te-quote-modal-close" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="te-quote-modal-body">
              <AppointmentFormV1 onSuccess={onClose} showTitle={false} compact={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteModal;

