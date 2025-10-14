export const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const getVariantClass = () => {
    if (variant === 'primary') {
      return 'bg-[#00abc5] text-brand-white'
    }

    if (variant === 'ghost') {
      return ' bg-transparent text-brand-dark-gray '
    }
  }

  const getSizeClasses = () => {
    if (size === 'small') {
      return ' py-1 text-xs'
    }

    if (size === ' large') {
      return 'py-2 text-md text-[#000]'
    }
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition hover:opacity-70 ${getVariantClass()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
