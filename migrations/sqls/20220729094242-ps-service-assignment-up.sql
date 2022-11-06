CREATE TABLE ps_service_assignment (
    id SERIAL PRIMARY KEY, 
    ps_service_id VARCHAR(50) NOT NULL,
    beneficiary_id bigint REFERENCES beneficiaries(id),
    ps_case_id bigint REFERENCES ps_cases(id),
    service_date VARCHAR(50) NOT NULL
);


