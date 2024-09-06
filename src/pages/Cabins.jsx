import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import Spinner from "../ui/Spinner";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [cabinForm , setCabinForm] = useState(false)
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter/Sort</p>
			</Row>
			<Row>
        <CabinTable />
        <Button onClick={() => setCabinForm(!cabinForm)}>Add Cabin</Button>
        {cabinForm && <CreateCabinForm/>}
			</Row>
		</>
	);
}

export default Cabins;
