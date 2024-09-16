import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import { useGetProductsQuery } from "./api/api";
import CartAppBar from "./components/CartAppBar";

function App() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleProducts = data.slice(startIndex, endIndex);

  return (
    <>
      <CartAppBar />
      <Grid container spacing={1} px={6}>
        {visibleProducts.map((itemCard) => (
          <Grid item xs={12} sm={6} md={4} key={itemCard.productId}>
            <br />
            <ProductCard itemCard={itemCard} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}

export default App;
