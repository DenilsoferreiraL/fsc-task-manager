import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

export const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition hover:opacity-70`,
    variants: {
      color: {
        primary: 'bg-brand-primary text-brand-white',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
      },
      size: {
        small: 'py-1 text-sm',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })

  return (
    <button
      className={button({ color, size, disabled: rest.disabled, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propsTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secondary']),
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
}
