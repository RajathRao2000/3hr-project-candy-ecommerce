import logo from "./logo.svg";
import "./App.css";
import AddCandyForm from "./components/AddCandy/AddCandyForm";
import CandyTable from "./components/DisplayCandyTable/CandyTable";
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header/Header";
import CartList from "./components/Cart/CartList";

function App() {
  return (
    <StoreProvider>
      <Header />
      <CartList />
      <main className="main-page">
        <AddCandyForm />
        <CandyTable />
      </main>
    </StoreProvider>
  );
}

export default App;
