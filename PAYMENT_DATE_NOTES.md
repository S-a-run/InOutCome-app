# Payment dates and due reminders

- Monthly checkmark opens a date dialog before writing. Default date uses Asia/Bangkok. Cancel does not write. Confirmation validates the date and unchanged monthly record, and uses the existing atomic mutation/acknowledgement flow.
- The monthly bill remains in its original month. Cash expense, card/loan history and receipt use the actual payment date; cash reporting uses that date's month for both linked debt payments and ordinary monthly expenses.
- Unchecking reverses the original receipt. Editing a paid bill continues to preserve the verified payment date. Existing records are not migrated or relabelled.
- Calendar date defaults and export filename use Bangkok time; audit timestamps remain ISO UTC instants.
- Overview reminders use today's calendar independently of selected report month. Explicit month-specific bills show upcoming (within seven days), overdue unpaid bills, and paid bills near their due dates. February/month-end days clamp to the last valid date.
- Cards without a linked monthly bill show the next scheduled due date within seven days, including across year boundaries. A card schedule alone does not establish whether an invoice is paid or overdue; the UI explicitly states that no monthly bill confirms status. Archived cards are excluded from schedule-only reminders; explicit unpaid monthly bills are retained.
- Tests: node tests/dates.test.cjs (15 cases), plus existing sync/payment/reconciliation/import/credit-limit suites (121 cases). Mock browser verified mobile/PC rendering, date dialog, no premature write, server acknowledgement wait, cross-month cash reporting and exact reversal. No production financial database was accessed.
