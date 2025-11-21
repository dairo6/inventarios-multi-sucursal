# Manual de Usuario — Inventario Multi Sucursal (IMS)

**Autor:** Dairo Alfonso Arcia Macea

**Curso:** Desarrollo Web

**Fecha:** 21/11/2025

---

Este manual está pensado para mostrar los pasos de uso (CRUD) de las pantallas principales del sistema.

---

## 1. Inicio de sesión (Login)

- Ruta API: `POST /api/login`
- Campos: `email`, `password`

Pantalla: inicio de sesión

![LOGIN_PLACEHOLDER](./Anexos/login.png)

Pasos rápidos:
1. Abrir la app en el navegador.
2. Ingresar `email` y `password`.
3. Pulsar `Ingresar`.
4. Tras login exitoso, se guarda el token en `localStorage` y se redirige al dashboard.

## 2. Inicio (Home)

![INICIO-SISTEMA](./Anexos/Inicio-Sistema.png)

## 3. Categorías (Category)

Propósito: agrupar productos por categoría.

- Endpoints principales:
  - `GET /api/categories`
  - `POST /api/categories`
  - `PATCH /api/categories/:id`
  - `DELETE /api/categories/:id/logic`

Capturas:

Listado
![CATEGORY_LIST](./Anexos/category-list.png)

Crear
![CATEGORY_CREATE](./Anexos/category-create.png)

Editar
![CATEGORY_EDIT](./Anexos/category-edit.png)

---

## 4. Proveedores (Suppliers)

- Endpoints principales:
  - `GET /api/suppliers`
  - `POST /api/suppliers`
  - `PATCH /api/suppliers/:id`
  - `DELETE /api/suppliers/:id/logic`

Capturas:

Listado
![SUPPLIER_LIST](./Anexos/supplier-list.png)

Crear
![SUPPLIER_CREATE](./Anexos/supplier-create.png)

Editar
![SUPPLIER_EDIT](./Anexos/supplier-edit.png)

---

## 5. Productos (Products)

Propósito: catálogo de productos.

- Endpoints principales:
  - `GET /api/productos`
  - `POST /api/productos`
  - `PATCH /api/productos/:id`
  - `DELETE /api/productos/:id/logic`

Capturas:

Listado
![PRODUCT_LIST](./Anexos/product-list.png)

Crear
![PRODUCT_CREATE](./Anexos/product-create.png)

Editar
![PRODUCT_EDIT](./Anexos/product-edit.png)



---

## 6. Lotes (Lots)

- Endpoints principales:
  - `GET /api/lots`
  - `POST /api/lots`
  - `PATCH /api/lots/:id`
  - `DELETE /api/lots/:id/logic`

Capturas:

Listado
![LOT_LIST](./Anexos/lot-list.png)

Crear
![LOT_CREATE](./Anexos/lot-create.png)

Editar
![LOT_EDIT](./Anexos/lot-edit.png)

---

## 7. Movimientos de inventario (Inventory Movements)

- Endpoints principales:
  - `GET /api/inventory-movements`
  - `POST /api/inventory-movements`
  - `PATCH /api/inventory-movements/:id`
  - `DELETE /api/inventory-movements/:id/logic`

Capturas:

Listado
![INV_MOV_LIST](./Anexos/inventory-movement-list.png)

Crear (IN/OUT/TRANSFER)
![INV_MOV_CREATE](./Anexos/inventory-movement-create.png)

---

## 8. Sucursales (Branches)

- Endpoints principales:
  - `GET /api/branches`
  - `POST /api/branches`
  - `PATCH /api/branches/:id`
  - `DELETE /api/branches/:id/logic`

Capturas:

Listado
![BRANCH_LIST](./Anexos/branch-list.png)

Crear
![BRANCH_CREATE](./Anexos/branch-create.png)

Editar
![BRANCH_EDIT](./Anexos/branch-edit.png)

---

## 9. Almacenes (Warehouses)

- Endpoints principales:
  - `GET /api/warehouses`
  - `POST /api/warehouses`
  - `PATCH /api/warehouses/:id`
  - `DELETE /api/warehouses/:id/logic`

Capturas:

Listado
![WAREHOUSE_LIST](./Anexos/warehouse-list.png)

Crear
![WAREHOUSE_CREATE](./Anexos/warehouse-create.png)

Editar
![WAREHOUSE_EDIT](./Anexos/warehouse-edit.png)

---

## 10. Ubicaciones (Locations)

- Endpoints principales:
  - `GET /api/locations`
  - `POST /api/locations`
  - `PATCH /api/locations/:id`
  - `DELETE /api/locations/:id/logic`

Capturas:

Listado
![LOCATION_LIST](./Anexos/location-list.png)

Crear
![LOCATION_CREATE](./Anexos/location-create.png)

Editar
![LOCATION_EDIT](./Anexos/location-edit.png)

---

## 11. Stock por Sucursal (StockBranch)

- Endpoints principales:
  - `GET /api/stock-branch`
  - `POST /api/stock-branch`
  - `PATCH /api/stock-branch/:id`

Capturas:

Listado
![STOCKBRANCH_LIST](./Anexos/stockbranch-list.png)

Crear
![STOCKBRANCH_CREATE](./Anexos/stockbranch-create.png)

Actualizar stock
![STOCKBRANCH_UPDATE](./Anexos/stockbranch-update.png)

---

## 12. Garantías (Guarantee)

- Endpoints principales:
  - `GET /api/guarantees`
  - `POST /api/guarantees`
  - `PATCH /api/guarantees/:id`

Capturas:

Listado
![GUARANTEE_LIST](./Anexos/guarantee-list.png)

Crear
![GUARANTEE_CREATE](./Anexos/guarantee-create.png)

Editar
![GUARANTEE_EDIT](./Anexos/guarantee-edit.png)

---

## 13. Cerar seecion

![CERRAR_SECCION ](./Anexos/Cerrar-Seccion.png)