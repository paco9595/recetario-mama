import express from 'express'
// import { getTemplateImages } from '../controllers/templates';
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    "recetas": [
        {
            "id": "b696df95-0372-4980-bc88-5c50fa87b130",
            "name": "Pasta Alfredo con Pollo",
            "tags": ["italiana", "cremosa", "rápida"],
            "description": "Una deliciosa pasta con salsa Alfredo y trozos de pollo a la parrilla.",
            "created_at": "2025-02-01T03:39:22.996987",
            "ingredients": ["Pasta fettuccine", "Pechuga de pollo", "Crema de leche", "Queso parmesano", "Ajo", "Mantequilla", "Sal", "Pimienta"],
            "isFavorit": true
        },
        {
            "id": "297b1d52-80b2-47a8-a771-58ad2e8b44de",
            "name": "Ensalada César",
            "tags": ["ensalada", "saludable", "rápida"],
            "description": "Una ensalada clásica con aderezo cremoso y crutones crujientes.",
            "created_at": "2025-02-01T03:39:22.997015",
            "ingredients": ["Lechuga romana", "Pollo a la parrilla", "Queso parmesano", "Crutones", "Aderezo César", "Sal", "Pimienta"],
            "isFavorit": false
        },
        {
            "id": "8e69e1de-f9cd-4968-afd9-6bd0ecc2dbae",
            "name": "Tacos de Carnitas",
            "tags": ["mexicana", "callejera", "sabrosa"],
            "description": "Tacos rellenos de carnitas doradas y acompañados de cebolla y cilantro.",
            "created_at": "2025-02-01T03:39:22.997031",
            "ingredients": ["Tortillas de maíz", "Carne de cerdo", "Cebolla", "Cilantro", "Salsa verde", "Limón", "Sal"],
            "isFavorit": true
        },
        {
            "id": "89d6a4bf-3a64-4920-93e5-e7b1893a63cb",
            "name": "Sushi de Salmón",
            "tags": ["japonesa", "fresco", "ligero"],
            "description": "Rollos de sushi rellenos de salmón fresco y aguacate.",
            "created_at": "2025-02-01T03:39:22.997045",
            "ingredients": ["Arroz para sushi", "Salmón fresco", "Alga nori", "Aguacate", "Vinagre de arroz", "Salsa de soya"],
            "isFavorit": false
        },
        {
            "id": "3cf7e5a2-9b34-4d13-8180-e6a1d3856102",
            "name": "Brownies de Chocolate",
            "tags": ["postre", "chocolate", "horneado"],
            "description": "Brownies esponjosos y llenos de sabor a chocolate.",
            "created_at": "2025-02-01T03:39:22.997069",
            "ingredients": ["Chocolate negro", "Harina", "Azúcar", "Huevos", "Mantequilla", "Cacao en polvo", "Vainilla"],
            "isFavorit": true
        }
    ]
}
)
});

export default router