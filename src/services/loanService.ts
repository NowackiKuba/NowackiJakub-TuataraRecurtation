import axios from 'axios';
import db from '../models/db';
import { LoanData } from '../types/loanTypes';
import { XMLParser } from 'fast-xml-parser';

const REFERENCE_RATE_URL =
  'https://static.nbp.pl/dane/stopy/stopy_procentowe.xml';

const calculateLoan = async (data: LoanData) => {
  const response = await axios.get(REFERENCE_RATE_URL);
  const referenceRate = parseReferenceRate(response.data);

  if (data.interest_rate > referenceRate) {
    return { message: 'Interest rate exceeds reference rate' };
  }

  const totalPaid =
    data.installment_amount *
    (data.total_installments - data.remaining_installments);
  const remainingValue = data.financing_amount - totalPaid;

  const remainingInstallments = data.remaining_installments;
  const newInstallmentAmount = calculateInstallmentAmount(
    data.financing_amount,
    remainingInstallments,
    referenceRate
  );

  await db.query(
    `INSERT INTO loan_calculations(total_installments, remaining_installments, installment_amount, financing_amount, interest_rate, reference_rate, remaining_value, new_installment_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      data.total_installments,
      data.remaining_installments,
      data.installment_amount,
      data.financing_amount,
      data.interest_rate,
      referenceRate,
      remainingValue,
      newInstallmentAmount,
    ]
  );

  if (newInstallmentAmount <= 0) {
    // Załóż task w procesie lub wyślij email
    // sendEmailNotification(); // Funkcja do wysyłania powiadomienia
  }

  return { remainingValue, referenceRate, newInstallmentAmount };
};

const calculateInstallmentAmount = (
  financingAmount: number,
  remainingInstallments: number,
  interestRate: number
): number => {
  const monthlyRate = interestRate / 100 / 12;
  return (
    (financingAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -remainingInstallments))
  );
};

const parseReferenceRate = (xmlData: string): number => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  const parsedData = parser.parse(xmlData);

  const tables = parsedData?.stopy_procentowe?.tabela;
  if (!tables) {
    throw new Error('Tabela not found in the XML data.');
  }

  let referenceRateString = null;
  for (const table of Array.isArray(tables) ? tables : [tables]) {
    const positions = Array.isArray(table.pozycja)
      ? table.pozycja
      : [table.pozycja];

    const referencePosition = positions.find((pos: any) => pos.id === 'ref');

    if (referencePosition) {
      referenceRateString = referencePosition.oprocentowanie;
      break;
    }
  }

  if (!referenceRateString) {
    throw new Error('Reference rate not found in the XML data.');
  }

  const referenceRate = parseFloat(referenceRateString.replace(',', '.'));
  return referenceRate;
};
export default { calculateLoan };
