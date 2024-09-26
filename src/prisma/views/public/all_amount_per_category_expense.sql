create view vw_all_amount_per_expense as SELECT 
    COALESCE(sum(t.amount),0) AS total_amount,
    c.name,
    c.userId
FROM 
    "Transaction" AS t 
RIGHT JOIN 
    Category c ON c.id = t.categoryId 
    where c.transaction_typeId = 2
    group by c.id;
