import React from 'react';
import { Progress } from 'antd';

function Analytics({ allTransactions }) {
  const categories = [
    'salary', 'tip', 'project', 'food', 'movie',
    'bills', 'medicine', 'travel', 'fees', 'other'
  ];

  // Total transaction
  const totalTransactions = allTransactions.length;
  const totalIncomeTransaction = allTransactions.filter(t => t.type === 'income');
  const totalExpenseTransaction = allTransactions.filter(t => t.type === 'expense');

  const totalIncomePercent = totalTransactions === 0 ? 0 :
    (totalIncomeTransaction.length / totalTransactions) * 100;
  const totalExpensePercent = totalTransactions === 0 ? 0 :
    (totalExpenseTransaction.length / totalTransactions) * 100;

  // Total turnover
  const totalTurnover = allTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = totalIncomeTransaction.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseTurnover = totalExpenseTransaction.reduce((acc, t) => acc + t.amount, 0);

  const totalIncomeTurnoverPercent = totalTurnover === 0 ? 0 :
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = totalTurnover === 0 ? 0 :
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransactions}
            </div>
            <div className="card-body">
              <h5 className='text-success'>Income: {totalIncomeTransaction.length}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTransaction.length}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Turnover: {totalTurnover}
            </div>
            <div className="card-body">
              <h5 className='text-success'>Income: {totalIncomeTurnover}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        
        <div className="col-md-6">
          <h4>Category Income</h4>
          {
            categories.map((category, index) => {
              const amount = allTransactions
                .filter(t => t.type === 'income' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return amount > 0 && (
                <div className="card mb-2" key={`income-${category}-${index}`}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="col-md-6">
          <h4>Category Expense</h4>
          {
            categories.map((category, index) => {
              const amount = allTransactions
                .filter(t => t.type === 'expense' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return amount > 0 && (
                <div className="card mb-2" key={`expense-${category}-${index}`}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

    </>
  );
}

export default Analytics;
