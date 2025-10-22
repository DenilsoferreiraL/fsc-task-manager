export const DashboardCard = ({ icon, mainText, secondaryText }) => {
  return (
    <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-[10px] bg-brand-white">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-semibold text-3xl">{mainText}</p>
      </div>
      <p className="text-sm">{secondaryText}</p>
    </div>
  )
}
