import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Spinner, Button } from 'react-bootstrap';

import { BASE_URL } from '../constants/api';
import Heading from '../layout/heading';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function GameDetails() {
    const [detail, setDetail] = useState([]);
    const [status, setStatus] = useState(Status.Loading);

    let { id } = useParams();

    const url = BASE_URL + '/' + id;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    throw new Error('Error fetching specific game');
                } else {
                    setDetail(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    }, [url]);

    return (
        <div className="detailsContainer">
            {status === Status.Error ? <h2>Something went wrong fetching games. Try refreshing the page</h2> : null}
            {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
            {status === Status.Success ? (
                <>
                    <Heading title={detail.name} />
                    <div className="details">
                        <div className="detail-image">
                            <Image src={detail.background_image} />
                        </div>
                        <div className="detail-info">
                            <p>
                                <b>Description:</b> {detail.description}
                            </p>
                            <div className="btnContainer">
                                <Button>
                                    <a href={detail.website} className="link">
                                        Go to website
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default GameDetails;
