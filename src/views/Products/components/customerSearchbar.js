import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import CustomerApiController from '../../../api/customer';

const limitCache = 2;
const limitSearch = 10; // New limit for database search

const CustomerSearchbar = ({ setOrderCustomer }) => {
    const [customerCache, setCustomerCache] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [customer, setCustomer] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        searchCustomer();
    }, [searchText]);


    const searchCustomer = async () => {
        if (!customerCache.length) {
            fetchData();
        } else {
            setCustomerList(customerCache.map(customer => ({
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                _id: customer._id,
                address: customer.address
            })));
        }
        // Search in cache, if not found, search with param phoneNumber
        const foundCustomer = searchInCache(searchText);
        if (foundCustomer) {
            setCustomer(foundCustomer);
            if (setOrderCustomer)
                setOrderCustomer(foundCustomer);
        } else {
            await searchInDatabase(searchText); // Use the searchInDatabase function
        }
    };
    const searchInCache = (phoneNumber) => {
        const foundCustomer = customerCache.find(customer => customer.phoneNumber === phoneNumber);
        if (foundCustomer) {
            return foundCustomer;
        }
        return null;
    }

    const searchInDatabase = async (phoneNumber) => {
        // console.log("Searching in database");
        await CustomerApiController.getCustomers({ phoneNumber, limit: limitSearch }).then(response => {
            if (response.success) {
                setCustomerList(response.data.results.map(customer => ({
                    name: customer.name,
                    phoneNumber: customer.phoneNumber,
                    _id: customer._id,
                    address: customer.address
                })));
                if (setOrderCustomer)
                    setOrderCustomer(response.data[0]);
            }
        });
    }

    const fetchData = async () => {
        setIsSearching(true);
        // console.log("Fetching data");
        const response = await CustomerApiController.getCustomers({ limit: limitCache });
        if (response.success) {
            setCustomerCache(response.data.results);
            setCustomerList(response.data.results.map(customer => ({
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                _id: customer._id,
                address: customer.address
            })));
        }
        setIsSearching(false);
    };

    const handleCustomerSelect = (event, value) => {
        if (value) {
            console.log("Value:", value._id);
            setOrderCustomer(value._id);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchInDatabase(searchText);
        }
    };

    return (
        <Autocomplete
            id="customer-search-bar"
            options={customerList}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.phoneNumber === value.phoneNumber}
            onChange={handleCustomerSelect}
            loading={isSearching}
            sx={{ width: "100%" }}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option._id}>
                        {option.phoneNumber + " | " + option.name}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Customer Phone Number"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleEnterKeyPress} // Add event listener for 'Enter' key
                />
            )}
        />
    );
};

export default CustomerSearchbar;
