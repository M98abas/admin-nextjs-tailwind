import { mdiAccount, mdiCogOutline, mdiEmail, mdiLogout, mdiThemeLightDark } from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        icon: mdiEmail,
        label: 'Messages',
        href: '/administration/messages',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        href: '/login',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    href: '/login',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]

export default menuNavBar
