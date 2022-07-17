const InputComponent = ({ label, id, name, type, placeholder, register, error, multiple}) => {
    return (
      <div className="mt-3">
              <label htmlFor={id} className="form-label mb-0">
                {label}
              </label>
              <input
                type={type}
                style={{ backgroundColor: "white" }}
                className={`form-control-sm form-control ${error ? 'is-invalid' : ''}`}
                id={id}
                placeholder={placeholder}
                {...register(name)}
                multiple={multiple}
              />
              <p className="invalid-feedback mt-0">{error}</p>
      </div>
    );
  };
  
  InputComponent.defaultProps = {
    type: 'text'
  }
  
  
  export default InputComponent