import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import CustomerApiController from '../../../api/customer';
import { CircularProgress } from '@mui/material';
const limitCache = 10;
const limitSearch = 10; // New limit for database search
//General search bar that return id to setOrderCustomer
const CustomerSearchbar = (
    {
        setOrderCustomer, // Used
        defaultCustomer = null
    }
) => {
    const [customerCache, setCustomerCache] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [lastTypeTime, setLastTypeTime] = useState(-1);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLastTypeTime(Date.now());
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchText]);
    useEffect(() => {
        searchCustomer();
    }, [lastTypeTime]);
    useEffect(() => {
        console.log("Customer:", customerList);
    }, [customerList]);

    const searchCustomer = async () => {
        //If last type time is less than 500ms, don't search
        if (Date.now() - lastTypeTime >= 500) {
            return;
        }
        //If text is empty, load from cache
        if (!searchText) {
            await fetchData();
            return;
        }
        setIsSearching(true);
        if (!customerCache.length) {
            await fetchData();
        } else {
            const customers = customerCache.map(customer => ({
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                _id: customer._id,
                address: customer.address
            }));

            setCustomerList([...customers]);
        }
        // Search in cache, if not found, search with param phoneNumber
        const foundCustomer = searchInCache(searchText);
        if (!foundCustomer) {
            await searchInDatabase(searchText);
        }
        setIsSearching(false);
    };
    const searchInCache = (searchTerm) => {
        const isNum = /^\d+$/.test(searchTerm);

        if (!isNum) {
            console.log("CACHE: Searching using name");
            const foundCustomer = customerCache.find(customer => customer.name === searchTerm);
            if (foundCustomer) {
                return foundCustomer;
            }
            return null;
        }
        console.log("CACHE: Searching using phone number");
        const foundCustomer = customerCache.find(customer => customer.phoneNumber === searchTerm);
        if (foundCustomer) {
            return foundCustomer;
        }
        return null;
    }

    const searchInDatabase = async (searchTerm) => {
        if (!searchTerm) {
            return;
        }
        //If term is text not number, search using name
        const isNum = /^\d+$/.test(searchTerm);
        console.log("Is number:", isNum);
        if (!isNum) {
            console.log("Searching using name");
            await CustomerApiController.getCustomers({ name: searchTerm, limit: limitSearch }).then(response => {
                if (response.success) {
                    console.log("Response using name:", response);
                    const customers = response.data.results.map(customer => ({
                        name: customer.name,
                        phoneNumber: customer.phoneNumber,
                        _id: customer._id,
                        address: customer.address
                    }));
                    setCustomerList([...customers]);
                    if (setOrderCustomer)
                        setOrderCustomer(response.data[0]);

                }

            });
            return;
        }
        setIsSearching(true); // Set loading to true before making the API call
        await CustomerApiController.getCustomers({ phoneNumber: searchTerm, limit: limitSearch }).then(response => {
            if (response.success) {
                console.log("Response using phone number:", response);
                const customers = response.data.results.map(customer => ({
                    name: customer.name,
                    phoneNumber: customer.phoneNumber,
                    _id: customer._id,
                    address: customer.address
                }));
                setCustomerList([...customers]);
                if (setOrderCustomer)
                    setOrderCustomer(response.data[0]);
            }
        }).finally(() => {
            setIsSearching(false); // Set loading to false after the API call (whether successful or not)
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
            onChange={handleCustomerSelect}
            loading={isSearching}
            filterOptions={(x) => x}
            sx={{
                width: "100%",
                //Text
                "& .MuiAutocomplete-inputRoot": {
                    color: "black",
                },
                //Focused
                "& .Mui-focused": {
                    color: "black",
                },
                "& .MuiAutocomplete-inputFocused": {
                    borderColor: "black",

                    "--tw-ring-color": "transparent",

                },
                //Outline
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                },
            }}
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
                    label={defaultCustomer && searchText === "" ? defaultCustomer.name : "Customer phone number"}
                    value={searchText}
                    InputProps={
                        {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }
                    }
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleEnterKeyPress} // Add event listener for 'Enter' key
                />
            )}
        />
    );
};

export default CustomerSearchbar;
