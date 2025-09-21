<?php
include 'config.php';

$sql = "SELECT s.sale_date, d.name, s.quantity, s.revenue, s.cost, s.profit 
        FROM sales s 
        JOIN dishes d ON s.dish_id = d.id 
        ORDER BY s.sale_date DESC";
$result = $conn->query($sql);

$sales = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $sales[] = $row;
    }
}

echo json_encode($sales);
$conn->close();
?>