
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Filter, ArrowUp, ArrowDown, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data
const mockMetrics = {
  openingBalance: 2450,
  closingBalance: 2680,
  netMovement: 230,
  purchases: 150,
  transfersIn: 120,
  transfersOut: 40,
  assigned: 890,
  expended: 45
};

const mockRecentActivities = [
  {
    id: '1',
    type: 'purchase',
    description: 'M4A1 Rifles - Batch #2024-001',
    amount: 50,
    base: 'Fort Liberty',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2', 
    type: 'transfer',
    description: 'Vehicle Transfer - Fort Liberty to Camp Pendleton',
    amount: 3,
    base: 'Fort Liberty',
    date: '2024-01-14',
    status: 'in_transit'
  },
  {
    id: '3',
    type: 'assignment',
    description: 'Communication Equipment - Field Exercise',
    amount: 15,
    base: 'Fort Liberty',
    date: '2024-01-13',
    status: 'active'
  }
];

export function Dashboard() {
  const { user } = useAuth();
  const [dateFilter, setDateFilter] = useState('');
  const [baseFilter, setBaseFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'status-completed',
      in_transit: 'status-pending', 
      active: 'status-active'
    };
    return variants[status as keyof typeof variants] || 'status-pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time asset tracking and management overview
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="date-filter" className="text-sm whitespace-nowrap">Date Range:</Label>
            <Input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-auto"
            />
          </div>
          
          {user?.role === 'admin' && (
            <Select value={baseFilter} onValueChange={setBaseFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Base" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bases</SelectItem>
                <SelectItem value="base1">Fort Liberty</SelectItem>
                <SelectItem value="base2">Camp Pendleton</SelectItem>
                <SelectItem value="base3">Joint Base Lewis</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Equipment Type" />
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
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opening Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.openingBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total assets at period start</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closing Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.closingBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current total assets</p>
          </CardContent>
        </Card>

        <Card className="metric-card border-primary/20 hover:border-primary/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Movement</CardTitle>
            <div className="flex items-center">
              {mockMetrics.netMovement > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-400" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-400" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+{mockMetrics.netMovement.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Purchases: {mockMetrics.purchases} | In: {mockMetrics.transfersIn} | Out: {mockMetrics.transfersOut}
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets in Use</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.assigned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Assigned: {mockMetrics.assigned} | Expended: {mockMetrics.expended}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Activities</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {activity.type === 'purchase' && <Plus className="h-5 w-5 text-green-400" />}
                    {activity.type === 'transfer' && <ArrowRight className="h-5 w-5 text-blue-400" />}
                    {activity.type === 'assignment' && <ArrowUp className="h-5 w-5 text-yellow-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.base} • Quantity: {activity.amount} • {activity.date}
                    </p>
                  </div>
                </div>
                <Badge className={`status-badge ${getStatusBadge(activity.status)}`}>
                  {activity.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
