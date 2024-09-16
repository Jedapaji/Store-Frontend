import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CartDetailTable from "../table/CartDetailTable";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../api/api";
import { toast } from "sonner";
import { clearShoppingCart } from "../store/cartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  flexGrow: 1,
  overflowY: "auto",
};

const footerStyle = {
  textAlign: "right",
  paddingTop: "10px",
};

export default function CartModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const cartProducts = useSelector((state) => state.cart.products);
  let sumItems = 0;
  let sumTotal = 0;
  cartProducts.forEach((element) => {
    sumItems += element.quantity;
    sumTotal += element.quantity * element.price;
  });

  const handleSave = async () => {
    const orderDetails = {
      items: cartProducts.map((product) => ({
        productId: product.productId,
        name: product.name,
        stock: product.stock,
        categoryId: product.categoryId,
        quantity: product.quantity,
        price: product.price,
      })),
      total: sumTotal,
      totalItems: sumItems,
    };

    try {
      const result = await createOrder(orderDetails).unwrap();
      dispatch(clearShoppingCart());
      handleClose();
      toast.success("Order created successfully!");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.data?.message || "An unexpected error occurred";

      if (error?.status === 400) {
        toast.error(`Bad Request: ${errorMessage}`);
      } else if (error?.status === 404) {
        toast.error(`Not Found: ${errorMessage}`);
      } else if (error?.status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={contentStyle}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Shopping Cart
          </Typography>
          <br />
          <CartDetailTable />
          <br />
          <Divider />
          <Box sx={footerStyle}>
            <Typography variant="h6" component="h2">
              Items: {sumItems}
            </Typography>
            <br />
            <Typography variant="h6" component="h2">
              Total: {sumTotal}
            </Typography>
            <br />
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isLoading}
            >
              Process Order
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
