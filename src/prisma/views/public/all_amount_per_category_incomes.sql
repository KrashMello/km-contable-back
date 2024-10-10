CREATE VIEW
  vw_all_amount_per_income as
SELECT
  (
    SELECT
      coalesce(SUM(tt.amount), 0)
    FROM
      "Transaction" tt
      RIGHT JOIN Category cc ON cc.id = tt.categoryId
    WHERE
      cc.transaction_typeId = 1
      and cc.name = c.name
  ) - (
    SELECT
      coalesce(SUM(tt.amount), 0)
    FROM
      "Transaction" tt
      RIGHT JOIN Category cc ON cc.id = tt.categoryId
    WHERE
      cc.transaction_typeId = 2
      and tt.categoryDebitId = c.id
  ) AS total_amount,
  c.name,
  c.userId
FROM
  "Transaction" AS t
  RIGHT JOIN Category c ON c.id = t.categoryId
where
  c.transaction_typeId = 1
  group by c.accountId
