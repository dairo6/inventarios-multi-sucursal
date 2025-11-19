# 🏪 Inventarios Multi-Sucursal

## 📖 Descripción
Sistema para la gestión de inventarios en múltiples sucursales, que permite registrar, consultar y controlar productos, lotes, movimientos y stock.  
Está diseñado para ofrecer una administración centralizada, optimizando el control del inventario en tiempo real.

---

## 📚 Historia
Una empresa necesita un sistema para controlar el inventario distribuido en varias sucursales, registrando movimientos de entrada y salida, controlando lotes y permitiendo identificar rápidamente la ubicación y disponibilidad de los productos.

---

## ✨ Funcionalidades
- 📦 **Gestión de productos:** crear, editar y eliminar productos.
- 🏷 **Categorías de productos:** clasificación para una mejor organización.
- 🏬 **Gestión de sucursales:** asignación y visualización de stock por sucursal.
- 📊 **Control de stock:** visualización en tiempo real del inventario disponible.
- 📑 **Lotes y vencimientos:** registro y seguimiento de lotes con fecha de vencimiento.
- 🔄 **Movimientos de inventario:** entradas y salidas, con control por ubicación.
- 🔍 **Filtros avanzados:** búsqueda por producto, categoría, sucursal, lote o ubicación.
- 📱 **Interfaz responsive:** adaptada para computadoras, tablets y móviles.

---

## 🛠️ Tecnologías utilizadas (Frontend)
- **Framework:** Angular
- **Componentes UI:** PrimeNG + Tailwind css
- **Lenguajes:** TypeScript, HTML, CSS
- **Gestión de dependencias:** NPM
- **Control de versiones:** Git + GitHub

---

# Manual de Usuario

## Introducción
Este manual de usuario describe el funcionamiento del sistema **Inventarios Multi‑Sucursal (IMS)**, incluyendo la plantilla base (layout) y el CRUD de cada uno de los módulos disponibles. 
---

## 1. Pantalla de Inicio de Sesión
Aquí se muestran las vistas y funcionamiento del módulo de autenticación, donde el usuario debe ingresar su correo y contraseña para acceder al sistema.

### **1.1. Formulario de Login**
- Campo de correo electrónico.
- Campo de contraseña.
- Botón para iniciar sesión.
- Acceso a la opción de registro de nuevos usuarios.

(![alt text](image.png))

(<img width="1361" height="675" alt="image" src="https://github.com/user-attachments/assets/5946a89a-ed34-4ac4-b429-34764480448b" />)


---

## 2. Plantilla Base del Sistema (Layout)
El sistema cuenta con un layout compuesto por **Aside**, **Header**, **Footer** y un contenedor principal.

<img width="1372" height="679" alt="image" src="https://github.com/user-attachments/assets/92c4e263-c80c-4b74-b7b8-ecd787d58ba0" />


### **2.1. Menú lateral (Aside)**
- Muestra las opciones de navegación.
- Se oculta automáticamente en pantallas pequeñas y puede expandirse.

<img width="273" height="599" alt="image" src="https://github.com/user-attachments/assets/17116c4e-b7c8-43d3-ac44-151205650b48" />


### **2.2. Encabezado (Header)**
- Muestra el título y opciones globales.
- Botón para abrir/cerrar el menú lateral.

  <img width="1094" height="57" alt="image" src="https://github.com/user-attachments/assets/75088833-66e6-4570-acca-538386009eba" />


### **2.3. Contenedor principal**
- Aquí se cargan los módulos según la navegación.

<img width="1088" height="485" alt="image" src="https://github.com/user-attachments/assets/e9e7de3e-41ae-4ad6-83c1-878a61319892" />

---

## 3. Módulo de Sucursales (Branch)
CRUD completo para administrar sucursales del sistema.

### **3.1. Crear Sucursal**
- Formulario con nombre, dirección, estado, etc.
- Botón "Crear".

<img width="1363" height="679" alt="image" src="https://github.com/user-attachments/assets/f3da5ce1-8b4f-4cc1-a978-7749e036aa64" />

### **3.2. Listar Sucursales**
- Tabla con todas las sucursales registradas.
- Botones: editar ✓, eliminar ✗.

<img width="1365" height="677" alt="image" src="https://github.com/user-attachments/assets/816c0f9d-af45-41df-9c23-a6df01e5635c" />

### **3.3. Editar Sucursal**
- Se cargan los datos en un formulario editable.

<img width="1365" height="677" alt="image" src="https://github.com/user-attachments/assets/19a0876a-0b14-4888-92db-2fd6e2107401" />

<img width="1359" height="681" alt="image" src="https://github.com/user-attachments/assets/6f16895d-9527-4a45-bb53-fface58a0868" />

<img width="1365" height="682" alt="image" src="https://github.com/user-attachments/assets/ca5aa3aa-6b6c-4b07-949d-2863dd24de83" />



### **3.4. Eliminar Sucursal**
- Confirmación antes de borrar.

<img width="1365" height="719" alt="image" src="https://github.com/user-attachments/assets/8fa70c04-8c6a-4d1f-b827-774fdc5dc863" />

<img width="1365" height="767" alt="Captura de pantalla 2025-11-19 020540" src="https://github.com/user-attachments/assets/bde65a98-2d53-47f8-a9b3-c42f9669c844" />


---

## 4. Módulo de Ubicaciones (Location)
CRUD para gestionar ubicaciones dentro de cada sucursal.

### **4.1. Crear Ubicación**
<img width="1362" height="678" alt="image" src="https://github.com/user-attachments/assets/f90c849a-0791-4985-9f25-94ad65e91816" />

### **4.2. Listar Ubicaciones**
<img width="1365" height="678" alt="image" src="https://github.com/user-attachments/assets/837dfb1a-9cfc-4c1b-9863-9c1e779d8f5d" />

### **4.3. Editar Ubicación**
<img width="1365" height="681" alt="image" src="https://github.com/user-attachments/assets/d8b7ab1d-09ea-446d-b9aa-a3900677dbb9" />

### **4.4. Eliminar Ubicación**
<img width="1364" height="679" alt="image" src="https://github.com/user-attachments/assets/bb825b25-62ea-4fde-8dea-9e87c9a53c1b" />

<img width="1365" height="767" alt="Captura de pantalla 2025-11-19 021022" src="https://github.com/user-attachments/assets/2dcdd9cd-3070-49dd-8ea1-5a1028ba9879" />


---

## 5. Módulo de Lotes (Lot)
CRUD para administrar lotes de productos.

### **5.1. Crear Lote**
<img width="1365" height="686" alt="image" src="https://github.com/user-attachments/assets/f62f861a-cbd0-444b-b8a6-c6d6a023bbcc" />

### **5.2. Listar Lotes**
<img width="1365" height="681" alt="image" src="https://github.com/user-attachments/assets/8eaecc30-3cc0-4792-adf6-b62367deba70" />

### **5.3. Actualizar Lote**
<img width="1362" height="674" alt="image" src="https://github.com/user-attachments/assets/0d6d29b1-44bd-4389-b20f-9b29c840ae21" />

### **5.4. Eliminar Lote**
<img width="1365" height="679" alt="image" src="https://github.com/user-attachments/assets/dcfee86d-84a2-40e7-8051-da4a4c7e04b3" />
<img width="1365" height="676" alt="Captura de pantalla 2025-11-19 021427" src="https://github.com/user-attachments/assets/70cfabe9-d0c2-4cb1-88e0-500d5409d930" />


---

## 6. Módulo de Movimientos de Inventario (Inventory Movement)
Permite registrar entradas, salidas y ajustes.

### **6.1. Crear Movimiento**
- Seleccionar tipo de movimiento.
- Seleccionar producto.
- Seleccionar sucursal y ubicación.

<img width="1357" height="675" alt="image" src="https://github.com/user-attachments/assets/effecce5-a54e-421b-9d9d-f4933631bedb" />

### **6.2. Listar Movimientos**

<img width="1360" height="677" alt="image" src="https://github.com/user-attachments/assets/59baf405-4c0c-4b2f-8249-61c3e022d946" />


### **6.3. Editar Movimiento**
<img width="1358" height="675" alt="image" src="https://github.com/user-attachments/assets/8f4b5bd9-dc27-4fb9-9c82-86bd1b65b5a1" />


---

## 7. Cierre de Sesión
- Desde el header se puede cerrar sesión.

<img width="1363" height="679" alt="Captura de pantalla 2025-11-19 022019" src="https://github.com/user-attachments/assets/13b1d295-e021-4b61-89cd-e1b301e2fda1" />

---

## 8. Conclusión
Este manual brinda una guía completa para navegar, operar y comprender todas las funciones del sistema IMS.

## 🚀 Instalación y uso

👨‍💻 Autor

Dairo Arcia – GitHub
