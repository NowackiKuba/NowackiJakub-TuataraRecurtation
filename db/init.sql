CREATE TABLE IF NOT EXISTS loan_calculations (
    id SERIAL PRIMARY KEY,
    total_installments INT,
    remaining_installments INT,
    installment_amount DECIMAL,
    financing_amount DECIMAL,
    interest_rate DECIMAL,
    reference_rate DECIMAL,
    remaining_value DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
