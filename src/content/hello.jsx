import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Hello(){
    return(
    <>
   <Navbar bg="black">
    <Container>
          <Navbar.Brand href="#home">Hello</Navbar.Brand>
        </Container>

   </Navbar>
    </>)
}

export default Hello;