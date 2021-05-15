import React, {Component} from "react";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";

class Header extends Component{

    render() {
        return(
            <div>
                <Card>
                    <CardBody>
                        <h3 className="text-center">Calvin and Hobbes Co.</h3>
                    </CardBody>
                </Card>

            </div>
        )
    }
}

export default Header