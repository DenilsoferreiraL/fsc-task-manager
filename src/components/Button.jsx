export const Button = ({ children, variant = 'primary', ...rest }) => {
  const getVariantClass = () => {
    if (variant === 'primary') {
      return 'bg-[#00abc5] text-[#ffffff]'
    }

    if (variant === 'ghost') {
      return ' bg-transparent text-[#818181] '
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition hover:opacity-70 ${getVariantClass()}`}
      {...rest}
    >
      {children}
    </button>
  )
}
