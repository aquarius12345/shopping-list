import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AppHeader from "../AppHeader/AppHeader";
import AppContainer from "../AppContainer";
import { Wrapper, Container } from "./App.styles";
import LineCharts from "../shared/LineCharts/LineCharts";
import ShoppingList from "../ShoppingList/ShoppingList";
import extractPercentage from "../../utils/extractPercentage";
import Calculator from '../Calculator';

import { selectAllProducts, selectSelectedProducts, selectSelectedProductTotalPrice } from '../../store/Products/Products.selectors';
import toggleProduct from "../../store/Products/Products.actions";

function App() {
  const dispatch = useDispatch();
  const colors = ["#62CB6", "#00ABAD", "#00858C", "#006073", "#004D61"];

  const products = useSelector(selectAllProducts);
  const selectedProducts = useSelector(selectSelectedProducts);
  const totalPrice = useSelector(selectSelectedProductTotalPrice);

  // useEffect(() => {
  //   const total = selectedProducts
  //     .map((product) => product.price)
  //     .reduce((a, b) => a + b, 0);

  //   setTotalPrice(total);
  // }, [selectedProducts]);

  function handleToggle(id) {
    dispatch(toggleProduct(id))
    // const newProducts = products.map((product) => {
    //   if (product.id === id) {
    //     return {
    //       ...product,
    //       checked: !product.checked,
    //     };
    //   } else {
    //     return product;
    //   }
    // });
    // setProducts(newProducts);
  }

  return (
    <Wrapper className="App">
      <Container>
        <AppHeader />
        <AppContainer
          left={
            <ShoppingList
              title="Produtos Disponiveis"
              onToggle={handleToggle}
            />
          }
          middle={
            <ShoppingList
              title="Sua lista de compras"
              onToggle={handleToggle}
              displayOnlySelected
            />
          }
          right={
            <div>
              estatisticas
              <LineCharts
                color={colors[0]}
                title="saudavel"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes("healt")
                  ).length
                )}
              />
              <LineCharts
                color={colors[1]}
                title="nao tao saudavel"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes("junk")
                  ).length
                )}
              />
              <LineCharts
                color={colors[2]}
                title="limpeza"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes("cleaning")
                  ).length
                )}
              />
              <LineCharts
                color={colors[3]}
                title="outros"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes("others")
                  ).length
                )}
              />
              <div style={{ marginTop: 12 }}>
                <h2 style={{ fontWeight: 400, fontSize: 12, color: "#00364A" }}>
                  previsao de gastos
                </h2>
                <div style={{ fontSize: 24 }}>
                  {totalPrice.toLocaleString("pt-bt", {
                    minimumFractionDigits: 2,
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <Calculator />
              </div>
            </div>
          }
        />
      </Container>
    </Wrapper>
  );
}

export default App;
