import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Use `useLocalSearchParams` for parameters
import { createProduct, updateProduct } from "./productService";

export default function ProductForm() {
  const router = useRouter();

  // Use `useLocalSearchParams` to get parameters from the route
  const params = useLocalSearchParams();
  const productData = params.product ? JSON.parse(params.product) : null;

  // State variables with default values
  const [name, setName] = useState(productData?.name || "");
  const [price, setPrice] = useState(productData?.price ? String(productData.price) : "");
  const [quantity, setQuantity] = useState(productData?.quantity ? String(productData.quantity) : "");

  const handleSubmit = async () => {
    const productPayload = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    try {
      if (productData) {
        // Update product
        await updateProduct(productData._id, productPayload);
        Alert.alert("Updated!", "Product has been updated.");
      } else {
        // Create product
        await createProduct(productPayload);
        Alert.alert("Created!", "Product has been added.");
      }

      // Navigate back to the product list
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "An error occurred while saving the product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productData ? "Edit Product" : "Add Product"}</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});