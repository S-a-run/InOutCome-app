# Card activity in the transaction list

The transaction and overview recent lists combine cash transactions with read-only projections of credit-card charge history for the selected month. Existing and new charges appear without migrating, duplicating or modifying stored cash records. Payments already have linked cash expenses and are not projected again. Rows are ordered by date descending, then ID descending.

Charge rows explicitly say they increase debt without deducting cash. Their edit/delete buttons call the original guarded card-history operations, preserving existing debt checks and atomic saves. Cash totals and cumulative balance continue to read only the cash ledger. Charge names, notes and category/date text are escaped when rendering transaction rows.

Validation: all previous 151 tests plus card-activity integration covering month filtering, payment deduplication, ordering, cash isolation, overlapping record IDs, escaped notes, and editing/deleting source history. Mock browser checks charge labels/actions and unchanged cash totals at PC/mobile widths. No production database access or data migration.
