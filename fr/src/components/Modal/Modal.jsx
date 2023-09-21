import './Modal.css'
import ReactDOM from 'react-dom';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='container'>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            {children}
          </div>
            <div className='print-only'>
              <button className="modal-close" onClick={onClose}>
                Закрыть
              </button>
              </div>  
        </div>
      </div>
    </div>,  
    document.getElementById('modal-root')
  );
};

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  children: '',
}