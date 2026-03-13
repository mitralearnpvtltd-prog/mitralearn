import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useReferrals, useReferralSettings } from "@/hooks/useReferrals";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Loader2,
  Share2,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Percent
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminReferrals() {
  const { referrals, isLoading } = useReferrals();
  const { settings, updateSettings, isLoading: settingsLoading } = useReferralSettings();
  const { isSuperAdmin, hasPermission } = useAdminRole();
  const canManageReferrals = hasPermission('referral.manage') || isSuperAdmin;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState(10);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Filter referrals
  const filteredReferrals = referrals.filter(ref => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matches = 
        ref.referrer_name?.toLowerCase().includes(search) ||
        ref.referrer_email?.toLowerCase().includes(search) ||
        ref.referee_name?.toLowerCase().includes(search) ||
        ref.referee_email?.toLowerCase().includes(search) ||
        ref.referral_code.toLowerCase().includes(search);
      if (!matches) return false;
    }
    if (statusFilter !== 'all' && ref.status !== statusFilter) return false;
    return true;
  });

  // Stats
  const totalReferrals = referrals.length;
  const convertedReferrals = referrals.filter(r => r.status === 'converted').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const totalRevenue = referrals.reduce((sum, r) => sum + (r.revenue_generated || 0), 0);
  const totalDiscounts = referrals.reduce((sum, r) => sum + (r.discount_applied || 0), 0);

  const handleOpenSettings = () => {
    if (settings) {
      setNewDiscount(settings.default_discount_percentage);
      setIsEnabled(settings.is_enabled);
    }
    setSettingsDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    const success = await updateSettings({
      default_discount_percentage: newDiscount,
      is_enabled: isEnabled,
    });
    setIsSaving(false);
    
    if (success) {
      toast.success('Referral settings updated');
      setSettingsDialogOpen(false);
    } else {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Referral Dashboard</h1>
          <p className="text-muted-foreground text-sm">Track referrals, conversions, and manage referral program settings</p>
        </div>
        {canManageReferrals && (
          <Button onClick={handleOpenSettings} className="gap-2">
            <Settings className="h-4 w-4" /> Settings
          </Button>
        )}
      </div>

      {/* Status Banner */}
      {settings && (
        <div className={`p-4 rounded-lg border ${settings.is_enabled ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Share2 className={`h-5 w-5 ${settings.is_enabled ? 'text-green-600' : 'text-yellow-600'}`} />
              <div>
                <p className="font-medium text-sm">
                  Referral Program: {settings.is_enabled ? 'Active' : 'Disabled'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Default discount: {settings.default_discount_percentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Share2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalReferrals}</div>
                <div className="text-xs text-muted-foreground">Total Referrals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{convertedReferrals}</div>
                <div className="text-xs text-muted-foreground">Converted</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingReferrals}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Percent className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{totalDiscounts.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Discounts Given</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, or code..." 
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Referrer</TableHead>
                <TableHead>Referee</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((ref) => (
                  <TableRow key={ref.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{ref.referrer_name || 'Unknown'}</div>
                        <div className="text-xs text-muted-foreground">{ref.referrer_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{ref.referee_name || 'Unknown'}</div>
                        <div className="text-xs text-muted-foreground">{ref.referee_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{ref.referral_code}</code>
                    </TableCell>
                    <TableCell className="text-sm">{ref.course_title || '-'}</TableCell>
                    <TableCell className="text-sm">₹{ref.discount_applied}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={ref.status === 'converted' ? 'default' : 'outline'}
                        className="capitalize text-xs"
                      >
                        {ref.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No referrals found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Referral Program Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Referral Program</Label>
                <p className="text-xs text-muted-foreground">Allow candidates to refer others</p>
              </div>
              <Switch 
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Default Discount Percentage</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number"
                  min={0}
                  max={100}
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Applied when a referred candidate enrolls
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
