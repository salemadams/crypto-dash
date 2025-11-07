import {BarLoader} from "react-spinners";

const override = {
    display: 'block',
    margin: '0 auto 50px auto'
}

function Spinner({color = 'blue', width ='150'}) {
    return <div><BarLoader color={color} width={width} cssOverride={override} aria-label="Loading..."></BarLoader></div>
}
export default Spinner ;
