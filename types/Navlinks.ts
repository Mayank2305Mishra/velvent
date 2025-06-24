import { Home, Settings, ShoppingBag } from "lucide-react";


export const navItems = [
    {
      route: '/',
      label: 'Home',
      icon: Home
    },
    {
        route:'/cart',
        label:'Cart',
        icon: ShoppingBag
    },
    {
        route:'/settings',
        label:'Settings',
        icon: Settings
    }
  ]