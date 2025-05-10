const Input = ({ type = 'text', label, value, onChange, placeholder, error, className = '', ...props }) => {
      return (
        <div className="mb-4">
          {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
            {...props}
          />
          {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
      );
    };