
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { 
  Calendar, 
  Database, 
  Folder,
  List,
  Plus,
  User,
  Arrow,
  ArrowRight
} from 'lucide-react';

const getMenuItems = (userRole: string) => {
  const baseItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Calendar,
    },
  ];

  if (userRole === 'admin' || userRole === 'base_commander' || userRole === 'logistics_officer') {
    baseItems.push(
      {
        title: 'Purchases',
        url: '/purchases',
        icon: Plus,
      },
      {
        title: 'Transfers',
        url: '/transfers', 
        icon: ArrowRight,
      }
    );
  }

  if (userRole === 'admin' || userRole === 'base_commander') {
    baseItems.push({
      title: 'Assignments & Expenditures',
      url: '/assignments',
      icon: User,
    });
  }

  if (userRole === 'admin') {
    baseItems.push({
      title: 'Assets Registry',
      url: '/assets',
      icon: Database,
    });
  }

  return baseItems;
};

export function AppSidebar() {
  const { user } = useAuth();
  const menuItems = getMenuItems(user?.role || '');

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <Database className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">MAMS</span>
            <span className="text-xs text-muted-foreground">Asset Management</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-accent hover:text-accent-foreground">
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-accent hover:text-accent-foreground">
                    <a href="/users" className="flex items-center gap-3">
                      <User className="h-4 w-4" />
                      <span>User Management</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-accent hover:text-accent-foreground">
                    <a href="/bases" className="flex items-center gap-3">
                      <Folder className="h-4 w-4" />
                      <span>Base Management</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
