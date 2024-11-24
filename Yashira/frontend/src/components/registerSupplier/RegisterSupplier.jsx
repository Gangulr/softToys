import { useState } from 'react';
import './registersupplire.css';

const RegisterSupplier = () => {
  const [supplierData, setSupplierData] = useState({
    name: '',
    companyName: '',
    itemCategory: '',
    deliveryType: '',
    contactInfo: {
      email: '',
      phone: '',
    },
    address: '',
  });

  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const lettersOnly = /^[A-Za-z\s]*$/;
      if (!lettersOnly.test(value)) {
        setNameError('Enter only letters.');
        return;
      } else {
        setNameError('');
      }
    }

    if (name === 'phone') {
      const numbersOnly = /^[0-9]*$/;
      if (!numbersOnly.test(value)) {
        setPhoneError('Enter only numbers.');
        return;
      } else {
        setPhoneError('');
      }
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Invalid email format.');
      } else {
        setEmailError('');
      }
    }

    // Handling contactInfo separately from other fields
    if (name === 'email' || name === 'phone') {
      setSupplierData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [name]: value },
      }));
    } else {
      setSupplierData({ ...supplierData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (message || emailError || nameError || phoneError) {
      return;
    }
  
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });
  
      if (response.ok) {
        setMessage('Supplier registered successfully!');
        setSupplierData({
          name: '',
          companyName: '',
          itemCategory: '',
          deliveryType: '',
          contactInfo: { email: '', phone: '' },
          address: '',
        });
      } else {
        setMessage('Error registering supplier.');
      }
    } catch (error) {
      console.error('Failed to register supplier:', error);
      setMessage('Failed to register supplier.');
    }
  };
  

  return (
    <div className="register-supplier-container">
      <h2 className="form-title">Register Supplier</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>

        <div className="form-group">
          <label>Contact Person</label>
          <input
            type="text"
            name="companyName"
            value={supplierData.companyName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Item Category</label>
          <input
            type="text"
            name="itemCategory"
            value={supplierData.itemCategory}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Delivery Type</label>
          <select
            name="deliveryType"
            value={supplierData.deliveryType}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="">Select Delivery Type</option>
            <option value="Delivery by Supplier">Delivery by Supplier</option>
            <option value="Pickup by Us">Pickup by Us</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={supplierData.contactInfo.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={supplierData.contactInfo.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {phoneError && <p className="error-message">{phoneError}</p>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={supplierData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Register Supplier
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default RegisterSupplier;
