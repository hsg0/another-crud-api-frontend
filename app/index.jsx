import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts, deleteProduct } from "./productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    Alert.alert("Deleted!", "Product has been deleted.");
    fetchProducts(); // Refresh the list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>
              {item.name} - ${item.price}
            </Text>
            <View style={styles.buttonGroup}>
              <Button
                title="Edit"
                onPress={() =>
                  router.push({
                    pathname: "/productForm",
                    params: { product: JSON.stringify(item) },
                  })
                }
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(item._id)}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/productForm")}
      >
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  productItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between" },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
