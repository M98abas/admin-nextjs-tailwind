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
  mdiNeedle,
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
      { label: 'Items', icon: mdiPackageVariantClosed, href: '/product/items' },
      { label: 'Category', href: '/product/category', icon: mdiTagMultiple },
      { label: 'Brand', href: '/product/brand', icon: mdiShopping },
      { label: 'Product Type', href: '/product/productType', icon: mdiPackageVariantClosed },
      { label: 'Tags', href: '/product/tags', icon: mdiLabelMultiple },
      { label: 'PromoCode', href: '/product/promocode', icon: mdiCurrencyUsd },
      { label: 'Discount', href: '/product/discount', icon: mdiSale },
    ],
  },
  {
    label: 'Orders',
    icon: mdiPoll,
    menu: [
      {
        label: 'Orders',
        href: '/orders',
        icon: mdiClipboardListOutline,
      },
      {
        label: 'Payment',
        href: '/orders/payment',
        icon: mdiCreditCardOutline,
      },
      {
        label: 'Transaction',
        href: '/orders/transaction',
        icon: mdiBankOutline,
      },
    ],
  },
]

export default menuAside
