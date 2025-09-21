<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dish_id = $_POST['dish_id'];
    $quantity = $_POST['quantity'];
    
    // Get dish details
    $sql = "SELECT price, cost FROM dishes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $dish_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $dish = $result->fetch_assoc();
        $revenue = $dish['price'] * $quantity;
        $cost = $dish['cost'] * $quantity;
        $profit = $revenue - $cost;
        
        // Insert sale record
        $sql = "INSERT INTO sales (dish_id, quantity, revenue, cost, profit) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiddd", $dish_id, $quantity, $revenue, $cost, $profit);
        
        if ($stmt->execute()) {
            echo "Sale recorded successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Dish not found!";
    }

    $stmt->close();
    $conn->close();
    
    // Redirect back to the main page
    header("Location: index.html#record-sale");
    exit();
}
?>