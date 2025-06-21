
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Filter, Calendar, Search } from 'lucide-react';
import { Purchase } from '@/types';
import { useToast } from '@/hooks/use-toast';

const mockPurchases: Purchase[] = [
  {
    id: '1',
    assetName: 'M4A1 Rifle',
    assetType: 'weapon',
    quantity: 50,
    unitPrice: 1200,
    totalCost: 60000,
    vendor: 'Colt Manufacturing',
    purchaseDate: '2024-01-15',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    purchasedBy: 'Col. Michael Roberts',
    status: 'delivered',
    notes: 'Standard issue rifles for new recruits'
  },
  {
    id: '2',
    assetName: 'Humvee M1151',
    assetType: 'vehicle',
    quantity: 3,
    unitPrice: 85000,
    totalCost: 255000,
    vendor: 'AM General',
    purchaseDate: '2024-01-10',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    purchasedBy: 'Capt. Lisa Chen',
    status: 'approved',
    notes: 'Replacement vehicles for motor pool'
  },
  {
    id: '3',
    assetName: '5.56mm Ammunition',
    assetType: 'ammunition',
    quantity: 10000,
    unitPrice: 0.45,
    totalCost: 4500,
    vendor: 'Federal Premium',
    purchaseDate: '2024-01-12',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    purchasedBy: 'Sgt. James Wilson',
    status: 'pending'
  }
];

export function PurchasesPage() {
  const [purchases] = useState<Purchase[]>(mockPurchases);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
    const matchesType = typeFilter === 'all' || purchase.assetType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'status-pending',
      approved: 'status-active',
      delivered: 'status-completed'
    };
    return variants[status as keyof typeof variants] || 'status-pending';
  };

  const handleNewPurchase = () => {
    toast({
      title: "Purchase Request Submitted",
      description: "Your purchase request has been submitted for approval.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchases Management</h1>
          <p className="text-muted-foreground">
            Track and manage asset purchases across all bases
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Purchase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-card border border-border">
            <DialogHeader>
              <DialogTitle>Create Purchase Request</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input id="asset-name" placeholder="Enter asset name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="weapon">Weapon</SelectItem>
                      <SelectItem value="ammunition">Ammunition</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit-price">Unit Price ($)</Label>
                  <Input id="unit-price" type="number" placeholder="Enter unit price" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input id="vendor" placeholder="Enter vendor name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewPurchase}>
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vehicle">Vehicles</SelectItem>
                <SelectItem value="weapon">Weapons</SelectItem>
                <SelectItem value="ammunition">Ammunition</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Purchases List */}
      <div className="grid gap-4">
        {filteredPurchases.map((purchase) => (
          <Card key={purchase.id} className="hover:bg-accent/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{purchase.assetName}</h3>
                    <Badge className={`status-badge ${getStatusBadge(purchase.status)}`}>
                      {purchase.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Vendor</p>
                      <p className="font-medium text-foreground">{purchase.vendor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground">{purchase.quantity.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Cost</p>
                      <p className="font-medium text-foreground">${purchase.totalCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{purchase.purchaseDate}</p>
                    </div>
                  </div>
                  
                  {purchase.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{purchase.notes}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {purchase.status === 'pending' && (
                    <Button size="sm">
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
