import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  UserPlus,
  Loader2,
  Check,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdminRole } from "@/hooks/useAdminRole";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UserWithRole {
  user_id: string;
  name: string;
  email: string;
  role: AppRole | null;
  role_id: string | null;
}

interface Role {
  role_id: string;
  role_name: Database["public"]["Enums"]["role_name"];
}

export default function AdminRoleManagement() {
  const { isAdmin, isSuperAdmin, hasPermission } = useAdminRole();
  const canManageRoles = hasPermission('role.manage') || isSuperAdmin;
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<AppRole>("viewer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Roles that non-SuperAdmins can assign
  const allAppRoles: AppRole[] = ["admin", "manager", "supporter", "viewer", "user"];
  // Non-SuperAdmins cannot assign admin role
  const availableRoles = isSuperAdmin ? allAppRoles : allAppRoles.filter(r => r !== 'admin');

  const fetchUsersWithRoles = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, name, email')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, role_id');
      
      if (rolesError) throw rolesError;

      // Merge profiles with their roles
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => {
        const userRole = userRoles?.find(ur => ur.user_id === profile.user_id);
        return {
          user_id: profile.user_id,
          name: profile.name,
          email: profile.email,
          role: userRole?.role || null,
          role_id: userRole?.role_id || null,
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    const { data, error } = await supabase
      .from('roles')
      .select('role_id, role_name');
    
    if (error) {
      console.error('Error fetching roles:', error);
    } else {
      setRoles(data || []);
    }
  };

  useEffect(() => {
    fetchUsersWithRoles();
    fetchRoles();
  }, []);

  // Map app_role to role_name for getting role_id
  const getRoleIdForAppRole = (appRole: AppRole): string | null => {
    const roleMapping: Record<AppRole, string> = {
      'admin': 'Admin',
      'manager': 'Manager',
      'supporter': 'Support',
      'moderator': 'Manager', // Map moderator to Manager
      'viewer': 'Support', // Map viewer to Support
      'user': 'Support' // Map user to Support
    };
    const roleName = roleMapping[appRole];
    const role = roles.find(r => r.role_name === roleName);
    return role?.role_id || null;
  };

  const handleAssignRole = async (userId: string, appRole: AppRole) => {
    try {
      // Check if user already has a role
      const existingUser = users.find(u => u.user_id === userId);
      const roleId = getRoleIdForAppRole(appRole);
      
      if (existingUser?.role) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: appRole, role_id: roleId })
          .eq('user_id', userId);
        
        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: appRole, role_id: roleId });
        
        if (error) throw error;
      }

      toast.success('Role updated successfully');
      fetchUsersWithRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleRemoveRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;

      toast.success('Role removed successfully');
      fetchUsersWithRoles();
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error('Failed to remove role');
    }
  };

  const handleAddUserWithRole = async () => {
    if (!newUserEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsSubmitting(true);
    try {
      // Find user by email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('email', newUserEmail.toLowerCase().trim())
        .single();
      
      if (profileError || !profile) {
        toast.error('User not found. They must sign up first.');
        return;
      }

      // Assign role
      const roleId = getRoleIdForAppRole(newUserRole);
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: profile.user_id, role: newUserRole, role_id: roleId });
      
      if (error) throw error;

      toast.success('Role assigned successfully');
      setIsAddDialogOpen(false);
      setNewUserEmail("");
      setNewUserRole("user");
      fetchUsersWithRoles();
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error('Failed to assign role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: AppRole | null) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'moderator': return 'bg-orange-100 text-orange-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'supporter': return 'bg-green-100 text-green-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getRoleIcon = (role: AppRole | null) => {
    switch (role) {
      case 'admin': return <ShieldCheck className="h-4 w-4" />;
      case 'moderator': 
      case 'manager':
        return <Shield className="h-4 w-4" />;
      default: return <ShieldAlert className="h-4 w-4" />;
    }
  };

  if (!canManageRoles) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">You don't have permission to manage roles.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Role Management</h2>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Role to User</DialogTitle>
              <DialogDescription>
                Enter the email of an existing user to assign them a role.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as AppRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(role => (
                      <SelectItem key={role} value={role}>
                        <span className="capitalize">{role}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddUserWithRole} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Assign Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Managers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'manager' || u.role === 'moderator').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">With Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role !== null).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Change Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.role ? (
                      <Badge className={`gap-1 ${getRoleBadgeColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">No role</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={user.role || ""} 
                      onValueChange={(v) => handleAssignRole(user.user_id, v as AppRole)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            <span className="capitalize">{role}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.role && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRole(user.user_id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
          <CardDescription>Overview of what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg border border-red-200 bg-red-50/50">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-red-100 text-red-700">Super Admin</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Full system access</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Delete candidates</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Manage referrals & coupons</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Change referral discount %</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Enable/disable analytics</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-orange-100 text-orange-700">Admin</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Course management</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> User management</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> View reports</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> Delete candidates</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> Manage referral settings</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-100 text-blue-700">Manager</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Create & edit courses</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Publish courses</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> View reports</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> User management</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> Role management</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gray-100 text-gray-700">Viewer</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> View dashboard</li>
                <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> View reports (read-only)</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> Edit anything</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> User management</li>
                <li className="flex items-center gap-1"><X className="h-3 w-3 text-red-500" /> Course management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
