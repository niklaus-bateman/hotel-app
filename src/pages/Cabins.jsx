import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import Spinner from '../ui/Spinner'
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter/Sort</p>
      </Row>
      <Row>
      <CabinTable/>
      </Row>
    </>
  );
}

export default Cabins;
