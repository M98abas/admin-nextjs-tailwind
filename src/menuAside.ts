import {
  mdiAccountGroupOutline,
  mdiAccountStarOutline,
  mdiBankOutline,
  mdiClipboardListOutline,
  mdiCogs,
  mdiCreditCardOutline,
  mdiCurrencyUsd,
  mdiFolderAccountOutline,
  mdiForum,
  mdiInboxMultipleOutline,
  mdiLabelMultiple,
  mdiMonitor,
  mdiPackageVariantClosed,
  mdiPoll,
  mdiSale,
  mdiShopping,
  mdiTagMultiple,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Main',
  },
  {
    label: 'Administration',
    icon: mdiAccountStarOutline,
    menu: [
      { icon: mdiFolderAccountOutline, label: 'Admin', href: '/administration/admin' },
      { icon: mdiAccountGroupOutline, label: 'Users', href: '/administration/users' },
      { icon: mdiCogs, label: 'Rules', href: '/administration/rules' },
      { icon: mdiForum, label: 'Messages', href: '/administration/messages' },
    ],
  },
  {
    label: 'Product',
    icon: mdiInboxMultipleOutline,
    menu: [
      { label: 'Items', icon: mdiPackageVariantClosed },
      { label: 'Category', icon: mdiTagMultiple },
      { label: 'Brand', icon: mdiShopping },
      { label: 'Product Type', icon: mdiPackageVariantClosed },
      { label: 'Tags', icon: mdiLabelMultiple },
      { label: 'PromoCode', icon: mdiCurrencyUsd },
      { label: 'Discount', icon: mdiSale },
    ],
  },
  {
    label: 'Orders',
    icon: mdiPoll,
    menu: [
      {
        label: 'Orders',
        icon: mdiClipboardListOutline,
      },
      {
        label: 'Payment',
        icon: mdiCreditCardOutline,
      },
      {
        label: 'Transaction',
        icon: mdiBankOutline,
      },
    ],
  },
]

export default menuAside
