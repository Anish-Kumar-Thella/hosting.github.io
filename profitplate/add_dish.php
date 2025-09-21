<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $cost = $_POST['cost'];
    $ingredients = $_POST['ingredients'];

    $sql = "INSERT INTO dishes (name, price, cost, ingredients) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdds", $name, $price, $cost, $ingredients);

    if ($stmt->execute()) {
        echo "Dish added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
    
    // Redirect back to the main page
    header("Location: index.html#add-dish");
    exit();
}
?>