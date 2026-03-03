import { useEffect, useState } from "react";
import TopHeader from "../components/DashboardHeader";

import { useNavigate } from "react-router-dom";
import ProductTable from "@/features/add-products/components/ProductTable";
import Modal from "@/components/shared/Modal";
import ProductForm from "@/features/add-products/components/ProductForm";
import BackButton from "@/components/shared/BackButton";

export default function AddedProducts() {
  const [items, setItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addedProducts")) || [];
    setItems(saved);
  }, []);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("addedProducts", JSON.stringify(updatedItems));
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const updated = [...items];
    updated.splice(index, 1);

    setItems(updated);
    updateLocalStorage(updated);
  };

  const handleEdit = (index) => {
    const product = items[index];

    setEditIndex(index);
    setEditProduct(product);
    setOpenModal(true);
  };

  const handleUpdateProduct = (updatedData) => {
    const updated = [...items];

    updated[editIndex] = {
      ...updated[editIndex],
      ...updatedData,
    };

    setItems(updated);
    updateLocalStorage(updated);

    alert("Product updated successfully ");

    setOpenModal(false);
    setEditIndex(null);
    setEditProduct(null);
  };

  const handleAdd = () => {
    navigate("/all-products");
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-white)]">
      {/* Content */}
      <div className="flex-1 flex flex-col">
        <TopHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 lg:mt-10 overflow-y-auto">
          {/* <BackButton /> */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <ProductTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          </div>

          {/* Edit Modal */}
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setEditIndex(null);
              setEditProduct(null);
            }}
            title="Edit Product"
          >
            {editProduct && (
              <ProductForm
                initialData={editProduct}
                onSubmit={handleUpdateProduct}
              />
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}
