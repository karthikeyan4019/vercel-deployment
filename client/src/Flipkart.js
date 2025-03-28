import { useParams } from "react-router-dom";

function Flipkart()
{
    let{x}=useParams();
    return(
        <>
        <h1>Flipkart</h1>
        <h1>{x}</h1>
        </>
    );

}
export default Flipkart;