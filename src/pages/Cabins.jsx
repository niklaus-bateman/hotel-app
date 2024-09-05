import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import Spinner from '../ui/Spinner'

function Cabins() {
  const {data:cabins , isLoading} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })
  console.log(cabins)
  if(isLoading) return <Spinner/>
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
