
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'base_commander' | 'logistics_officer';
  baseId?: string;
  baseName?: string;
}

export interface Base {
  id: string;
  name: string;
  location: string;
  code: string;
  commanderId: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'vehicle' | 'weapon' | 'ammunition' | 'equipment';
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  baseId: string;
  value: number;
  purchaseDate: string;
  lastMaintenanceDate?: string;
}

export interface Purchase {
  id: string;
  assetName: string;
  assetType: Asset['type'];
  quantity: number;
  unitPrice: number;
  totalCost: number;
  vendor: string;
  purchaseDate: string;
  baseId: string;
  baseName: string;
  purchasedBy: string;
  status: 'pending' | 'approved' | 'delivered';
  notes?: string;
}

export interface Transfer {
  id: string;
  assetId?: string;
  assetName: string;
  assetType: Asset['type'];
  quantity: number;
  fromBaseId: string;
  fromBaseName: string;
  toBaseId: string;
  toBaseName: string;
  transferDate: string;
  initiatedBy: string;
  approvedBy?: string;
  status: 'pending' | 'in_transit' | 'completed' | 'rejected';
  notes?: string;
  estimatedArrival?: string;
}

export interface Assignment {
  id: string;
  assetId: string;
  assetName: string;
  assetType: Asset['type'];
  assignedTo: string;
  assignedBy: string;
  assignmentDate: string;
  expectedReturnDate?: string;
  actualReturnDate?: string;
  baseId: string;
  baseName: string;
  status: 'active' | 'returned' | 'overdue';
  purpose: string;
  notes?: string;
}

export interface Expenditure {
  id: string;
  assetName: string;
  assetType: Asset['type'];
  quantity: number;
  expendedBy: string;
  expenditureDate: string;
  baseId: string;
  baseName: string;
  reason: string;
  authorizedBy: string;
  cost: number;
  notes?: string;
}

export interface DashboardMetrics {
  openingBalance: number;
  closingBalance: number;
  netMovement: number;
  purchases: number;
  transfersIn: number;
  transfersOut: number;
  assigned: number;
  expended: number;
}
