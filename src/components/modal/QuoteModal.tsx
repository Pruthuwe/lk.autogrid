import React from 'react';
import QuoteFormModal from '../form/QuoteFormModal';

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
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
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
              <QuoteFormModal onSuccess={onClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteModal;

