import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../store/cartSlice";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ itemCard }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const handleAddToCart = () => {
    dispatch(addToCart(itemCard));
  };
  const handleARemoveToCart = () => {
    dispatch(removeToCart(itemCard));
  };

  const productInCart = cartProducts.find(
    (product) => product.productId === itemCard.productId
  );
  const quantity = productInCart ? productInCart.quantity : 0;
  return (
    <>
      <br />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 300,
          width: "100%",
          maxWidth: 345,
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {itemCard.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Price: {itemCard.price}
          </Typography>
          <Typography variant="body2">
            Description: {itemCard.description}
          </Typography>
          <br />
          <Typography variant="body2">{itemCard.stock} in stock</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <IconButton
            color="primary"
            aria-label="remove from shopping cart"
            onClick={handleARemoveToCart}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body2">{quantity}</Typography>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleAddToCart}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

const ProductGrid = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const itemsPerPage = 9;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {paginatedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.productId}>
            <ProductCard itemCard={item} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={page}
        count={Math.ceil(items.length / itemsPerPage)}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`?page=${item.page}`}
            {...item}
          />
        )}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default ProductCard;
