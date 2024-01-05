// Import necessary libraries and styles
import React, { useState } from 'react';
import styles from './addCustomerForm.module.scss';
import classNames from 'classnames/bind';
import { useGlobalSnackbar } from '../../Base/basePage';

// Create a classNames binding function
const cx = classNames.bind(styles);

const AddCustomerForm = ({
    show,
    addCustomerHandler,
    additionalContainerClassName = ""
}) => {
    // State for form input values
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const { showSnackbar } = useGlobalSnackbar();
    // Function to handle form submission
    const handleSubmit = () => {

        // Check if any field is empty before submitting
        if (customerName.trim() === '' || customerPhoneNumber.trim() === '' || customerAddress.trim() === '') {
            // You can add an alert or some visual feedback for the user here
            showSnackbar('Please fill in all fields', 'error');
            return;
        }

        // Create a new customer object
        const newCustomer = {
            name: customerName,
            phoneNumber: customerPhoneNumber,
            address: customerAddress,
        };

        // Call the addCustomerHandler with the new customer object
        addCustomerHandler(newCustomer);

        // Reset form fields after submission
        setCustomerName('');
        setCustomerPhoneNumber('');
        setCustomerAddress('');
    };

    return (
        <div className={cx(styles.addCustomerFormContainer, additionalContainerClassName, { show })}>
            <div className={styles.addCustomerFormWrapper}>
                <h2>Add Customer</h2>
                <form className={styles.addCustomerForm}>
                    {/* Customer Name Input */}
                    <label htmlFor="customerName">Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />

                    {/* Customer Phone Number Input */}
                    <label htmlFor="customerPhoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="customerPhoneNumber"
                        value={customerPhoneNumber}
                        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                    />

                    {/* Customer Address Input */}
                    <label htmlFor="customerAddress">Address:</label>
                    <input
                        type="text"
                        id="customerAddress"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                    />

                    {/* Confirm Button */}
                    <button type="button" onClick={handleSubmit} className={styles.confirmButton}>
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerForm;
