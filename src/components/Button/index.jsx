import { tv } from "tailwind-variants";
import { FaSpinner } from "react-icons/fa";

const button = tv({
  base: "h-10 text-white rounded-lg transition-all flex items-center justify-center px-6",
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-600",
      warning: "bg-yellow-500 hover:bg-yellow-600",
      danger: "bg-red-500 hover:bg-red-600",
      success: "bg-green-500 hover:bg-green-600",
    },
    loading: {
      true: "cursor-wait opacity-70",
      false: "",
    },
    disabled: {
      true: "cursor-not-allowed opacity-70",
      false: "",
    },
    size: {
      icon: "w-12 p-0",
      full: "w-full",
      fit: "w-full md:w-auto",
      sm: "w-24",
      md: "w-32",
      lg: "w-48",
      xl: "w-64",
    },
  },
  defaultVariants: {
    variant: "primary",
    loading: false,
    disabled: false,
    size: "fit",
  },
});

const Button = ({
  children,
  loading,
  disabled,
  variant = "primary",
  size = "full",
  ...props
}) => {
  return (
    <button
      type="button"
      className={button({ variant, loading, disabled, size })}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <FaSpinner className="animate-spin mx-auto" /> : children}
    </button>
  );
};

export default Button;
