export default function Button({
  children,
  className,
  hoverable = true,
  variant = "purple",
  ...rest
}) {
  const variants = {
    white: `text-black bg-white`,
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    purple: `text-white bg-turk ${hoverable && "hover:bg-turk"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    lightPurple: `text-turk bg-turk ${hoverable && "hover:bg-turk"}`,
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 rounded-full disabled:cursor-not-allowed xs:px-8 xs:py-3 p-2 border text-black font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
