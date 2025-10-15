import PropTypes from 'prop-types'

export const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-border pb-1 text-sm text-brand-text-gray">
      {icon}
      <p className="text-sm text-brand-dark-gray">{title}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}
