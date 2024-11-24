import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import logo from '../../assets/logo.png';
import './ViewOrder.css';

const ViewOrder = ({ orderId, onClose }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('pending'); // Default status to 'pending'
    const [paymentValue, setPaymentValue] = useState(''); 
    const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(''); 
    const [statusUpdated, setStatusUpdated] = useState(false); 

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            if (!response.ok) {
                throw new Error('Order not found');
            }
            const data = await response.json();
            setOrder(data);
            setStatus(data.status); // Set status from fetched order
            setPaymentValue(data.paymentValue || ''); 
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            const updatedOrder = await response.json();
            setOrder(updatedOrder.order); 
            setStatusUpdated(true); 
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const markPaymentAsDone = async () => {
        if (!paymentValue || isNaN(paymentValue)) {
            alert('Please enter a valid payment value.');
            return;
        }

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPaymentDone: true, paymentValue: Number(paymentValue) }),
            });
            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }
            const updatedOrder = await response.json();
            setOrder(updatedOrder.order); 
            setPaymentValue(updatedOrder.order.paymentValue); 
            setPaymentSuccessMessage('Payment has been marked as done successfully!');
            
            setTimeout(() => setPaymentSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to mark payment as done:', error);
        }
    };

    const deleteOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete order: ${errorMessage}`);
            }
            alert('Order deleted successfully');
            onClose();
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };
    

    const renderProgressBar = () => {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar">
                    <div className="progress-bar-fill" data-status={status.toLowerCase()}></div>
                </div>
                <div className="progress-labels">
                    <span>Pending</span>
                    <span>In Progress</span>
                    <span>Completed</span>
                </div>
            </div>
        );
    };

    const generateBill = () => {
        const doc = new jsPDF();
       
        // Add Logo
        doc.addImage(logo, 'PNG', 14, 10, 50, 20);
        // Add Title Next to Logo
        doc.setFontSize(18); // Set font size for the title
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.setTextColor(0, 51, 102); // Set color (pink to match soft toy theme)
        doc.text("Bear Works Lanka", 70, 20); // Position the title next to the logo

 // Draw Header Line
        doc.setDrawColor(0, 0, 0); // Set line color to black
        doc.line(14, 32, doc.internal.pageSize.width - 14, 32); // Draw line below the header

        doc.setFontSize(18);
        doc.text('Order Invoice Bill', 97, 40, { align: 'center' });
        doc.setFontSize(12);
      
        doc.setFontSize(14);
        doc.text(`Order ID: ${order._id}`, 20, 60);
        doc.text(`Supplier: ${order.supplierName}`, 20, 68);
        doc.text(`Status: ${order.status}`, 20, 76);
        doc.line(20, 90, 190, 90); 
        doc.setFontSize(12);
        doc.text('Items:', 20, 100);


        doc.autoTable({
            startY: 105,
            head: [['Item Name', 'Quantity', 'Description']],
            body: order.items.map(item => [
                item.itemName, 
                item.quantity, 
                item.description || 'N/A'
            ]),
            theme: 'grid',
            headStyles: { fillColor: [0, 123, 255] }, 
            columnStyles: {
                0: { cellWidth: 40 }, 
                1: { cellWidth: 20 },
                2: { cellWidth: 60 }
            },
            margin: { left: 20, right: 20 }
        });
        doc.setFontSize(14);
        doc.text('Payment Summary', 20, doc.lastAutoTable.finalY + 20); 
        doc.setFontSize(12);
        doc.text(`Total Payment: LKR ${order.paymentValue ? order.paymentValue.toFixed(2) : '0.00'}`, 20, doc.lastAutoTable.finalY + 30);
        doc.text(`Payment Status: ${order.isPaymentDone ? 'Completed' : 'Pending'}`, 20, doc.lastAutoTable.finalY + 38);
        doc.setFontSize(10);
        doc.text('Thank you for your business!', 105, doc.lastAutoTable.finalY + 50, { align: 'center' });
       
         // Draw Footer Line
    const footerY = doc.internal.pageSize.height - 30; // Position for footer line
    doc.line(14, footerY, doc.internal.pageSize.width - 14, footerY); // Draw line above the footer

    // Add Footer
    doc.setFontSize(12); // Set font size for footer
    doc.setFont("helvetica", "normal"); // Set font to normal
    doc.setTextColor(0, 0, 0); // Set color to black
    const footerText = "Address: 123 Bear Lane, Colombo, Sri Lanka\nContact: +94 123 456 789"; // Sample footer text
    const footerLines = doc.splitTextToSize(footerText, doc.internal.pageSize.width - 28); // Split text to fit the page

    doc.text(footerLines, 14, footerY + 10); // Draw footer text below the footer line

       
        doc.save(`Order_${order._id}_Invoice.pdf`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <div className="view-order-advanced">
            <h2 className="order-title">Order Details</h2>
            <button className="close-button" onClick={onClose}>Back to Order List</button>

            <div className="order-card">
                <div className="order-header">
                    <span className="order-id">Order ID: {order._id}</span>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-body">
                    <p><strong>Supplier:</strong> {order.supplierName}</p>
                    <p><strong>Items:</strong> {order.items.map(item => item.itemName).join(", ")}</p>
                    <p><strong>Payment Status:</strong> {order.isPaymentDone ? "Completed" : "Pending"}</p>
                    <p><strong>Payment Amount:</strong> LKR {order.paymentValue ? order.paymentValue.toFixed(2) : '0.00'}</p>
                </div>

                {/* Render the progress bar */}
                {renderProgressBar()}

                <div className="status-update">
                    <label htmlFor="status">Update Status:</label>
                    <select
                        id="status"
                        className="status-dropdown"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={statusUpdated} 
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button
                        className="action-btn complete-btn"
                        onClick={updateOrderStatus}
                        disabled={statusUpdated} 
                    >
                        {statusUpdated ? "Status Updated" : "Update Status"}
                    </button>
                </div>

                {/* Success message for payment */}
                {paymentSuccessMessage && (
                    <div className="toast-success">
                        {paymentSuccessMessage}
                    </div>
                )}

                <div className="order-actions">
                    {/* Show the delete button if status is not 'in-progress' or 'completed' */}
                    {status !== 'in-progress' && status !== 'completed' && (
                        <button className="action-btn delete-btn" onClick={deleteOrder}>Delete Order</button>
                    )}

                    {status === 'completed' && !order.isPaymentDone && (
                        <div>
                            <input
                                type="number"
                                placeholder="Enter payment value"
                                value={paymentValue}
                                onChange={(e) => setPaymentValue(e.target.value)}
                                className="payment-input"
                            />
                            <button className="action-btn payment-btn" onClick={markPaymentAsDone}>Mark Payment as Done</button>
                        </div>
                    )}
                </div>

                {/* Bill Generation Button */}
                <button className="action-btn bill-btn" onClick={generateBill}>
                    Generate Bill
                </button>
            </div>
        </div>
    );
};

export default ViewOrder;
