// Import Sqlite3 dependency =================
const sqlite = require('sqlite3').verbose()

// Import faker to make fake data
const faker = require('faker');

// Import files with entity specific functions
const helpers = require('./helpers/helpers')

const customers = require('./customers/customers')
const jobs = require('./jobs/jobs')
const materials = require('./materials/materials')

// Create a database instance ================
const db = new sqlite.Database(
    './db/builder.db',
    sqlite.OPEN_READWRITE, (
    (err) => {
        if (err) {
            console.error('Error in intialisation of db: ', err)
        } else {
            console.log('Connected to SQLite Database')
        }
    })
)

// Run database operations ====================
db.serialize(() => {
    // Call database functions from `customers`, `jobs` and `materials` here:

    createCustomerJobsAndMaterials(db)


})

function createCustomerJobsAndMaterials(db) {
    return customers.createCustomer(db, customers.createMockCustomer())
        .then((customerId) => { // customerId is returned from the database

            console.log('A customer record has been created with an id of:', customerId)

            jobs.createJob(db, customerId, jobs.createMockJob(customerId))
                .then((jobId) => {
                    console.log('A job record has been created with an id of:', jobId)

                    // CREATE MATERIALS FOR A JOB !!

                }).catch((err) => {
                    console.error('There was an error creating a job: ', err)
                }) // end of createJob.then()

        }) // end of createCustomer.then()
        .catch((err) => {
            console.error('There was an error creating a customer:', err)
        })
        .finally(() => {
            console.log('The attempt to create customers, jobs and materials has completed. Please check the database manually to ensure the records have been inserted as expected!')
        })
}