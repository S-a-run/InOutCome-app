# Selected-month overview balance

- Overview cumulative cash balance includes all valid accounting months (transaction.monthKey) through the selected month, including the whole selected month. Later months are excluded. It uses the same monthKey field as the transaction/monthly reports; it does not reinterpret or rewrite stored dates.
- A month without transactions carries the preceding balance forward. A month before the first transaction shows zero. Moving across December/January follows YYYY-MM ordering.
- Income, expenses, monthly net and cumulative balance are summed in integer cents before display to avoid floating point residue.
- signedMoney preserves the minus sign for cumulative balance and monthly net, with no negative zero. The existing reconciliation formatter delegates to the same function. Debit/payment direction labels remain unchanged.
- Labels explicitly describe end-of-selected-month cumulative balance and selected-month net. Card/loan debt totals remain current balances; this change does not reconstruct historical debt.
- No financial records, Firebase data, receipts or historical amounts are modified. Invalid/missing accounting months are excluded, matching the reporting basis; this is not a legacy data repair.
- Validation: tests/balance.test.cjs (15 cases), all existing suites (136 cases). Mock browser checked month navigation, carry-forward, future exclusion, negative sign/color and reset, mobile/PC display, no writes and no page errors.
