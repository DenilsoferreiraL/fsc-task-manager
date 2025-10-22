import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

export const SidebarButton = ({ children, color, href }) => {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        unselected: 'text-brand-dark-blue',
        selected: 'bg-brand-primary/15 text-brand-primary',
      },
    },
  })

  return (
    <a href={href} className={sidebar({ color })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
}
