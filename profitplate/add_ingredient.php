<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $price_per_unit = $_POST['price_per_unit'];
    $unit = $_POST['unit'];

    $sql = "INSERT INTO ingredients (name, price_per_unit, unit) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sds", $name, $price_per_unit, $unit);

    if ($stmt->execute()) {
        echo "Ingredient added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
    
    // Redirect back to the main page
    header("Location: index.html#add-ingredient");
    exit();
}
?>