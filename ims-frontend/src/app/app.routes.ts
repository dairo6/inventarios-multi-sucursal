import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

import { AuthGuard } from './guards/authguard';

//Component Product
import { ListProduct } from './components/product/list-product/list-product';
import { CreateProduct } from './components/product/create-product/create-product';
import { UpdateProduct } from './components/product/update-product/update-product';
import { ProductSummary } from './components/product/product-summary/product-summary';
import { DeleteProduct } from './components/product/delete-product/delete-product';

//Component Category
import { ListCategory } from './components/category/list-category/list-category';
import { CreateCategory } from './components/category/create-category/create-category';
import { UpdateCategory } from './components/category/update-category/update-category';
import { DeleteCategory } from './components/category/delete-category/delete-category';

//Component Branch
import { ListBranch } from './components/branch/list-branch/list-branch';
import { CreateBranch } from './components/branch/create-branch/create-branch';
import { UpdateBranch } from './components/branch/update-branch/update-branch';
import { DeleteBranch } from './components/branch/delete-branch/delete-branch';

//Component Location
import { ListLocation } from './components/location/list-location/list-location';
import { CreateLocation } from './components/location/create-location/create-location';
import { UpdateLocation } from './components/location/update-location/update-location';
import { DeleteLocation } from './components/location/delete-location/delete-location';

//Component Supplier
import { ListSupplier } from './components/supplier/list-supplier/list-supplier';
import { CreateSupplier } from './components/supplier/create-supplier/create-supplier';
import { UpdateSupplier } from './components/supplier/update-supplier/update-supplier';
import { DeleteSupplier } from './components/supplier/delete-supplier/delete-supplier';

//Component Warehouse
import { ListWarehouse } from './components/warehouse/list-warehouse/list-warehouse';
import { CreateWarehouse } from './components/warehouse/create-warehouse/create-warehouse';
import { UpdateWarehouse } from './components/warehouse/update-warehouse/update-warehouse';
import { DeleteWarehouse } from './components/warehouse/delete-warehouse/delete-warehouse';

//Component Lot
import { ListLot } from './components/lot/list-lot/list-lot';
import { CreateLot } from './components/lot/create-lot/create-lot';
import { UpdateLot } from './components/lot/update-lot/update-lot';
import { DeleteLot } from './components/lot/delete-lot/delete-lot';

//Component Stock by Branch
import { ListStockBranch } from './components/stock-branch/list-stock-branch/list-stock-branch';
import { CreateStockBranch } from './components/stock-branch/create-stock-branch/create-stock-branch';
import { UpdateStockBranch } from './components/stock-branch/update-stock-branch/update-stock-branch';
import { DeleteStockBranch } from './components/stock-branch/delete-stock-branch/delete-stock-branch';

//Component Inventory Movement
import { CreateInventoryMovement } from './components/inventory-movement/create-inventory-movement/create-inventory-movement';
import { ShowInventoryMovement } from './components/inventory-movement/show-inventory-movement/show-inventory-movement';
import { UpdateInventoryMovement } from './components/inventory-movement/update-inventory-movement/update-inventory-movement';


//Component Guarantee
import { ListGuarantee } from './components/guarantee/list-guarantee/list-guarantee';
import { CreateGuarantee } from './components/guarantee/create-guarantee/create-guarantee';
import { UpdateGuarantee } from './components/guarantee/update-guarantee/update-guarantee';
import { DeleteGuarantee } from './components/guarantee/delete-guarantee/delete-guarantee';




export const routes: Routes = [

    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "register",
        component: Register
    },
    // Products
    { path: 'products', component: ListProduct, canActivate: [AuthGuard] },
    { path: 'products/create', component: CreateProduct, canActivate: [AuthGuard]},
    { path: 'products/update/:id', component: UpdateProduct, canActivate: [AuthGuard]},
    { path: 'products/delete/:id', component: DeleteProduct, canActivate: [AuthGuard]},


    // Categories
    { path: 'categories', component: ListCategory, canActivate: [AuthGuard]},
    { path: 'categories/create', component: CreateCategory, canActivate: [AuthGuard]},
    { path: 'categories/update/:id', component: UpdateCategory, canActivate: [AuthGuard]},
    { path: 'categories/delete/:id', component: DeleteCategory, canActivate: [AuthGuard]},

    // Suppliers
    { path: 'suppliers', component: ListSupplier, canActivate: [AuthGuard]},
    { path: 'suppliers/create', component: CreateSupplier, canActivate: [AuthGuard]},
    { path: 'suppliers/update/:id', component: UpdateSupplier, canActivate: [AuthGuard]},
    { path: 'suppliers/delete/:id', component: DeleteSupplier, canActivate: [AuthGuard]},

    // Branches
    { path: 'branches', component: ListBranch, canActivate: [AuthGuard] },
    { path: 'branches/create', component: CreateBranch, canActivate: [AuthGuard] },
    { path: 'branches/update/:id', component: UpdateBranch, canActivate: [AuthGuard] },
    { path: 'branches/delete/:id', component: DeleteBranch, canActivate: [AuthGuard] },

    // Stock by Branch
    { path: 'stock-branches', component: ListStockBranch, canActivate: [AuthGuard] },
    { path: 'stock-branches/create', component: CreateStockBranch, canActivate: [AuthGuard] },
    { path: 'stock-branches/update/:id', component: UpdateStockBranch, canActivate: [AuthGuard] },
    { path: 'stock-branches/delete/:id', component: DeleteStockBranch, canActivate: [AuthGuard] },

    // Inventory Movements (NO delete)
    { path: 'inventory-movements', component: ShowInventoryMovement, canActivate: [AuthGuard] },
    { path: 'inventory-movements/create', component: CreateInventoryMovement, canActivate: [AuthGuard] },
    { path: 'inventory-movements/update/:id', component: UpdateInventoryMovement, canActivate: [AuthGuard] },

    // Warehouses
    { path: 'warehouses', component: ListWarehouse, canActivate: [AuthGuard] },
    { path: 'warehouses/create', component: CreateWarehouse, canActivate: [AuthGuard] },
    { path: 'warehouses/update/:id', component: UpdateWarehouse, canActivate: [AuthGuard] },
    { path: 'warehouses/delete/:id', component: DeleteWarehouse, canActivate: [AuthGuard] },

    // Locations
    { path: 'locations', component: ListLocation, canActivate: [AuthGuard] },
    { path: 'locations/create', component: CreateLocation, canActivate: [AuthGuard] },
    { path: 'locations/update/:id', component: UpdateLocation, canActivate: [AuthGuard] },
    { path: 'locations/delete/:id', component: DeleteLocation, canActivate: [AuthGuard] },

    // Guarantees
    { path: 'guarantees', component: ListGuarantee, canActivate: [AuthGuard] },
    { path: 'guarantees/create', component: CreateGuarantee, canActivate: [AuthGuard] },
    { path: 'guarantees/update/:id', component: UpdateGuarantee, canActivate: [AuthGuard] },
    { path: 'guarantees/delete/:id', component: DeleteGuarantee, canActivate: [AuthGuard] },

    // Lots
    { path: 'lots', component: ListLot, canActivate: [AuthGuard] },
    { path: 'lots/create', component: CreateLot, canActivate: [AuthGuard] },
    { path: 'lots/update/:id', component: UpdateLot, canActivate: [AuthGuard] },
    { path: 'lots/delete/:id', component: DeleteLot, canActivate: [AuthGuard] },

    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
    }

    // UI
    
];
