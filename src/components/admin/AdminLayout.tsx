import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-react";
import { useAdminRole } from "@/hooks/useAdminRole";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Award, 
  BarChart3, 
  LogOut, 
  Search, 
  Bell, 
  ShieldCheck,
  Menu,
  Settings,
  User as UserIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  InfoIcon,
  Loader2,
  ShieldX,
  Ticket
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useStore } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { notifications, markNotificationAsRead, clearNotifications, getUnreadNotificationCount } = useStore();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { isAdmin, isLoading: isAdminLoading } = useAdminRole();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Roles', href: '/admin/roles', icon: ShieldCheck },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  ];

  const handleLogout = () => {
    signOut({ redirectUrl: '/' });
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const unreadCount = getUnreadNotificationCount();

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <InfoIcon className="h-4 w-4 text-blue-600" />;
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <ShieldCheck className="h-6 w-6 text-sidebar-primary" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg leading-none">Admin Panel</span>
          <span className="text-xs text-muted-foreground">Admin Access</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link 
                key={item.name} 
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all
                  ${active 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border-l-2 border-sidebar-primary' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 ${active ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  // Loading state while checking admin role
  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  // Access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You don't have permission to access the admin panel. Please contact an administrator if you believe this is an error.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <Navigate to="/auth" state={{ from: location }} replace />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-background flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
            <SidebarContent />
          </div>

          {/* Main Content */}
          <div className="flex-1 md:pl-64 flex flex-col min-h-screen transition-all duration-300">
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-6 shadow-sm/50">
              <div className="flex items-center gap-4">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64 border-r-0 bg-sidebar">
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
                
                <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                  {navigation.find(n => isActive(n.href))?.name || 'Dashboard'}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-9 h-9 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-ring" 
                  />
                </div>
                
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      {unreadCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-0" align="end">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={clearNotifications}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer ${
                                !notification.read ? 'bg-secondary/30' : ''
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    {!notification.read && (
                                      <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                                    <Clock className="h-3 w-3" />
                                    {formatTime(notification.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-3 pl-2 pr-3 h-10 hover:bg-secondary/50 group">
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Admin'}
                        </span>
                        <span className="text-xs text-muted-foreground">Administrator</span>
                      </div>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{user?.firstName?.[0] || 'A'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{user?.firstName?.[0] || 'A'}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{user?.firstName || 'Admin'}</p>
                        <p className="text-xs text-muted-foreground">{user?.emailAddresses?.[0]?.emailAddress}</p>
                      </div>
                    </div>
                    <Separator />
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <UserIcon className="h-4 w-4" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem 
                      className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </main>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
