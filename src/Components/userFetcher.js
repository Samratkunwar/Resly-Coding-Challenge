import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
} from "reactstrap";
import { EnvelopeFill, GeoAltFill, Globe2, PersonFill, PhoneFill } from 'react-bootstrap-icons';

const UserFetcher = (props) => {
    return (
        <Card>
            <CardHeader>
            <h2 className="text-center">{props.userData.name}</h2>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        {/* <p><strong>Id:</strong> {props.userData.id}</p> */}
                        <p><strong><PersonFill /></strong> {props.userData.username}</p>
                        <p><strong><EnvelopeFill /></strong> {props.userData.email}</p>
                        <p><strong><PhoneFill /></strong> {props.userData.phone}</p>
                        <p><strong><Globe2 /></strong> {props.userData.website}</p>
                        <p><strong><GeoAltFill /></strong> {props.userData.address}</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Card>
                            <CardHeader>
                                Company Details
                            </CardHeader>
                            <CardBody>
                                <p><strong>Company Name:</strong> {props.userData.companyName}</p>
                                <p><strong>Slogan:</strong> "{props.userData.companyCatchPhrase}"</p>
                                <p><strong>Specialization:</strong> {props.userData.companyBS}</p>
                            </CardBody>
                        </Card>

                    </div>
                </div>

            </CardBody>
        </Card>
    )
};

export default UserFetcher;