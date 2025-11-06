"use client";

import { useState, useEffect, useMemo } from "react";
import { Filters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtro = products;

    const q = searchText.trim().toLowerCase();
    if (q) {
      filtro = filtro.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (category) {
      filtro = filtro.filter((p) => p.category === category);
    }

    if (sortBy === "price-asc") {
      filtro = filtro.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtro = filtro.slice().sort((a, b) => b.price - a.price);
    }

    return filtro;
  }, [products, searchText, category, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <h1 className="text-4xl font-bold">Tienda</h1>
          
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <Filters
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
