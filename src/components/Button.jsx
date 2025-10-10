export const Button = ({ children, variant = 'primary' }) => {
  const getVariantClass = () => {
    if (variant === 'primary') {
      return 'bg-[#00abc5] text-[#ffffff]'
    }

    if (variant === 'ghost') {
      return ' bg-transparent text-[#000000]'
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-white transition hover:opacity-70 ${getVariantClass()}`}
    >
      {children}
    </button>
  )
}
