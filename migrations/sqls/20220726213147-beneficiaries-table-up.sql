CREATE TABLE beneficiaries (
    id SERIAL PRIMARY KEY, 
    full_name VARCHAR(50) NOT NULL, 
    file_number VARCHAR(50) NOT NULL,
    individual_number VARCHAR(50),
    passport_number VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO beneficiaries
    (full_name, file_number, individual_number, passport_number)
VALUES
    ('Hoda Zidan', '914-15C00001', 'i354321354', 'p4534312'),
    ('Ismail mohamed', '914-15C00002', 'i354321354', 'p4534312'),
    ('Satouna AlAhmed', '914-15C00003', 'i354321354', 'p4534312'),
    ('Rabab Hassan', '914-15C00004', 'i354321354', 'p4534312'),
    ('Shady Ahmed', '914-15C00005', 'i354321354', 'p4534312'),
    ('Selim Alattar', '914-15C00006', 'i354321354', 'p4534312'),
    ('Hoda Zidan', '914-15C00001', 'i354321354', 'p4534312'),
    ('Khadija Saber', '914-15C00002', 'i354321354', 'p4534312'),
    ('Ayman Ahmed', '914-15C00003', 'i354321354', 'p4534312'),
    ('Mohamed Ragab', '914-15C00004', 'i354321354', 'p4534312'),
    ('Shehata Ahmed', '914-15C00005', 'i354321354', 'p4534312'),
    ('Elsyaed Ramadan', '914-15C00006', 'i354321354', 'p4534312'),
    ('Mohamed Ramadan', '914-15C00001', 'i354321354', 'p4534312'),
    ('Osama Salah', '914-15C00002', 'i354321354', 'p4534312'),
    ('Soaad Ali', '914-15C00003', 'i354321354', 'p4534312'),
    ('Rabab Eltaweel', '914-15C00004', 'i354321354', 'p4534312'),
    ('Ayman Sabry', '914-15C00005', 'i354321354', 'p4534312'),
    ('Fatam Qaoud', '914-15C00006', 'i354321354', 'p4534312'),
    ('Rahma Soliman', '914-15C00001', 'i354321354', 'p4534312'),
    ('Mohamed Elsayed', '914-15C00002', 'i354321354', 'p4534312'),
    ('Hafez Elmohamady', '914-15C00003', 'i354321354', 'p4534312'),
    ('Yousra Ahmed', '914-15C00004', 'i354321354', 'p4534312'),
    ('Marawan Ahmed', '914-15C00005', 'i354321354', 'p4534312'),
    ('Selim Thabet', '914-15C00006', 'i354321354', 'p4534312'),
    ('Somia Zidan', '914-15C00001', 'i354321354', 'p4534312'),
    ('Samar mohamed', '914-15C00002', 'i354321354', 'p4534312'),
    ('Rewan Elsayed', '914-15C00003', 'i354321354', 'p4534312'),
    ('Tarik Soltan', '914-15C00004', 'i354321354', 'p4534312'),
    ('Samia Thabet', '914-15C00005', 'i354321354', 'p4534312'),
    ('Shereen Saqqara', '914-15C00006', 'i354321354', 'p4534312')

