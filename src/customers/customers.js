const faker = require('faker')

function createCustomersTable(db) {
    db.run(`
    CREATE TABLE customers(
        customer_id INTEGER PRIMARY KEY,
        customer_name TEXT,
        customer_address TEXT
    );
    `)
}


// FUNCTIONS TO INSERT RECORDS

function createCustomer(db, customer) {

    const parameters = {
        $customer_name: customer.customerName,
        $customer_address: customer.customerAddress
    }

    const sql = `
    INSERT INTO customers(customer_name, customer_address)
    VALUES ($customer_name, $customer_address)
    `

    return new Promise(
        (resolve, reject) => {
            
            db.run(
                sql,
                parameters,
                function (error) {
                    if (error) {
                        reject(error)
                    }

                    resolve(this.lastID)

                } // end of callback function
            ) // end of db.run
        }) // end of new Promise
} // end of `createCustomer()` function

function createMockCustomer() {
    return {
        customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        customerAddress: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.country()}`
    }
}

module.exports = {
    createCustomer,
    createMockCustomer,
    createCustomersTable
}