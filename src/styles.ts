interface StyleObject {
  aside: string
  asideScrollbars: string
  asideBrand: string
  asideMenuItem: string
  asideMenuItemActive: string
  asideMenuDropdown: string
  navBarItemLabel: string
  navBarItemLabelHover: string
  navBarItemLabelActiveColor: string
  overlay: string
}

export const basic: StyleObject = {
  aside: 'bg-gray-800',
  asideScrollbars: 'aside-scrollbars-gray',
  asideBrand: 'bg-gray-900 text-white',
  asideMenuItem: 'text-gray-300 hover:text-white',
  asideMenuItemActive: 'font-bold text-white',
  asideMenuDropdown: 'bg-gray-700/50',
  navBarItemLabel: 'text-black',
  navBarItemLabelHover: 'hover:text-blue-500',
  navBarItemLabelActiveColor: 'text-blue-600',
  overlay: 'from-gray-700 via-gray-900 to-gray-700',
}