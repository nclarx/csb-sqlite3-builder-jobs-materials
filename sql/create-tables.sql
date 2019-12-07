CREATE TABLE jobs(
    job_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    quote REAL,
    job_description TEXT,
    job_status TEXT
);

CREATE TABLE customers(
    customer_id INTEGER PRIMARY KEY,
    customer_name TEXT,
    customer_address TEXT
);

CREATE TABLE materials(
    material_id INTEGER PRIMARY KEY,
    job_id INTEGER,
    material_name TEXT,
    quantity_bought INTEGER,
    quantity_used INTEGER,
    cost REAL
);