import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { InputLabel } from './InputLabel'

export const TimeSelect = forwardRef((props, ref) => {
  const { errorMessage, ...selectProps } = props

  return (
    <div className="flex w-full flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        ref={ref}
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...selectProps}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {errorMessage && (
        <span className="text-left text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
})

TimeSelect.displayName = 'TimeSelect'
TimeSelect.propTypes = {
  errorMessage: PropTypes.string,
}
