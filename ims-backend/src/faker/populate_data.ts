// Script para poblar la base de datos con datos falsos usando Faker
import { fakerES as faker } from '@faker-js/faker';
import { Branch } from "../models/branch";
import { Category } from '../models/category';
import { Guarantee } from '../models/guarantee';
import { InventoryMovement } from '../models/inventorymovement';
import { Location } from '../models/location';
import { Lot } from '../models/lot';
import { Product } from '../models/product';
import { StockBranch } from '../models/stockbranch';
import { Supplier } from '../models/supplier';
import { Warehouse } from '../models/warehouse';



async function createFakeData() {
    // 🔹 Crear Branches

    const branchNames = [
        "Sucursal Norte",
        "Sucursal Sur",
        "Sucursal Principal",
        "Sucursal La 33",
        "Sucursal Industrial",
        "Sucursal Centro",
        "Sucursal El Prado",
        "Sucursal Las Palmas",
        "Sucursal Costa Azul",
        "Sucursal San Pedro"
    ];

    for (let i = 0; i < 59; i++) {
        await Branch.create({
            name: faker.helpers.arrayElement(branchNames),
            code: faker.string.alphanumeric(6).toUpperCase(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            status: "ACTIVE",
        });
    }

    // 🔹 Crear Categorías
    for (let i = 0; i < 59; i++) {
        await Category.create({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            status: "ACTIVE",
        });
    }

    // 🔹 Crear Proveedores
    for (let i = 0; i < 59; i++) {
        await Supplier.create({
            name: faker.company.name(),
            taxId: faker.string.numeric(10),
            phone: faker.phone.number(),
            contactName: faker.person.fullName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            status: "ACTIVE",
        });
    }

    // 🔹 Obtener registros existentes
    const categories = await Category.findAll();
    const suppliers = await Supplier.findAll();

    // 🔹 Crear Productos
    const createdProducts: Product[] = [];

    for (let i = 0; i < 59; i++) {
        const randomCategory = faker.helpers.arrayElement(categories);
        const randomSupplier = faker.helpers.arrayElement(suppliers);

        const product = await Product.create({
            name: faker.commerce.productName(),
            code: faker.string.alphanumeric(8).toUpperCase(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
            quantity: faker.number.int({ min: 0, max: 100 }),
            unit: faker.helpers.arrayElement(["pcs", "kg", "ltr", "box"]),
            category_id: randomCategory.id,
            supplier_id: randomSupplier.id,
            status: "ACTIVE",
        });

        createdProducts.push(product);
    }

    // 🔹 Crear Garantías (1:1 opcional)
    for (const product of createdProducts) {
        // 50% de probabilidad de tener garantía
        if (faker.datatype.boolean()) {
            await Guarantee.create({
                product_id: product.id,
                description: faker.lorem.sentence(),
                durationMonths: faker.number.int({ min: 3, max: 24 }),
                terms: faker.lorem.paragraph(),
                status: "ACTIVE",
            });
        }
    }


    // 🔹 Create warehouses

    const warehouseNames = [
        "Almacén Norte Principal",
        "Depósito Sur Logístico",
        "Centro de Distribución La 33",
        "Bodega Industrial Central",
        "Almacén del Centro",
        "Depósito El Prado",
        "Bodega Las Palmas",
        "Centro Logístico Costa Azul",
        "Almacén San Pedro",
        "Bodega Metropolitana"
    ];

    const branches = await Branch.findAll();
    const createdWarehouses: Warehouse[] = [];

    for (let i = 0; i < 59; i++) {
        const randomBranch = faker.helpers.arrayElement(branches);
        const warehouse = await Warehouse.create({
            branch_id: randomBranch.id,
            name: faker.helpers.arrayElement(warehouseNames),
            code: faker.string.alphanumeric(6).toUpperCase(),
            description: faker.company.catchPhrase(),
            status: "ACTIVE",
        });
        createdWarehouses.push(warehouse);
    }

    // 🔹 Create locations
    const createdLocations: Location[] = [];

    for (const warehouse of createdWarehouses) {
        const numLocations = faker.number.int({ min: 5, max: 20 });
        for (let i = 0; i < numLocations; i++) {
            const location = await Location.create({
                warehouse_id: warehouse.id,
                code: `LOC-${faker.string.alphanumeric(5).toUpperCase()}`,
                description: faker.commerce.productDescription(),
                status: "AVAILABLE",
            });
            createdLocations.push(location);
        }
    }

    // 🔹 Create lots
    const createdLots: Lot[] = [];

    for (const product of createdProducts) {
        const numLots = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < numLots; i++) {
            const lot = await Lot.create({
                product_id: product.id,
                code: `LOT-${faker.string.alphanumeric(8).toUpperCase()}`, // Código único
                expirationDate: faker.date.future(),
                quantity: faker.number.int({ min: 1, max: 50 }),
                status: "AVAILABLE",
            });
            createdLots.push(lot);
        }
    }

    // 🔹 Create stock branches
    for (const branch of branches) {
        for (const product of createdProducts) {
            await StockBranch.create({
                branch_id: branch.id,
                product_id: product.id,
                quantity: faker.number.int({ min: 0, max: 100 }),
                minStock: faker.number.int({ min: 5, max: 20 }),
                maxStock: faker.number.int({ min: 50, max: 200 }),
                status: "ACTIVE",
            });
        }
    }

    // 🔹 Create inventory movements
    for (let i = 0; i < 200; i++) {
        const randomProduct = faker.helpers.arrayElement(createdProducts);
        const randomWarehouse = faker.helpers.arrayElement(createdWarehouses);
        const randomLot = faker.helpers.arrayElement(createdLots);

        await InventoryMovement.create({
            product_id: randomProduct.id,
            warehouse_id: randomWarehouse.id,
            lot_id: randomLot.id,
            movementType: faker.helpers.arrayElement(["IN", "OUT", "TRANSFER"]),
            quantity: faker.number.int({ min: 1, max: 20 }),
            reference: faker.lorem.sentence(),

            // Nuevo campo obligatorio
            status: "ACTIVE",
        });
    }


}


createFakeData().then(() => {
    console.log('Datos falsos creados exitosamente');
}).catch((error) => {
    console.error('Error al crear datos falsos:', error);
});

// Para ejecutar este script, ejecute el siguiente comando:
// npm install -g ts-node
// ts-node src/faker/populate_data.ts
// npm install @faker-js/faker