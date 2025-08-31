import { Routes } from '@angular/router';

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

//Componnet UI
import { MovementForm } from './components/ui/movement-form/movement-form';
import { StockGrid } from './components/ui/stock-grid/stock-grid';



export const routes: Routes = [

    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },

    // Products
    { path: 'products', component: ListProduct },
    { path: 'products/create', component: CreateProduct },
    { path: 'products/update/:id', component: UpdateProduct },
    { path: 'products/delete/:id', component: DeleteProduct },


    // Categories
    { path: 'categories', component: ListCategory },
    { path: 'categories/create', component: CreateCategory },
    { path: 'categories/update/:id', component: UpdateCategory },
    { path: 'categories/delete/:id', component: DeleteCategory },

    // Suppliers
    { path: 'suppliers', component: ListSupplier },
    { path: 'suppliers/create', component: CreateSupplier },
    { path: 'suppliers/update/:id', component: UpdateSupplier },
    { path: 'suppliers/delete/:id', component: DeleteSupplier },

    // Branches
    { path: 'branches', component: ListBranch },
    { path: 'branches/create', component: CreateBranch },
    { path: 'branches/update/:id', component: UpdateBranch },
    { path: 'branches/delete/:id', component: DeleteBranch },

    // Stock by Branch
    { path: 'stock-branches', component: ListStockBranch },
    { path: 'stock-branches/create', component: CreateStockBranch },
    { path: 'stock-branches/update/:id', component: UpdateStockBranch },
    { path: 'stock-branches/delete/:id', component: DeleteStockBranch },

    // Inventory Movements (NO delete)
    { path: 'inventory-movements', component: ShowInventoryMovement },
    { path: 'inventory-movements/create', component: CreateInventoryMovement },
    { path: 'inventory-movements/update/:id', component: UpdateInventoryMovement },

    // Warehouses
    { path: 'warehouses', component: ListWarehouse },
    { path: 'warehouses/create', component: CreateWarehouse },
    { path: 'warehouses/update/:id', component: UpdateWarehouse },
    { path: 'warehouses/delete/:id', component: DeleteWarehouse },

    // Locations
    { path: 'locations', component: ListLocation },
    { path: 'locations/create', component: CreateLocation },
    { path: 'locations/update/:id', component: UpdateLocation },
    { path: 'locations/delete/:id', component: DeleteLocation },

    // Guarantees
    { path: 'guarantees', component: ListGuarantee },
    { path: 'guarantees/create', component: CreateGuarantee },
    { path: 'guarantees/update/:id', component: UpdateGuarantee },
    { path: 'guarantees/delete/:id', component: DeleteGuarantee },

    // Lots
    { path: 'lots', component: ListLot },
    { path: 'lots/create', component: CreateLot },
    { path: 'lots/update/:id', component: UpdateLot },
    { path: 'lots/delete/:id', component: DeleteLot },

    // UI
    { path: 'guarantees', component: ListGuarantee },
    { path: 'guarantees/create', component: CreateGuarantee },
    { path: 'guarantees/update/:id', component: UpdateGuarantee },
    { path: 'guarantees/delete/:id', component: DeleteGuarantee },
];
