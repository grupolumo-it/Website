import SearchBar from './SearchBar'
import HeaderActions from './HeaderActions'
import CategoryBar from './CategoryBar'

export default function Header() {
  return (
    <header>
      <div className="bg-white border-b border-lumo-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-base">

            <a
              href="/#homepage"
              className="text-2xl font-bold text-lumo-navy tracking-tight"
            >
              Lumo
            </a>

            <SearchBar />

            <HeaderActions />

          </div>
        </div>
      </div>

      <CategoryBar />
    </header>
  )
}