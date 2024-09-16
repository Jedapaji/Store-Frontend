import ProductCard from "./components/ProductCard";
import { CircularProgress, Grid2 } from "@mui/material";
import { useGetProductsQuery } from "./api/api";
import CartAppBar from "./components/CartAppBar";

function App() {
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <CartAppBar />
      <Grid2 container spacing={2} px={6}>
        {data.map((itemCard) => (
          <Grid2 xs={6} key={itemCard.productId}>
            <ProductCard itemCard={itemCard} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default App;
