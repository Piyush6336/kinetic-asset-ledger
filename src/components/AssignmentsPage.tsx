
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Plus, Search, Calendar, ArrowDown } from 'lucide-react';
import { Assignment, Expenditure } from '@/types';
import { useToast } from '@/hooks/use-toast';

const mockAssignments: Assignment[] = [
  {
    id: '1',
    assetId: 'asset1',
    assetName: 'M4A1 Rifle',
    assetType: 'weapon',
    assignedTo: 'Sgt. John Martinez',
    assignedBy: 'Col. Michael Roberts',
    assignmentDate: '2024-01-10',
    expectedReturnDate: '2024-02-10',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    status: 'active',
    purpose: 'Training Exercise Alpha'
  },
  {
    id: '2',
    assetId: 'asset2',
    assetName: 'Night Vision Goggles',
    assetType: 'equipment',
    assignedTo: 'Cpl. Sarah Davis',
    assignedBy: 'Capt. Lisa Chen',
    assignmentDate: '2024-01-08',
    expectedReturnDate: '2024-01-18',
    actualReturnDate: '2024-01-17',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    status: 'returned',
    purpose: 'Night Patrol Duty'
  },
  {
    id: '3',
    assetId: 'asset3',
    assetName: 'Humvee M1151',
    assetType: 'vehicle',
    assignedTo: 'Lt. Kevin Brown',
    assignedBy: 'Maj. Robert Davis',
    assignmentDate: '2024-01-05',
    expectedReturnDate: '2024-01-15',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    status: 'overdue',
    purpose: 'Border Patrol Mission'
  }
];

const mockExpenditures: Expenditure[] = [
  {
    id: '1',
    assetName: '5.56mm Ammunition',
    assetType: 'ammunition',
    quantity: 1500,
    expendedBy: 'Training Unit Bravo',
    expenditureDate: '2024-01-14',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    reason: 'Live Fire Training Exercise',
    authorizedBy: 'Col. Michael Roberts',
    cost: 675,
    notes: 'Standard marksmanship training'
  },
  {
    id: '2',
    assetName: 'Tactical Vest',
    assetType: 'equipment',
    quantity: 2,
    expendedBy: 'EOD Team Alpha',
    expenditureDate: '2024-01-12',
    baseId: 'base1',
    baseName: 'Fort Liberty',
    reason: 'Damaged during operations',
    authorizedBy: 'Maj. Robert Davis',
    cost: 450,
    notes: 'Equipment damaged beyond repair during IED disposal'
  }
];

export function AssignmentsPage() {
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [expenditures] = useState<Expenditure[]>(mockExpenditures);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isExpenditureDialogOpen, setIsExpenditureDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredExpenditures = expenditures.filter(expenditure => {
    const matchesSearch = expenditure.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expenditure.expendedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getAssignmentStatusBadge = (status: string) => {
    const variants = {
      active: 'status-active',
      returned: 'status-completed',
      overdue: 'bg-red-900/20 text-red-400 border border-red-800'
    };
    return variants[status as keyof typeof variants] || 'status-pending';
  };

  const handleNewAssignment = () => {
    toast({
      title: "Asset Assigned",
      description: "The asset has been successfully assigned.",
    });
    setIsAssignmentDialogOpen(false);
  };

  const handleNewExpenditure = () => {
    toast({
      title: "Expenditure Recorded",
      description: "The asset expenditure has been recorded.",
    });
    setIsExpenditureDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assignments & Expenditures</h1>
          <p className="text-muted-foreground">
            Track asset assignments and expenditures across operations
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-card border border-border">
              <DialogHeader>
                <DialogTitle>Create Asset Assignment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset-select">Select Asset</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rifle1">M4A1 Rifle #001</SelectItem>
                        <SelectItem value="vehicle1">Humvee #H001</SelectItem>
                        <SelectItem value="radio1">Radio Set #R001</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assigned-to">Assigned To</Label>
                    <Input id="assigned-to" placeholder="Personnel name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignment-date">Assignment Date</Label>
                    <Input id="assignment-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="return-date">Expected Return Date</Label>
                    <Input id="return-date" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input id="purpose" placeholder="Assignment purpose" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes..." />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewAssignment}>
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isExpenditureDialogOpen} onOpenChange={setIsExpenditureDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowDown className="h-4 w-4 mr-2" />
                Record Expenditure
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-card border border-border">
              <DialogHeader>
                <DialogTitle>Record Asset Expenditure</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exp-asset">Asset Name</Label>
                    <Input id="exp-asset" placeholder="Asset name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exp-quantity">Quantity</Label>
                    <Input id="exp-quantity" type="number" placeholder="Quantity used" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expended-by">Expended By</Label>
                    <Input id="expended-by" placeholder="Unit/Person" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exp-date">Expenditure Date</Label>
                    <Input id="exp-date" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input id="reason" placeholder="Reason for expenditure" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authorized-by">Authorized By</Label>
                  <Input id="authorized-by" placeholder="Authorizing officer" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsExpenditureDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewExpenditure}>
                  Record Expenditure
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assignments">Asset Assignments</TabsTrigger>
          <TabsTrigger value="expenditures">Expenditures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6">
          {/* Assignment Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assignments..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Assignments List */}
          <div className="grid gap-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{assignment.assetName}</h3>
                        <Badge className={`status-badge ${getAssignmentStatusBadge(assignment.status)}`}>
                          {assignment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Assigned To</p>
                          <p className="font-medium text-foreground">{assignment.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Assignment Date</p>
                          <p className="font-medium text-foreground">{assignment.assignmentDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expected Return</p>
                          <p className="font-medium text-foreground">{assignment.expectedReturnDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purpose</p>
                          <p className="font-medium text-foreground">{assignment.purpose}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {assignment.status === 'active' && (
                        <Button size="sm">
                          Mark Returned
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expenditures" className="space-y-6">
          {/* Expenditures List */}
          <div className="grid gap-4">
            {filteredExpenditures.map((expenditure) => (
              <Card key={expenditure.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{expenditure.assetName}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-medium text-foreground">{expenditure.quantity.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expended By</p>
                          <p className="font-medium text-foreground">{expenditure.expendedBy}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium text-foreground">{expenditure.expenditureDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cost</p>
                          <p className="font-medium text-foreground">${expenditure.cost.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Reason:</strong> {expenditure.reason}
                        </p>
                        {expenditure.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{expenditure.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
