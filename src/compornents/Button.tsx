type ButtonProps = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-blue-300 text-black rounded-[50px] hover:bg-sky-400 transition"
    >
      {label}
    </button>
  );
}

export default Button;
