
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Plus, Search, Calendar } from 'lucide-react';
import { Transfer } from '@/types';
import { useToast } from '@/hooks/use-toast';

const mockTransfers: Transfer[] = [
  {
    id: '1',
    assetName: 'M1A2 Abrams Tank',
    assetType: 'vehicle',
    quantity: 2,
    fromBaseId: 'base1',
    fromBaseName: 'Fort Liberty',
    toBaseId: 'base2',
    toBaseName: 'Camp Pendleton',
    transferDate: '2024-01-14',
    initiatedBy: 'Col. Michael Roberts',
    approvedBy: 'Gen. Sarah Johnson',
    status: 'in_transit',
    estimatedArrival: '2024-01-20',
    notes: 'Emergency deployment support'
  },
  {
    id: '2',
    assetName: 'Communication Equipment Set',
    assetType: 'equipment',
    quantity: 15,
    fromBaseId: 'base2',
    fromBaseName: 'Camp Pendleton',
    toBaseId: 'base1',
    toBaseName: 'Fort Liberty',
    transferDate: '2024-01-12',
    initiatedBy: 'Capt. Lisa Chen',
    status: 'completed',
    notes: 'Field exercise equipment return'
  },
  {
    id: '3',
    assetName: 'Bradley Fighting Vehicle',
    assetType: 'vehicle',
    quantity: 4,
    fromBaseId: 'base1',
    fromBaseName: 'Fort Liberty',
    toBaseId: 'base3',
    toBaseName: 'Joint Base Lewis',
    transferDate: '2024-01-16',
    initiatedBy: 'Maj. Robert Davis',
    status: 'pending',
    estimatedArrival: '2024-01-22',
    notes: 'Training mission requirement'
  }
];

export function TransfersPage() {
  const [transfers] = useState<Transfer[]>(mockTransfers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromBaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toBaseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesType = typeFilter === 'all' || transfer.assetType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'status-pending',
      in_transit: 'status-active',
      completed: 'status-completed',
      rejected: 'bg-red-900/20 text-red-400 border border-red-800'
    };
    return variants[status as keyof typeof variants] || 'status-pending';
  };

  const handleNewTransfer = () => {
    toast({
      title: "Transfer Request Submitted",
      description: "Your transfer request has been submitted for approval.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transfer Management</h1>
          <p className="text-muted-foreground">
            Manage asset transfers between military bases
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Transfer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-card border border-border">
            <DialogHeader>
              <DialogTitle>Create Transfer Request</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input id="asset-name" placeholder="Enter asset name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-base">From Base</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base1">Fort Liberty</SelectItem>
                      <SelectItem value="base2">Camp Pendleton</SelectItem>
                      <SelectItem value="base3">Joint Base Lewis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-base">To Base</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base1">Fort Liberty</SelectItem>
                      <SelectItem value="base2">Camp Pendleton</SelectItem>
                      <SelectItem value="base3">Joint Base Lewis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transfer-date">Transfer Date</Label>
                <Input id="transfer-date" type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Purpose/Notes</Label>
                <Textarea id="notes" placeholder="Reason for transfer..." />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewTransfer}>
                Submit Transfer
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
                placeholder="Search transfers..."
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
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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

      {/* Transfer List */}
      <div className="grid gap-4">
        {filteredTransfers.map((transfer) => (
          <Card key={transfer.id} className="hover:bg-accent/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{transfer.assetName}</h3>
                    <Badge className={`status-badge ${getStatusBadge(transfer.status)}`}>
                      {transfer.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {transfer.fromBaseName}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {transfer.toBaseName}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground">{transfer.quantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Transfer Date</p>
                      <p className="font-medium text-foreground">{transfer.transferDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Initiated By</p>
                      <p className="font-medium text-foreground">{transfer.initiatedBy}</p>
                    </div>
                    {transfer.estimatedArrival && (
                      <div>
                        <p className="text-muted-foreground">ETA</p>
                        <p className="font-medium text-foreground">{transfer.estimatedArrival}</p>
                      </div>
                    )}
                  </div>
                  
                  {transfer.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{transfer.notes}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {transfer.status === 'pending' && (
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
