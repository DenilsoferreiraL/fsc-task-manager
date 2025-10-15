import PropTypes from 'prop-types'

export const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...props}>
      {props.children}
    </label>
  )
}

InputLabel.propTypes = {
  props: PropTypes.node.isRequired,
}
