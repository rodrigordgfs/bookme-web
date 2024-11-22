const SelectField = ({
  id,
  label,
  loading,
  hasError,
  errorMessage,
  options,
  register,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <select
        id={id}
        className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 ${
          hasError ? "border-red-500 outline-none" : "border-zinc-300"
        }`}
        disabled={loading}
        {...register(id)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && <p className="text-xs text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
