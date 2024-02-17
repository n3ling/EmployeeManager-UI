import { Container } from "react-bootstrap";


function buttonClicked(){
    alert("You clicked the button!");
}

export default function Hello() {
    return (
        <Container>
            <div>
                <h1>Welcome!</h1>
                <button onClick={buttonClicked} className="btn btn-primary">Primary</button>
            </div>
        </Container>
    );
}