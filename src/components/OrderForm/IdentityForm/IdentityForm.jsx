import {Card, Col} from "react-bootstrap";
import FormTextField from "../../../utils/formik/FormTextField";

const IdentityForm = () => {
    return (
        <Card body>
            <h5>Identity data</h5>
            <div className={'mb-3'}>
                <FormTextField
                    as={Col}
                    controlId="formBasicUsername"
                    label='Username'
                    placeholder='Enter your name'
                    name='username'
                    type='text'
                />
            </div>
            <div className={'mb-3'}>
                <FormTextField
                    as={Col}
                    controlId="formBasicEmail"
                    label='Email'
                    placeholder='Enter email'
                    name='email'
                    type='email'
                    formBottomText="We'll never share your confidential data"
                />
            </div>
        </Card>
    );
};

export default IdentityForm;