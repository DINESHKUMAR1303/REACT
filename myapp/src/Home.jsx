import  banner from './assets/react.svg'
import {Container, Col, Row} from 'react-bootstrap'
import { FiCreditCard } from "react-icons/fi";
function Home(){
    return(
        <Container>
            <img src={banner} alt="" />
            <h2>Home Component</h2>
            <p><FiCreditCard  style={{color:"red"}} />Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aliquam qui nihil rerum quasi, obcaecati porro consectetur vero in voluptate a labore sint ad numquam dolor eaque eligendi, reprehenderit accusantium?</p>
        </Container>
    )
}
export default Home;