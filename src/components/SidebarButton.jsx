import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

export const SidebarButton = ({ children, to, disabled }) => {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3 transition-all duration-300', // 👈 animações suaves
    variants: {
      color: {
        unselected: 'text-brand-dark-blue hover:bg-brand-primary/10',
        selected: 'bg-brand-primary/15 text-brand-primary shadow-md',
        disabled: 'cursor-not-allowed opacity-50',
      },
    },
  })

  if (disabled) {
    return <div className={sidebar({ color: 'disabled' })}>{children}</div>
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? 'selected' : 'unselected' })
      }
    >
      {children}
    </NavLink>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  disabled: PropTypes.bool,
}
