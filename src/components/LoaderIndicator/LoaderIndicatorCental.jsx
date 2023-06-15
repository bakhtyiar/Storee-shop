import {Container} from "react-bootstrap";

export default function LoaderIndicatorCentral() {

    return (
        <Container className='h-100 d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
                <span className="sr-only visually-hidden">Loading...</span>
            </div>
        </Container>
    )
}
