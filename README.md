# Tuatara Recruitment Application

This project is a TypeScript-based Node.js service that calculates loan installments based on specific financial parameters. It checks the interest rate against a reference rate from the National Bank of Poland (NBP) and performs installment calculations, saving the results in a database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Loan Installment Calculation:** Calculate loan installments based on parameters such as total installments, installment amount, funding value, and interest rate.
- **Reference Rate Check:** Retrieve the latest reference rate from [NBP](https://static.nbp.pl/dane/stopy/stopy_interwencji.xml) to validate if the provided interest rate meets conditions.
- **Dynamic Loan Adjustment:** Recalculate remaining installment values if the conditions are met and save results in the database.
- **Task Creation or Notification:** If calculated installment values are invalid, the system sends a notification (via email in this version).

## Installation

To set up and run this service locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NowackiKuba/NowackiJakub-TuataraRecurtation.git
   cd NowackiJakub-TuataraRecurtation
   ```
2. **Install dependencies:**

```bash
    npm install
```

3. **Set up Environtment Variables:**
4. **Run with Docker:**

```bash
    docker-compose up --build
```