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

const ProductCard = ({ itemCard }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const handleAddToCart = () => {
    dispatch(addToCart(itemCard));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeToCart(itemCard));
  };

  const productInCart = cartProducts.find(
    (product) => product.productId === itemCard.productId
  );
  const quantity = productInCart ? productInCart.quantity : 0;

  return (
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
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
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
          onClick={handleRemoveFromCart}
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
  );
};

export default ProductCard;
