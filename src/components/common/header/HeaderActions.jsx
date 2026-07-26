const buttons = [
  {
    icon: 'fa-cart-shopping',
    label: 'Carrito'
  },
  {
    icon: 'fa-truck-fast',
    label: 'Pedidos'
  }
]

export default function HeaderActions() {
  return (
    <div className="flex items-center space-x-5">

      {buttons.map((button) => (
        <button
          key={button.icon}
          aria-label={button.label}
          className="text-lumo-gray-600 hover:text-lumo-navy transition-colors"
        >
          <i className={`fa-solid ${button.icon} text-lg`} />
        </button>
      ))}

      <button className="flex items-center space-x-2 text-lumo-gray-600 hover:text-lumo-navy">
        <i className="fa-regular fa-user text-lg" />
        <span className="hidden xl:inline text-sm font-medium">
          Profile
        </span>
      </button>

    </div>
  )
}