import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { InputLabel } from './InputLabel'

export const TextArea = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <textarea
        ref={ref}
        className="resize-none rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        rows={7} // Altura inicial
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'
TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
}
