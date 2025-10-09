export const SidebarButton = ({ children, variant }) => {
  const getVariantClass = () => {
    if (variant === 'unselected') {
      return 'text-[#35383e]'
    }

    if (variant === 'selected') {
      return 'bg-[#E6F7F8] text-[#00ADB5]'
    }
  }
  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm ${getVariantClass()}`}
    >
      {children}
    </a>
  )
}
