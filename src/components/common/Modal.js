    // Modal Component
    const Modal = ({ isOpen, onClose, title, children, footer }) => {
      if (!isOpen) return null;

      return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-4">{children}</div>
            {footer && <div className="p-4 border-t">{footer}</div>}
          </div>
        </div>,
        document.body
      );
    };
