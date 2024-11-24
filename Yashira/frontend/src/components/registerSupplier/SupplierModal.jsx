import { useState } from 'react';

const SupplierModal = ({ isOpen, supplier, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: supplier.email,
    company: supplier.company,
    deliveryType: supplier.deliveryType,
    phone: supplier.phone,
    address: supplier.address,
  });

  if (!isOpen) return null; // If modal is not open, return null.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Update Supplier</h2>

        <label className="block mb-2">Email</label>
        <input className="border p-2 mb-4 w-full" name="email" value={formData.email} onChange={handleChange} />

        <label className="block mb-2">Company</label>
        <input className="border p-2 mb-4 w-full" name="company" value={formData.company} onChange={handleChange} />

        <label className="block mb-2">Delivery Type</label>
        <input className="border p-2 mb-4 w-full" name="deliveryType" value={formData.deliveryType} onChange={handleChange} />

        <label className="block mb-2">Phone</label>
        <input className="border p-2 mb-4 w-full" name="phone" value={formData.phone} onChange={handleChange} />

        <label className="block mb-2">Address</label>
        <input className="border p-2 mb-4 w-full" name="address" value={formData.address} onChange={handleChange} />

        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Update</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;
