CREATE TABLE beneficiary_ps_cases (
    id SERIAL PRIMARY KEY, 
    is_direct boolean NOT NULL,   
    beneficiary_id bigint REFERENCES beneficiaries(id) NOT NULL,
    ps_case_id bigint REFERENCES ps_cases(id) NOT NULL
);


-- INSERT INTO beneficiary_ps_cases
--     (is_direct, beneficiary_id, ps_case_id)
-- VALUES
--     (true, 1, 1),
--     (false, 2, 1),
--     (false, 3, 1),
--     (true, 4, 2)