import { Home, Settings, Users } from "lucide-react";

export const navItems = [
    {
      route: '/',
      label: 'Home',
      icon: Home
    },
    {
        route:'/profile',
        label:'Profile',
        icon:Users
    },
    {
        route:'/settings',
        label:'Settings',
        icon: Settings
    }
  ]